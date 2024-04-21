# Sử dụng image node 16
FROM node:20-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép tất cả các tệp trong thư mục dự án vào container
COPY . .

# Biên dịch ứng dụng React
# RUN npm run build

# Mở cổng 80 để dự án có thể truy cập được từ bên ngoài
EXPOSE 3000

# Khởi chạy ứng dụng React
CMD ["npm", "start"]