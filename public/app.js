// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('add-task-form');
  
//     form.addEventListener('submit', function(e) {
//       e.preventDefault();
  
//       const userName = document.getElementById('user-name').value;
//       const title = document.getElementById('task-title').value;
//       const description = document.getElementById('task-description').value;
  
//       fetch('http://127.0.0.1:3001/tasks', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ userName, title, description })
//       })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Success:', data);
//         form.reset();
//         alert('Task added successfully!');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         alert('Error adding task');
//       });
//     });
//   });
document.addEventListener('DOMContentLoaded', function() {
    const addTaskForm = document.getElementById('add-task-form');
    const getTaskForm = document.getElementById('get-task-form');
  
    addTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();  // Prevent the default form submission
  
        const userName = document.getElementById('user-name').value;
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
  
        fetch('http://127.0.0.1:3002/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName,
                title: title,
                description: description
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            addTaskForm.reset();  // Clear the form after successful submission
            alert('Task added successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error adding task');
        });
    });
  
    getTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();  // Prevent the default form submission
  
        const userName = document.getElementById('get-user-name').value;
  
        fetch(`http://127.0.0.1:3002/tasks?userName=${encodeURIComponent(userName)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('User data:', data);
            const userDataDiv = document.getElementById('user-data');
            userDataDiv.innerHTML = ''; // Clear previous data
  
            data.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                `;
                userDataDiv.appendChild(taskElement);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error retrieving user data');
        });
    });
  });
  