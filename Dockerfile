# ─── Stage 1: Base Image ───────────────────────────
FROM node:18-slim

# Set working directory inside container
WORKDIR /app

# Copy package files first (for Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the application code
COPY . .

# Create data directory (for employees.json persistence)
RUN mkdir -p data

# Expose the app port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD node -e "require('http').get('http://localhost:3000', r => process.exit(r.statusCode === 200 ? 0 : 1))"

# Start the application
CMD ["node", "app.js"]