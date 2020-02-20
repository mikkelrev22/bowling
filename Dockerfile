FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 7666
CMD ["npm", "start"]