# specify a base image
FROM node:19
# create and use a working directory in the image
WORKDIR /usr/src/app
# copy required files

COPY package*.json ./
RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]