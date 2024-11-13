# Build stage
FROM node:18.16.0-alpine as build-stage
WORKDIR /
COPY package.json ./
COPY package-lock.json ./
RUN  npm install
COPY . .
RUN npm run prisma:generate
RUN npm run build
RUN ls -l ./dist

# Production stage
FROM node:18.16.0-alpine as production-stage
WORKDIR /
COPY package.json ./
COPY package-lock.json  ./
RUN npm install
COPY --from=build-stage ./dist ./dist
COPY --from=build-stage ./prisma ./prisma
RUN npm run prisma:generate
RUN ls -l ./dist
EXPOSE 4000
CMD [ "yarn","start" ]