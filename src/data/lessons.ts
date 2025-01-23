export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  htmlExample: string;
  cssExample: string;
  jsExample: string;
}

export const lessons: Lesson[] = [
  {
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
  },
  {
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
  },
  {
    id: 3,
    title: 'JavaScript và Tương tác',
    description: 'Học cách sử dụng JavaScript để tạo ra các trang web tương tác.',
    content: `JavaScript là ngôn ngữ lập trình phổ biến nhất cho web, cho phép bạn tạo ra các tương tác động và trải nghiệm người dùng phong phú.

1. Cơ bản về JavaScript:
- Biến và kiểu dữ liệu:
  + let và const để khai báo biến
  + String, Number, Boolean, Array, Object
  + Template literals với backticks
- Functions:
  + Function declarations và expressions
  + Arrow functions
  + Parameters và return values
- Control flow:
  + if...else conditions
  + for và while loops
  + try...catch error handling

2. DOM Manipulation:
- Selecting elements:
  + getElementById()
  + querySelector()
  + querySelectorAll()
- Modifying elements:
  + innerHTML và textContent
  + classList.add/remove
  + setAttribute()
- Creating/removing elements:
  + createElement()
  + appendChild()
  + removeChild()

3. Events trong JavaScript:
- Common events:
  + click, submit, change
  + mouseover, mouseout
  + keyup, keydown
- Event handling:
  + addEventListener()
  + removeEventListener()
  + Event object và properties

4. Modern JavaScript Features:
- Destructuring
- Spread operator
- Array methods:
  + map(), filter(), reduce()
  + find(), some(), every()
- Promise và async/await
- Local Storage

5. Best Practices:
- Code organization
- Error handling
- Performance optimization
- Security considerations

Trong ví dụ code, chúng ta sẽ xây dựng một ứng dụng Todo List hoàn chỉnh, áp dụng tất cả các khái niệm trên để tạo ra một ứng dụng web tương tác thực tế.`,
    htmlExample: `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Học JavaScript</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Ứng dụng Todo List</h1>
        
        <div class="todo-app">
            <form id="todo-form">
                <input type="text" id="todo-input" placeholder="Thêm công việc mới...">
                <button type="submit">Thêm</button>
            </form>
            
            <ul id="todo-list"></ul>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>`,
    cssExample: `.todo-app {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

#todo-form {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

#todo-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    background-color: #1a73e8;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

#todo-list {
    list-style: none;
}

.todo-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
}

.todo-item button {
    background-color: #dc3545;
    padding: 0.25rem 0.5rem;
}`,
    jsExample: `// Lấy các phần tử DOM
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Mảng lưu trữ các công việc
let todos = [];

// Hàm thêm công việc mới
function addTodo(text) {
    const todo = {
        id: Date.now(),
        text,
        completed: false
    };
    
    todos.push(todo);
    renderTodos();
}

// Hàm xóa công việc
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Hàm hiển thị danh sách công việc
function renderTodos() {
    list.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            todo.completed = !todo.completed;
            renderTodos();
        });
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        if (todo.completed) {
            span.style.textDecoration = 'line-through';
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Xóa';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Xử lý sự kiện submit form
form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    
    if (text) {
        addTodo(text);
        input.value = '';
    }
});`
  }
]; 