# Stage 1: Build the application
FROM node:20.15.0-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application (if using TypeScript)
RUN npm run build

# Stage 2: Run the application
FROM node:20.15.0-alpine

# Set the working directory
WORKDIR /app

# Copy the build from the previous stage
COPY --from=build /app /app

# Install only production dependencies
RUN npm install --only=production

# Expose the application port
EXPOSE 3000

# Set environment variables (example)
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
