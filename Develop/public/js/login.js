const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const errorResponse = await response.json(); // Get the error response for debugging
            console.error('Login error:', errorResponse); // Log the error for debugging
            alert(`Failed to log in. ${errorResponse.message || 'Please try again.'}`);
        }
    }
  };
  
  // Ensure that the correct selector matches your login form class in login.handlebars
  document.querySelector('.login-form form').addEventListener('submit', loginFormHandler); // Attach the event listener to the form
  