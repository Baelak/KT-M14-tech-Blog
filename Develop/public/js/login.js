// public/js/login.js

// Function to handle the login form submission
const loginFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json(); // Parse the JSON response
                alert(data.message); // Optionally alert the user
                document.location.replace(data.redirect); // Redirect to dashboard
            } else {
                const errorResponse = await response.json();
                console.error('Login error:', errorResponse);
                alert(`Failed to log in. ${errorResponse.message || 'Please try again. 😅'}`);
            }
        } catch (error) {
            console.error('Network or server error:', error);
            alert('An error occurred. Please check your network connection and try again.');
        }
    } else {
        alert('Please enter both username and password.');
    }
};

// Attach the event listener to the login form
document.querySelector('.login-form form').addEventListener('submit', loginFormHandler);
