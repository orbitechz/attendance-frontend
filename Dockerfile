FROM node:lts AS build

WORKDIR /app

COPY package.json .
RUN npm install 

COPY . .
RUN npm run build

######################################

FROM nginx:1.26.3 AS runner

WORKDIR /usr/share/nginx/html

COPY --from=build /app/build/ .
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

