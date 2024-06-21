
// document.addEventListener('DOMContentLoaded', function() {
//     const loginForm = document.getElementById('login-form');
//     const registerForm = document.getElementById('register-form');
//     const loginFormContainer = document.getElementById('login-form-container');
//     const registerFormContainer = document.getElementById('register-form-container');
//     const showRegisterFormLink = document.getElementById('show-register-form');
//     const showLoginFormLink = document.getElementById('show-login-form');

//     showRegisterFormLink.addEventListener('click', function(e) {
//         e.preventDefault();
//         loginFormContainer.style.display = 'none';
//         registerFormContainer.style.display = 'block';
//     });

//     showLoginFormLink.addEventListener('click', function(e) {
//         e.preventDefault();
//         registerFormContainer.style.display = 'none';
//         loginFormContainer.style.display = 'block';
//     });

//     loginForm.addEventListener('submit', function(e) {
//         e.preventDefault();

//         const username = document.getElementById('login-username').value;
//         const password = document.getElementById('login-password').value;

//         fetch('http://127.0.0.1:3002/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: username,
//                 password: password
//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.error) {
//                 alert(`Error: ${data.error}`);
//             } else {
//                 console.log('Logged in user:', data.user);
//                 loginForm.reset();
//                 window.location.href = 'http://localhost:3002/'; 
//             }
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             alert('Error logging in');
//         });
//     });

//     registerForm.addEventListener('submit', function(e) {
//         e.preventDefault();

//         const name = document.getElementById('register-name').value;
//         const username = document.getElementById('register-username').value;
//         const password = document.getElementById('register-password').value;

//         fetch('http://127.0.0.1:3002/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: name,
//                 username: username,
//                 password: password
//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.error) {
//                 alert(`Error: ${data.error}`);
//             } else {
//                 alert('Registration successful!');
//                 registerForm.reset();
//                 showLoginFormLink.click(); // Switch to login form after successful regßistration
//             }
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             alert('Error registering');
//         });
//     });
// });
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginFormContainer = document.getElementById('login-form-container');
    const registerFormContainer = document.getElementById('register-form-container');
    const userImage = document.getElementById('user-image');
    const welcomeMessage = document.getElementById('welcome-message');
    const showRegisterFormLink = document.getElementById('show-register-form');
    const showLoginFormLink = document.getElementById('show-login-form');

    function validateInput(username, password) {
        return username.length > 0 && password.length > 5;
    }

    function displayMessage(message, isError = false) {
        const msgClass = isError ? 'error-msg' : 'success-msg';
        const msgElement = document.createElement('div');
        msgElement.className = msgClass;
        msgElement.textContent = message;
        document.body.appendChild(msgElement);
        setTimeout(() => msgElement.remove(), 5000);
    }

    showRegisterFormLink.addEventListener('click', e => {
        e.preventDefault();
        loginFormContainer.style.display = 'none';
        registerFormContainer.style.display = 'block';
    });

    showLoginFormLink.addEventListener('click', e => {
        e.preventDefault();
        registerFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    });

    loginForm.addEventListener('submit', async e => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (!validateInput(username, password)) {
            displayMessage('Invalid input. Please check your username and password.', true);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:3002/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            console.log('Logged in user:', data.user);
            loginForm.reset();
            if (data.user.imageFile) {
                userImage.src = `http://127.0.0.1:3002/images/${data.user.imageFile}`;
                userImage.style.display = 'block';
            }
            welcomeMessage.textContent = `Welcome, ${data.user.name}!`;
            window.location.href = 'index.html'; // Make sure this page is correctly configured to handle user data
        } catch (error) {
            console.error('Error:', error);
            displayMessage(`Error logging in: ${error.message}`, true);
        }
    });

    registerForm.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        try {
            const response = await fetch('http://127.0.0.1:3002/register', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.error) {
                displayMessage(`Error: ${data.error}`, true);
            } else {
                alert('Registration successful!');
                registerForm.reset();
                showLoginFormLink.click(); // Switch to login form after successful registration
            }
        } catch (error) {
            console.error('Error:', error);
            displayMessage('Error registering. Please try again.', true);
        }
    });
});
