
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
  
  function showLessons() {
    fetchLessons()
      .then(lessons => {
        const container = document.getElementById('lessons-container');
        container.innerHTML = '';
  
        lessons.forEach(lesson => {
          const divLesson = document.createElement('div');
          divLesson.className = 'lesson';
  
          const img = document.createElement('img');
          img.className = 'image';
          img.src = lesson.image ? lesson.image : '1989.jpg';
  
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
        });
      })
      .catch(error => {
        console.error('Error displaying lessons:', error);
      });
  }  
  
