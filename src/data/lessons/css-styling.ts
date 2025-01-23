import { Lesson } from '../types';

export const cssStyling: Lesson = {
  id: 2, 
  title: 'CSS và Styling',
  description: 'Khám phá cách sử dụng CSS để tạo kiểu và định dạng cho trang web.',
  content: `CSS (Cascading Style Sheets) là công nghệ thiết yếu để tạo giao diện đẹp cho trang web. CSS hoạt động bằng cách chọn các phần tử HTML và áp dụng các thuộc tính style cho chúng.

1. Cách sử dụng CSS:
- Internal CSS: Đặt trong thẻ <style>
- External CSS: Liên kết qua file .css riêng
- Inline CSS: Sử dụng thuộc tính style trực tiếp

2. Selectors trong CSS:
- Element selector: p { }
- Class selector: .className { }
- ID selector: #idName { }
- Descendant selector: div p { }
- Pseudo-classes: :hover, :focus, :first-child

3. Box Model trong CSS:
- Content: Nội dung thực của phần tử
- Padding: Khoảng cách từ nội dung đến viền
- Border: Đường viền của phần tử
- Margin: Khoảng cách từ viền ra ngoài

4. Thuộc tính CSS quan trọng:
- Colors và Background:
  + color: Màu chữ
  + background-color: Màu nền
  + background-image: Hình nền
- Typography:
  + font-family: Kiểu chữ
  + font-size: Kích thước chữ
  + font-weight: Độ đậm
  + line-height: Chiều cao dòng
- Layout:
  + display: block, inline, flex
  + position: relative, absolute
  + margin và padding
  + width và height

5. Responsive Design:
- Media queries
- Flexible grids
- Flexible images
- Mobile-first approach

Trong ví dụ code, bạn sẽ thấy cách áp dụng các kiến thức trên để tạo một card đẹp mắt với hover effect và transition mượt mà.`,
  htmlExample: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Học CSS</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1 class="title">CSS Cơ bản</h1>
        <div class="card">
            <h2>Thẻ bài viết</h2>
            <p>Đây là một ví dụ về CSS styling.</p>
            <button class="btn">Tìm hiểu thêm</button>
        </div>
    </div>
</body>
</html>`,
  cssExample: `/* Reset CSS cơ bản */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', sans-serif;
    line-height: 1.6;
    background-color: #f0f2f5;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.title {
    color: #1a73e8;
    text-align: center;
    margin-bottom: 2rem;
}

.card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.btn {
    background-color: #1a73e8;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #1557b0;
}`,
  jsExample: `// JavaScript sẽ được thêm ở bài học tiếp theo
document.querySelector('.btn').addEventListener('click', () => {
    alert('Bạn đã click vào nút!');
});`
}; 