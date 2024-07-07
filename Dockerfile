FROM node:20-alpine as BUILD_IMAGE
WORKDIR /app/labchat

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine as PRODUCTION_IMAGE
COPY --from=BUILD_IMAGE /app/labchat/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
