terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
  }

  required_version = ">= 1.2"
}

provider "aws" {
  region = "us-east-1"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }
}

data "aws_iam_role" "github_actions" {
  name = "GitHubActionsRDSRole"
}

data "aws_iam_instance_profile" "ec2_ssm" {
  name = "ec2-frontend-ssm-profile"
}

resource "aws_vpc" "web" {
  cidr_block           = "10.1.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = { Name = "web-vpc" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.web.id
  cidr_block              = "10.1.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
  tags = { Name = "web-public-subnet" }
}

resource "aws_internet_gateway" "web" {
  vpc_id = aws_vpc.web.id
  tags = { Name = "web-igw" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.web.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.web.id
  }
  tags = { Name = "web-public-rt" }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "web" {
  name   = "web-server-sg"
  vpc_id = aws_vpc.web.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "IP for SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.personalIp]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" #all protocols
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web"{
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t3.micro"
  key_name                    = "wommKFront"
  subnet_id                   = aws_subnet.public.id
  vpc_security_group_ids      = [aws_security_group.web.id]
  iam_instance_profile        = data.aws_iam_instance_profile.ec2_ssm.name
  associate_public_ip_address = true

  root_block_device {
    volume_type = "gp3"
    volume_size = 20
    encrypted   = true
  }

  tags = {
    Name = "Front-end"
  }
}

output "public_ip" {
  value = aws_instance.web.public_ip
}

output "instance_id" {
  value = aws_instance.web.id
}

output "ssh_command" {
  value = "ssh -i ~/.ssh/wommkFront.pem ubuntu@${aws_instance.web.public_ip}"
}

output "github_actions_role_arn" {
  value = data.aws_iam_role.github_actions.arn
}