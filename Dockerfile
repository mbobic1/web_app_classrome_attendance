FROM node:18.8.0

WORKDIR /wt22p18769

COPY ./package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "node priprema.js && node index.js"]