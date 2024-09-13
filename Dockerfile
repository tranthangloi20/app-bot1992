# Bước 1: Sử dụng hình ảnh Node.js chính thức để xây dựng ứng dụng
FROM node:18 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép mã nguồn ứng dụng vào container
COPY . .

# Xây dựng ứng dụng Angular
RUN npm run build --configuration=production

# Bước 2: Sử dụng hình ảnh Nginx để phục vụ ứng dụng
FROM nginx:alpine

# Sao chép file cấu hình Nginx vào hình ảnh
COPY nginx.conf /etc/nginx/nginx.conf

# Sao chép file build từ build stage vào thư mục phục vụ của Nginx
COPY --from=build /app/dist/app-bot1992 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Chạy Nginx khi container khởi động
CMD ["nginx", "-g", "daemon off;"]
