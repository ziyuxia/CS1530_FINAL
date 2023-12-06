
function fetchLessons() {
  return fetch('lessons.json')
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching lessons:', error);
    });
}

function fetchLessonById(id) {
  return fetch('lessons.json')
    .then(response => response.json())
    .then(lessons => lessons.find(lesson => lesson.id === parseInt(id)))
    .catch(error => {
      console.error('Error fetching lesson:', error);
    });
}


function startLesson(id) {
  fetchLessonById(id)
    .then(lesson => {
      // Redirect to lesson.html with lesson details in URL parameters
      const queryParams = new URLSearchParams({
        id: lesson.id,
        name: lesson.name,
        image: lesson.image,
        question: lesson.question
        // Add other lesson details here if needed
      });
      window.location.href = `lesson.html?${queryParams.toString()}`;
    })
    .catch(error => {
      console.error('Error fetching lesson:', error);
    });
}
function addLessonToPage(lesson) {
  const container = document.getElementById('lessons-container');
  const divLesson = document.createElement('div');
  divLesson.className = 'lesson';

  const img = document.createElement('img');
  img.className = 'image';
  img.src = lesson.image ? lesson.image : '1989.jpg'; // Use a placeholder image or update as needed

  const divName = document.createElement('div');
  divName.className = 'name';
  const h2 = document.createElement('h2');
  h2.textContent = lesson.name;

  const startButton = document.createElement('button');
  startButton.className = 'start-button';
  startButton.textContent = 'Start';
  startButton.addEventListener('click', () => {
    startLesson(lesson.id); // Start the lesson by ID
  });

  divName.appendChild(h2);
  divLesson.appendChild(img);
  divLesson.appendChild(divName);
  divLesson.appendChild(startButton);

  container.appendChild(divLesson);
}

function createNewLesson(event) {
  event.preventDefault(); // Prevent the form from submitting in the traditional way

  var lessonName = document.getElementById('lesson-name').value;
  var lessonQuestion = document.getElementById('lesson-question').value;

  var newLesson = {
    id: Date.now(),
    name: lessonName,
    image: '1989.jpg', // You might want to update this
    question: lessonQuestion
  };

  fetch('/lessons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newLesson),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Lesson created:', data);
      addLessonToPage(newLesson); // Add lesson to page after confirmation from server
      window.location.href = '/educator.html';
    })
    .catch((error) => {
      console.error('Error:', error);
    });


  //addLessonToPage(newLesson);

}

function showLessons() {
  fetchLessons()
    .then(lessons => {
      const container = document.getElementById('lessons-container');
      container.innerHTML = '';
      lessons.forEach(addLessonToPage);
    })
    .catch(error => {
      console.error('Error displaying lessons:', error);
    });
}

function showCreateLessonForm() {
  var formHtml = `
      <form id="create-lesson-form">
          <label for="lesson-name">Lesson Name:</label>
          <input type="text" id="lesson-name" name="lesson-name" required><br><br>

          <label for="lesson-question">Lesson Question:</label>
          <input type="text" id="lesson-question" name="lesson-question" required><br><br>

          <button type="submit">Submit</button>
      </form>
  `;

  document.getElementById('lessons-container').innerHTML = formHtml;
  document.getElementById('create-lesson-form').onsubmit = createNewLesson;
}


function showEducatorAccountInfo() {
  fetch('http://localhost:3000/accounts')
    .then(response => response.json())
    .then(accounts => {
      const educators = accounts.filter(account => account['account type'] === 'educator');
      const educatorsHtml = educators.map(educator => `
        <div>
          <h3>${educator.name}</h3>
          <p>Email: ${educator.email}</p>
          <p>Account Type: ${educator['account type']}</p>
        </div>
      `).join('');

      document.getElementById('lessons-container').innerHTML = educatorsHtml;
    })
    .catch(error => console.error('Error:', error));
}

function showStudentAccountInfo() {
  fetch('http://localhost:3000/accounts')
    .then(response => response.json())
    .then(accounts => {
      const educators = accounts.filter(account => account['account type'] === 'student');
      const educatorsHtml = educators.map(educator => `
        <div>
          <h3>${educator.name}</h3>
          <p>Email: ${educator.email}</p>
          <p>Account Type: ${educator['account type']}</p>
        </div>
      `).join('');

      document.getElementById('lessons-container').innerHTML = educatorsHtml;
    })
    .catch(error => console.error('Error:', error));
}