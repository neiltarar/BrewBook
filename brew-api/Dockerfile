# specify a base image
FROM node:19
# create and use a working directory in the image
WORKDIR /usr/src/app
# copy required files
COPY package*.json ./
# install packages
RUN npm install
# copy source code
COPY . . 

# expose port 3001 to the host
EXPOSE 3001
# run application
CMD ["npm", "run", "dev"]