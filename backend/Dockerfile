# Use Node.js as base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./

# Install nodemon globally for hot reload
RUN npm install -g nodemon && npm install

# Copy the application files
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Use nodemon to start the application
CMD ["node", "server.js"]