# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && npm install -g npm@latest

# Copy all files
COPY . .

# Start the app
CMD ["npm", "start"]
