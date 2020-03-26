FROM alpine:latest

COPY entrypoint.sh /entrypoint.sh

RUN apk add bash git npm

ENTRYPOINT ["/entrypoint.sh"]
