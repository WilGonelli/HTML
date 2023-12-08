const form = document.querySelector('#form');
const taskList = document.querySelector('#taskList');
const body = document.querySelector('#body');
const inputTask = form.querySelector('#task');
let tasks = [];
let i = 1;

body.addEventListener('click', function (event) {
  if (!event.target.closest('form') && !event.target.closest('div')) {
    body.classList.add(`image${i}`);
    console.log(i);
    if (i === 3) {
      body.classList.remove('image1', 'image2', 'image3');
      i = 0;
    }
    i++;
  }
});

/**
 * Creates the icon to delete the task.
 * @param {*} task Task name to link to the icon's "onclick" function.
 * @returns Return the Icon Delete.
 */
function createIconDel(task) {
  return ` <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30"
    onclick="deleteIcon('${task}')"
  style="fill:#ff0000;">
      <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
  </svg>`;
}

function createIconEdit(task) {
  return `<svg onclick="editIcon('${task}')" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 64 64"
    style="fill:#22C3E6;">
    <path d="M22 51c-1-1-4-1-4-1l-.425-1.274c-.362-1.086-1.215-1.939-2.301-2.301L14 46c0 0 .5-2.5-1-4l25-25 8 10L22 51zM52 21l-9-9 4.68-4.68c0 0 3.5-1.5 7 2s2 7 2 7L52 21zM9 50l-1.843 4.476c-.614 1.49.877 2.981 2.367 2.367L14 55 9 50z"></path>
    </svg>`;
}

/**
 * Add the submit event to the form and check what was typed to add to the task.
 * @param {*} event Button onclick event.
 * @returns Returns a message if nothingis enered or the task entered is already in the list, otherwise adds the task to the list.
 */
function AddTask(event) {
  event.preventDefault();

  if (inputTask.value && !tasks.includes(inputTask.value))
    return tasks.push(inputTask.value), (inputTask.value = ''), renderList();

  if (!inputTask.value)
    return alert(`Digite uma tarefa para ser incluida na lista`);

  alert(`A tarefa "${inputTask.value}" ja esta na lista`);
  inputTask.value = '';
}

/**
 * Renders the task list on the screen.
 */
function renderList() {
  taskList.innerHTML = '';
  for (const task of tasks) {
    taskList.innerHTML += `<p> ${task} <icon>${
      createIconEdit(task) + createIconDel(task)
    } </icon></p>`;
  }
}

/**
 * Deletes the task corresponding to the clicked icon.
 * @param {*} task Task linked to icon.
 */
function deleteIcon(task) {
  tasks = tasks.filter(e => e !== task);
  renderList();
}

function editIcon(task) {
  tasks = tasks.filter(e => e !== task);
  inputTask.value = task;
  inputTask.focus();
}
