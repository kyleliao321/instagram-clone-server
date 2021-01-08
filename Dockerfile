FROM node:12-alpine

# Create a node_modules directory for npm install
# Then, change owner of the entire directory as node user,
# so docker won't run it as root user
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Change working directory into /home/node/app
WORKDIR /home/node/app

# Copy package.json and package-lock.json into working directory
COPY package*.json ./

# Change user as node user
USER node

# run npm install with imported pacakge file
RUN npm install

# move entire application code into workign directory
COPY --chown=node:node . .

# exposing 8080 as internal network port
EXPOSE 8080

# build the application and run it
CMD ["sh", "-c", "npm run build; node ./dist/index.js"]

