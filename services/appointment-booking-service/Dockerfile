# Multi-stage Dockerfile for Go Appointment Service

FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main .

FROM alpine:latest AS production
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /root/

RUN addgroup -g 1001 -S golang
RUN adduser -S -D -H -u 1001 -h /root -s /sbin/nologin -G golang golang

COPY --from=builder /app/main .
COPY --from=builder /app/.env* ./

USER golang

EXPOSE 8080

CMD ["./main"]
