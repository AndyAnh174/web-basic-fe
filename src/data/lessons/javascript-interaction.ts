import { Lesson } from '../types';

export const javascriptInteraction: Lesson = {
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
}; 