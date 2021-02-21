FROM node:14
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
RUN npm install -g serve
COPY . .


RUN npm run build


CMD npx serve -s build


EXPOSE 5000