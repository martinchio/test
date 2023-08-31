# Use an official Node.js runtime as the base image
FROM node:18.17.1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install the app's dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Set the command to run your application
CMD ["npm", "start"]
