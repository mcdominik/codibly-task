FROM node:20-alpine as builder

WORKDIR /app

COPY . .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 

RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.24.0-alpine as production

ARG NODE_ENV production

ENV NODE_ENV=${NODE_ENV}

# Copy built assets from `builder` image
COPY --from=builder /app/dist /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]