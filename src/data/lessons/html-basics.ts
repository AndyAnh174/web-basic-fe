import { Lesson } from '../types';

export const htmlBasics: Lesson = {
  id: 1,
  title: 'HTML cơ bản',
  description: 'Tìm hiểu về cấu trúc cơ bản của HTML và các thẻ thông dụng.',
  content: `HTML (HyperText Markup Language) là ngôn ngữ đánh dấu được sử dụng để tạo ra cấu trúc của trang web. Mỗi trang web bạn truy cập đều được xây dựng từ HTML làm nền tảng.

1. Cấu trúc cơ bản của trang HTML:
- <!DOCTYPE html>: Khai báo phiên bản HTML (HTML5)
- <html>: Thẻ gốc của trang
- <head>: Chứa thông tin meta và liên kết tới các tài nguyên
- <body>: Chứa nội dung hiển thị của trang

2. Các thẻ HTML thông dụng:
- Tiêu đề: <h1> đến <h6>
- Đoạn văn bản: <p>
- Danh sách: 
  + Không thứ tự: <ul> và <li>
  + Có thứ tự: <ol> và <li>
- Liên kết: <a href="url">
- Hình ảnh: <img src="url" alt="mô tả">
- Phân vùng: <div> và <span>

3. Thuộc tính HTML quan trọng:
- class: Định danh phần tử để áp dụng CSS
- id: Định danh duy nhất cho phần tử
- style: Áp dụng CSS trực tiếp
- title: Hiển thị tooltip khi di chuột qua

4. Thực hành tốt:
- Luôn sử dụng DOCTYPE và meta charset
- Đặt tiêu đề trang web có ý nghĩa
- Sử dụng alt cho hình ảnh
- Tổ chức code rõ ràng, dễ đọc
- Kiểm tra tính hợp lệ của HTML

Trong ví dụ code, bạn sẽ thấy cách áp dụng các kiến thức trên để tạo một trang web đơn giản với đầy đủ cấu trúc chuẩn HTML5.`,
  htmlExample: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Trang web đầu tiên của tôi</title>
</head>
<body>
    <h1>Xin chào thế giới!</h1>
    
    <div class="container">
        <h2>Giới thiệu</h2>
        <p>Đây là trang web đầu tiên của tôi.</p>
        
        <h2>Danh sách kỹ năng</h2>
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ul>
    </div>
</body>
</html>`,
  cssExample: `/* CSS sẽ được thêm ở bài học tiếp theo */
body {
    font-family: Arial, sans-serif;
}`,
  jsExample: `// JavaScript sẽ được thêm ở bài học tiếp theo
console.log("Xin chào từ JavaScript!");`
}; 