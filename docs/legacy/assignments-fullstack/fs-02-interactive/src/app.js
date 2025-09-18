export function init(document) {
  const input = document.getElementById('new-todo');
  const list = document.getElementById('todo-list');
  const addButton = document.getElementById('add-todo');

  function addTodo(text) {
    const li = document.createElement('li');
    li.setAttribute('role', 'listitem');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('aria-label', 'Marcar completado');
    checkbox.addEventListener('keydown', (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        checkbox.checked = !checkbox.checked;
        event.preventDefault();
      }
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(text));
    list.appendChild(li);
  }

  addButton.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
      addTodo(text);
      input.value = '';
      input.focus();
    }
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addButton.click();
    }
  });

  return { addTodo, list, input };
}

if (typeof document !== 'undefined') {
  init(document);
}
