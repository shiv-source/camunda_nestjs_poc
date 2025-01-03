FROM node:20.15.0-alpine

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /usr/src/app

COPY package.json /usr/src/app

COPY pnpm-lock.yaml /usr/src/app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

COPY . .

EXPOSE 3000