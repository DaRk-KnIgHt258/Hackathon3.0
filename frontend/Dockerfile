FROM node:20-alpine

WORKDIR /app

# Copy dependency specifications first for layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy configuration and source files
COPY index.html ./
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY public/ ./public/
COPY src/ ./src/

EXPOSE 5173

# Start Vite development server bound to all interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
