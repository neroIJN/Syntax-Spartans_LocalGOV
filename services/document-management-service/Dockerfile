# Multi-stage Dockerfile for Python Document Service

FROM python:3.11-alpine AS base

# Install system dependencies
RUN apk add --no-cache \
    gcc \
    musl-dev \
    libffi-dev \
    openssl-dev \
    libmagic

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-alpine AS production

# Install runtime dependencies
RUN apk add --no-cache libmagic

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S python && \
    adduser -S -D -H -u 1001 -h /app -s /sbin/nologin -G python python

# Copy installed packages from base stage
COPY --from=base /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=base /usr/local/bin /usr/local/bin

# Copy application code
COPY . .

USER python

EXPOSE 8000

ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
