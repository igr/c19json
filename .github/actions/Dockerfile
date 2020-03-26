FROM alpine:latest

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN apk add bash git npm jq

ENTRYPOINT ["/entrypoint.sh"]
