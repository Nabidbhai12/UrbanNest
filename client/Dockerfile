# Build stage
FROM node:16-alpine as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine as production-stage

# Copy built assets from build stage to nginx server
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
