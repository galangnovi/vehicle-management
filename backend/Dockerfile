# Gunakan image Node.js resmi
FROM node:20

# Set working directory di container
WORKDIR /app

# Copy package.json dan package-lock.json agar caching lebih efisien
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode aplikasi
COPY . .

# Expose port backend (sesuaikan dengan port di app)
EXPOSE 3000

# Jalankan backend
CMD ["npm", "run", "dev"]
