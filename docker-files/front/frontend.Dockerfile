FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

ARG VITE_ENV
ENV VITE_ENV=$VITE_ENV

COPY . .
RUN npm run build