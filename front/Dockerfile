# Choose the Node version
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the whole project
COPY . .

# Build the project
RUN yarn build

# Use a smaller base image for the production environment
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only production node modules and build files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Start the app
CMD ["yarn", "start"]