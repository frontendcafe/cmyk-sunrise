// getDataForm.js
const db = firebase.firestore();

const todoForm = document.getElementById('todo_form');

const create = (name, url, description) => {
    db.collection('tasks').doc().set({
        name,
        url,
        description
    })
}

todoForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = todoForm['todo_name'].value;
    const url = todoForm['todo_url'].value;
    const description = todoForm['todo_description'].value;

    await create(name, url, description); // Llamo a mi función create

    todoForm.reset(); // Reseteamos los campos
});