# Use the official Node.js 16 as a base image
FROM node:16-alpine

# Set the working directory for the app
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies efficiently
COPY package*.json ./

# Install dependencies in a multi-stage build for smaller container size
RUN npm ci --production

# Copy the rest of the project files
COPY . .

# Expose the port for container communication
EXPOSE 5000

# Start the Node.js app using a specific script for better maintainability
CMD ["npm", "run", "start:prod"]
