FROM node:16-alpine As builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm cache verify
RUN npm ci

# RUN yarn install \
#     --prefer-offline \
#     --frozen-lockfile \
#     --non-interactive \
#     --production=false

# RUN yarn build

COPY . .

RUN npm run build && npm prune --production

# RUN NODE_ENV=production yarn install \
#     --prefer-offline \
#     --pure-lockfile \
#     --non-interactive \
#     --production=true

# ----------------------

FROM node:16-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "npm", "start" ]