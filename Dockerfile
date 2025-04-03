FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install --save dotenv typeorm-naming-strategies @nestjs/mongoose mongoose

# Copy source code
COPY . .

# Add empty .env file if it doesn't exist
RUN touch .env

# Clean any previous builds and build the app
RUN rm -rf dist
RUN npm run build

# Expose port
EXPOSE 3000

# Run app with correct path
CMD ["node", "dist/src/main.js"] 