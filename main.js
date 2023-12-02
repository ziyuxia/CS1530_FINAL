// To do: connect with database
function getLessons() {
    return [{ 'id': 1, 'name': 'Lesson 1', 'image': '', 'question': 'Create a loop that adds the numbers from 1 to 10' }, { 'id': 2, 'name': 'Lesson 2', 'image': '', 'question': 'who is ts anyway?' }, { 'id': 3, 'name': 'Lesson 3', 'image': '', 'question': 'hello?' }]
}

// To do: connect with database
function getLesson(id) {
    return { 'id': 1, 'name': 'Lesson 1', 'image': '', 'question': 'Create a loop that adds the numbers from 1 to 10' }
}

// add lessons to lessons-container
function showLessons() {
    lessons = getLessons()

    container = document.getElementById('lessons-container')
    container.innerHTML = '';
    lessons.forEach(lesson => {
        // outer div
        const divLesson = document.createElement('div');
        divLesson.className = 'lesson';

        // image
        const img = document.createElement('img');
        img.className = 'image';
        if (lesson.image != '') {
            img.src = lesson.image;
        } else {
            img.src = '1989.jpg';
        }
        divLesson.appendChild(img);

        // name
        const divName = document.createElement('div');
        divName.className = 'name';
        const h2 = document.createElement('h2');
        h2.textContent = lesson.name;
        divName.appendChild(h2);
        divLesson.appendChild(divName);

        // start button
        const divButton = document.createElement('button');
        divButton.className = 'start-button';
        divButton.textContent = 'Start';
        divButton.addEventListener('click', () => {
            window.location.href = `lesson.html?id=${lesson.id}`;
        });
        divLesson.appendChild(divButton);

        container.appendChild(divLesson);
    });
}

// set up lesson page
function start() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    lesson = getLesson(id);

    const name = document.getElementById('start-name');
    name.textContent = lesson.name;
    const question = document.getElementById('question');
    question.textContent = lesson.question;
}