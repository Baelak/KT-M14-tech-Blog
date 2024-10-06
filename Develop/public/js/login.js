const loginFormHandler = async (event) => {
  event.preventDefault();

  // Update the variable names to reflect the input fields in your login.handlebars
  const username = document.querySelector('#username-login').value.trim(); // Change 'email' to 'username'
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
      const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }), // Use 'username' instead of 'email'
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          const errorResponse = await response.json(); // Get the error response for debugging
          alert(`Failed to log in. ${errorResponse.message || 'Please try again.'}`);
      }
  }
};

// Ensure that the correct selector matches your login form class in login.handlebars
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
