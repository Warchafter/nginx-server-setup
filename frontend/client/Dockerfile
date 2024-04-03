# Use the Node.js Alpine image as the base
FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy frontend files
COPY . .

# Install frontend dependencies
RUN npm install

# Build the frontend
RUN npm run build
