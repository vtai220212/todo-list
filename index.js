const input = document.querySelector("input");
const button = document.querySelector("button");
const ul = document.querySelector("ul");
const form = document.querySelector("form");
const todos = document.querySelector(".todos");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Ngăn chặn sự kiện mặc định của form
  let val = input.value.trim(); // Lấy giá trị của input và xóa khoảng trắng ở đầu và cuối chuỗi
  if (val) {
    addTodoElement({
      text: val,
    }); // Gọi hàm addTodoElement và truyền vào một object
    input.value = ""; // Xóa giá trị của input
    saveTodos(); // Gọi hàm saveTodos
  }
});

function addTodoElement(todo) {
  var li = document.createElement("li"); // Gán phần tử được tạo vào một biến
  li.innerHTML = `
  <span>${todo.text}</span>
  <div>
    <button class="btn">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
  `;

  if (todo.status === "completed") {
    li.classList.add("completed");
  } // Kiểm tra xem status có phải là completed không

  li.addEventListener("click", function () {
    this.classList.toggle("completed");
    saveTodos();
  }); // Thêm class completed khi click vào phần tử li

  li.querySelector(".btn").addEventListener("click", function () {
    this.closest("li").remove();
    saveTodos();
  }); // Xóa phần tử li khi click vào nút xóa

  todos.appendChild(li); // Thêm phần tử li vào thẻ ul
}

function saveTodos() {
  let todoList = document.querySelectorAll("li"); // Lấy tất cả các phần tử li
  let todoStorage = []; // Tạo mảng rỗng để lưu dữ liệu
  todoList.forEach(function (item) {
    let text = item.querySelector("span").innerText; // Lấy nội dung của thẻ span
    let status = item.classList.contains("completed")
      ? "completed"
      : "incomplete"; // Kiểm tra xem có class completed không

    // Thêm dữ liệu vào mảng todoStorage
    todoStorage.push({
      text: text,
      status: status,
    });
  });
  // Lưu dữ liệu vào localStorage
  localStorage.setItem("todos", JSON.stringify(todoStorage));
}

function init() {
  // Lấy dữ liệu từ localStorage
  let data = JSON.parse(localStorage.getItem("todos"));
  if (data) {
    data.forEach(function (item) {
      // Gọi hàm addTodoElement và truyền vào dữ liệu từ localStorage
      addTodoElement(item);
    });
  }
}
// Gọi hàm init để chạy
init();
