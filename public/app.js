// document.addEventListener('DOMContentLoaded', function() {
//     const addTaskForm = document.getElementById('add-task-form');
//     const getTaskForm = document.getElementById('get-task-form');
//     const deleteTaskForm = document.getElementById('delete-task-form');
//     const updateTaskForm = document.getElementById('update-task-form');
//     const userImage = document.getElementById('user-image');
//     const welcomeMessage = document.getElementById('welcome-message');

//     // Display user info on dashboard
//     function displayUserInfo(user) {
//         if (user.imageFile) {
//             const userImage = document.getElementById('user-image');
//             userImage.src = `http://127.0.0.1:3002/images/${user.imageFile}`;
//             userImage.style.display = 'block';
//         }
//         const welcomeMessage = document.getElementById('welcome-message');
//         welcomeMessage.textContent = `Welcome, ${user.name}!`;
//     }
    

//     displayUserInfo();

//     // Add Task
//     addTaskForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const userName = document.getElementById('user-name').value;
//         const title = document.getElementById('task-title').value;
//         const description = document.getElementById('task-description').value;

//         fetch('http://127.0.0.1:3002/tasks', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ userName, title, description })
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//             const taskElement = document.createElement('div');
//             taskElement.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
//             document.getElementById('user-data').appendChild(taskElement);
//             alert('Task added successfully!');
//             addTaskForm.reset();
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             alert('Error adding task');
//         });
//     });

//     // Get Tasks
//     getTaskForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const userName = document.getElementById('get-user-name').value;

//         fetch(`http://127.0.0.1:3002/tasks?userName=${encodeURIComponent(userName)}`, { method: 'GET' })
//         .then(response => response.json())
//         .then(data => {
//             const userDataDiv = document.getElementById('user-data');
//             userDataDiv.innerHTML = '';
//             data.forEach(task => {
//                 const taskElement = document.createElement('div');
//                 taskElement.innerHTML = `<h3>${task.title}</h3><p>${task.description}</p>`;
//                 userDataDiv.appendChild(taskElement);
//             });
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             alert('Error retrieving user data');
//         });
//     });

//     // Delete Task
//     deleteTaskForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const userName = document.getElementById('delete-user-name').value;

//         fetch(`http://127.0.0.1:3002/tasks?userName=${encodeURIComponent(userName)}`, { method: 'DELETE' })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Deleted user data:', data);
//             alert('User data deleted successfully!');
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             alert('Error deleting user data');
//         });
//     });

//     // Update Task
//     updateTaskForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const userName = document.getElementById('update-user-name').value;
//         const title = document.getElementById('update-task-title').value;
//         const description = document.getElementById('update-task-description').value;

//         fetch('http://127.0.0.1:3002/tasks/update', {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ userName, title, description })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.error) {
//                 alert(`Error: ${data.error}`);
//             } else {
//                 console.log('Updated task:', data);
//                 alert('Task updated successfully!');
//             }
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             alert('Error updating task');
//         });
//     });

//     // Logout
//     document.getElementById('logout-button').addEventListener('click', function() {
//         localStorage.removeItem('userInfo'); // Clear user info from localStorage
//         window.location.href = 'login.html'; // Redirect to login page
//     });
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const loginForm = document.getElementById('login-form');
//     const registerForm = document.getElementById('register-form');
//     const userImage = document.getElementById('user-image');
//     const welcomeMessage = document.getElementById('welcome-message');
//     const addTaskForm = document.getElementById('add-task-form');
//     const getTaskForm = document.getElementById('get-task-form');
//     const deleteTaskForm = document.getElementById('delete-task-form');
//     const updateTaskForm = document.getElementById('update-task-form');
    
// function displayUserInfo() {
//     const userInfoJSON = localStorage.getItem('userInfo');
//     console.log("Stored userInfo:", userInfoJSON);  // Check what is actually retrieved

//     if (userInfoJSON) {
//         const userInfo = JSON.parse(userInfoJSON);
//         console.log("Parsed userInfo:", userInfo);  // See the contents of parsed userInfo

//         if (userInfo.imageFile) {
//             userImage.src = `http://127.0.0.1:3002/images/${userInfo.imageFile}`;
//             userImage.style.display = 'block';
//         } else {
//             userImage.style.display = 'none';
//         }

//         if (userInfo.name) {
//             welcomeMessage.textContent = `Hi, ${userInfo.name}!`;
//         } else {
//             console.log("Name is missing from userInfo");
//             welcomeMessage.textContent = "Welcome!";
//         }
//     } else {
//         console.log("No userInfo found in localStorage");
//         userImage.style.display = 'none';
//         welcomeMessage.textContent = "Welcome!";
//     }
// }

// displayUserInfo();


//     if (loginForm) {
//         loginForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const username = document.getElementById('login-username').value;
//             const password = document.getElementById('login-password').value;

//             fetch('http://127.0.0.1:3002/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, password })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.user) {
//                     localStorage.setItem('userInfo', JSON.stringify(data.user));
//                     displayUserInfo();  // Update UI with user info
//                     window.location.href = 'dashboard.html';  // Redirect to dashboard after login
//                 } else {
//                     alert(data.error || 'Login failed');
//                 }
//             })
//             .catch(error => {
//                 console.error('Login Error:', error);
//                 alert('Login error, please try again');
//             });
//         });
//     }

//     addTaskForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const userName = document.getElementById('user-name').value;
//         const title = document.getElementById('task-title').value;
//         const description = document.getElementById('task-description').value;

//         fetch('http://127.0.0.1:3002/tasks', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ userName, title, description })
//         })
//         .then(response => response.json())
//         .then(data => {
//             const taskElement = document.createElement('div');
//             taskElement.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
//             document.getElementById('user-data').appendChild(taskElement);
//             alert('Task added successfully!');
//             addTaskForm.reset();
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Error adding task');
//         });
//     });

//     getTaskForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const userName = document.getElementById('get-user-name').value;

//         fetch(`http://127.0.0.1:3002/tasks?userName=${encodeURIComponent(userName)}`, { method: 'GET' })
//         .then(response => response.json())
//         .then(data => {
//             const userDataDiv = document.getElementById('user-data');
//             userDataDiv.innerHTML = '';
//             data.forEach(task => {
//                 const taskElement = document.createElement('div');
//                 taskElement.innerHTML = `<h3>${task.title}</h3><p>${task.description}</p>`;
//                 userDataDiv.appendChild(taskElement);
//             });
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Error retrieving user data');
//         });
//     });

//     deleteTaskForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const userName = document.getElementById('delete-user-name').value;

//         fetch(`http://127.0.0.1:3002/tasks?userName=${encodeURIComponent(userName)}`, { method: 'DELETE' })
//         .then(response => response.json())
//         .then(data => {
//             alert('User data deleted successfully!');
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Error deleting user data');
//         });
//     });

//     updateTaskForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const userName = document.getElementById('update-user-name').value;
//         const title = document

// .getElementById('update-task-title').value;
//         const description = document.getElementById('update-task-description').value;

//         fetch('http://127.0.0.1:3002/tasks/update', {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ userName, title, description })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.error) {
//                 alert(`Error: ${data.error}`);
//             } else {
//                 alert('Task updated successfully!');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Error updating task');
//         });
//     });

//     document.getElementById('logout-button').addEventListener('click', function() {
//         localStorage.removeItem('userInfo');  // Clear user info from localStorage
//         window.location.href = 'login.html';  // Redirect to login page
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const userImage = document.getElementById('user-image');
    const welcomeMessage = document.getElementById('welcome-message');
    const addTaskForm = document.getElementById('add-task-form');
    const getTaskForm = document.getElementById('get-task-form');
    const deleteTaskForm = document.getElementById('delete-task-form');
    const updateTaskForm = document.getElementById('update-task-form');

    function displayUserInfo() {
        const usersJSON = localStorage.getItem(users);
        console.log("Stored users:", usersJSON);  // Check what is actually retrieved

        if (usersJSON) {
            const users = JSON.parse(usersJSON);
            console.log("Parsed users:", users);  // See the contents of parsed users

            // Assuming you want to display info for the first user in the array
            const userInfo = users[0];  // Change this if you need a different user

            if (userInfo) {
                if (userInfo.imageFile) {
                    userImage.src = `http://127.0.0.1:3002/images/${userInfo.imageFile}`;
                    userImage.style.display = 'block';
                } else {
                    userImage.style.display = 'none';
                }

                if (userInfo.name) {
                    welcomeMessage.textContent = `Hi, ${userInfo.name}!`;
                } else {
                    console.log("Name is missing from userInfo");
                    welcomeMessage.textContent = "Welcome!";
                }
            } else {
                console.log("No userInfo found in users array");
                userImage.style.display = 'none';
                welcomeMessage.textContent = "Welcome!";
            }
        } else {
            console.log("No users found in localStorage");
            userImage.style.display = 'none';
            welcomeMessage.textContent = "Welcome!";
        }
    }

    displayUserInfo();

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            fetch('http://127.0.0.1:3002/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Login response data:", data);  // Debug login response

                if (data.user) {
                    let users = [];
                    const usersJSON = localStorage.getItem('users');
                    if (usersJSON) {
                        users = JSON.parse(usersJSON);
                    }
                    users.push(data.user);
                    localStorage.setItem('users', JSON.stringify(users));
                    console.log("Users after login:", JSON.stringify(users));  // Debug stored users
                    displayUserInfo();  // Update UI with user info
                    window.location.href = 'dashboard.html';  // Redirect to dashboard after login
                } else {
                    alert(data.error || 'Login failed');
                }
            })
            .catch(error => {
                console.error('Login Error:', error);
                alert('Login error, please try again');
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;

            fetch('http://127.0.0.1:3002/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Register response data:", data);  // Debug register response

                if (data.user) {
                    let users = [];
                    const usersJSON = localStorage.getItem('users');
                    if (usersJSON) {
                        users = JSON.parse(usersJSON);
                    }
                    users.push(data.user);
                    localStorage.setItem('users', JSON.stringify(users));
                    console.log("Users after registration:", JSON.stringify(users));  // Debug stored users
                    displayUserInfo();  // Update UI with user info
                    window.location.href = 'dashboard.html';  // Redirect to dashboard after registration
                } else {
                    alert(data.error || 'Registration failed');
                }
            })
            .catch(error => {
                console.error('Registration Error:', error);
                alert('Registration error, please try again');
            });
        });
    }

    if (addTaskForm) {
        addTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userName = document.getElementById('user-name').value;
            const title = document.getElementById('task-title').value;
            const description = document.getElementById('task-description').value;

            fetch('http://127.0.0.1:3002/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, title, description })
            })
            .then(response => response.json())
            .then(data => {
                const taskElement = document.createElement('div');
                taskElement.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
                document.getElementById('user-data').appendChild(taskElement);
                alert('Task added successfully!');
                addTaskForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error adding task');
            });
        });
    }

    if (getTaskForm) {
        getTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userName = document.getElementById('get-user-name').value;

            fetch(`http://127.0.0.1:3002/tasks?userName=${encodeURIComponent(userName)}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                const userDataDiv = document.getElementById('user-data');
                userDataDiv.innerHTML = '';
                data.forEach(task => {
                    const taskElement = document.createElement('div');
                    taskElement.innerHTML = `<h3>${task.title}</h3><p>${task.description}</p>`;
                    userDataDiv.appendChild(taskElement);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error retrieving user data');
            });
        });
    }

    if (deleteTaskForm) {
        deleteTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userName = document.getElementById('delete-user-name').value;

            fetch(`http://127.0.0.1:3002/tasks?userName=${encodeURIComponent(userName)}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert('User data deleted successfully!');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error deleting user data');
            });
        });
    }

    if (updateTaskForm) {
        updateTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userName = document.getElementById('update-user-name').value;
            const title = document.getElementById('update-task-title').value;
            const description = document.getElementById('update-task-description').value;

            fetch('http://127.0.0.1:3002/tasks/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, title, description })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(`Error: ${data.error}`);
                } else {
                    alert('Task updated successfully!');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error updating task');
            });
        });
    }

    document.getElementById('logout-button').addEventListener('click', function() {
        localStorage.removeItem('users');  // Clear user info from localStorage
        window.location.href = 'login.html';  // Redirect to login page
    });
});
