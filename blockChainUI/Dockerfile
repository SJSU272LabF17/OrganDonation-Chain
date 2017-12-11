FROM node:7
ADD . /app
WORKDIR /app/
RUN npm install; exit 0
RUN npm update;
RUN npm install; exit 0
CMD npm start
EXPOSE 3000

