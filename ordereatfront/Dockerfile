FROM node:19-alpine3.15
WORKDIR /ordereatfront
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install
CMD ["npm", "start"]
