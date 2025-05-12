ARG VERSION=14-slim

FROM node:${VERSION}

ARG PORT=80

ENV PORT ${PROT}
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY ./entrypoint.sh .

RUN apt update -y && apt-get install -y git

VOLUME ["/app"]

EXPOSE ${PORT}

ENTRYPOINT ["/app/entrypoint.sh"]
