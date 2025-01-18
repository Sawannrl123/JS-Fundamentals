const stored_todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

const form = document.getElementById("todo-form");

function renderTodos(todos) {
  console.log(todos);
  const todo_list = document.getElementById("todo-list");

  todo_list.innerHTML = "";

  todos.forEach((element, index) => {
    const todo_item = document.createElement("li");
    todo_item.id = element.created_time;
    todo_item.key = index;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = element.done;
    checkbox.id = `${element.created_time}-${index}`;
    checkbox.addEventListener("change", (e) => {
      const new_todos = structuredClone(todos);
      new_todos[index].done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(new_todos));
      renderTodos(new_todos);
    });

    const delete_button = document.createElement("button");
    delete_button.textContent = "Delete";
    delete_button.addEventListener("click", () => {
      const new_todos = structuredClone(todos);
      new_todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(new_todos));
      renderTodos(new_todos);
    });

    const edit_button = document.createElement("button");
    edit_button.textContent = "Edit";
    edit_button.addEventListener("click", (e) => {
      const new_todos = structuredClone(todos);
      const new_text = prompt("Edit todo", new_todos[index].text);
      new_todos[index].text = new_text;
      localStorage.setItem("todos", JSON.stringify(new_todos));
      renderTodos(new_todos);
    });

    const text = document.createElement("label");
    text.textContent = element.text;
    text.htmlFor = `${element.created_time}-${index}`;

    todo_item.appendChild(checkbox);
    todo_item.appendChild(text);
    todo_item.appendChild(delete_button);
    todo_item.appendChild(edit_button);

    todo_item.className = element.done ? "done" : "open";
    todo_list.appendChild(todo_item);
  });
}

function addTodo(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const todo = formData.get("todo");

  const data = {
    created_time: new Date().toISOString(),
    text: todo,
    done: false,
  };

  form.reset();

  const todos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const new_todos = structuredClone(todos);
  new_todos.push(data);
  localStorage.setItem("todos", JSON.stringify(new_todos));

  renderTodos(new_todos);
}

function init() {
  renderTodos(stored_todos);

  form.addEventListener("submit", addTodo);
}

init();
