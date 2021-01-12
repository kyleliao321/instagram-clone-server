FROM node:15.5.1-alpine3.10 AS build
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm ci
COPY --chown=node:node . .
RUN npm run build

FROM node:15.5.1-alpine3.10 AS demo
WORKDIR /home/node/app
COPY --chown=node:node --from=build /home/node/app/package*.json ./
COPY --chown=node:node --from=build /home/node/app/swagger.json ./
COPY --chown=node:node --from=build /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/app/dist ./dist
COPY --chown=node:node --from=build /home/node/app/assets ./assets
RUN npm prune --production
EXPOSE 8080

FROM node:15.5.1-alpine3.10 AS production
WORKDIR /home/node/app
COPY --chown=node:node --from=build /home/node/app/package*.json ./
COPY --chown=node:node --from=build /home/node/app/swagger.json ./
COPY --chown=node:node --from=build /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/app/dist ./dist
EXPOSE 8080
CMD ["node", "./dist/index.js"]
