FROM node:lts AS build

WORKDIR /app

COPY package.json .
RUN npm install 
ENV REACT_APP_API_URL=/attendance-api
COPY . .
RUN npm run build

######################################

FROM nginx:1.26.3 AS runner

WORKDIR /usr/share/nginx/html

COPY --from=build /app/build/ .
COPY --from=build /app/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
ENV DOLLAR=$
EXPOSE 80
CMD ["sh", "-c", "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

