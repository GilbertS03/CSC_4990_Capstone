terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
  }
  required_version = ">= 1.2"
}

variable "bucket_name" {
  type        = string
  description = "Front-end S3 Bucket"
  default     = "myapp-frontend-s3-bucket"
}

resource "aws_s3_bucket" "frontend" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_versioning" "frontend" {
  bucket = aws_s3_bucket.frontend.id 
  versioning_configuration {
    status = "Enabled"
  }
}
resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket                  = aws_s3_bucket.frontend.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  index_document { suffix = "index.html" }
  error_document { key    = "index.html" } 
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.frontend.arn}/*"
      },
      {
        Sid    = "RestrictUploads"
        Effect = "Deny"
        NotPrincipal = {
          AWS = [
            "arn:aws:iam::943881661618:user/Alex",
            "arn:aws:iam::943881661618:role/GitHubActionsRDSRole"
          ]
        }
        Action = [
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "${aws_s3_bucket.frontend.arn}/*"
      }
    ]
  })
}

output "bucket_name" {
  value = aws_s3_bucket.frontend.id 
}

output "bucket_arn" {
  value = aws_s3_bucket.frontend.arn
}

output "website_url" {
  value = aws_s3_bucket_website_configuration.frontend.website_endpoint
}