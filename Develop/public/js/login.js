// public/js/login.js
const loginFormHandler = async (event) => {
    event.preventDefault();
  
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
          const data = await response.json();
          console.log('Login success:', data); // Log successful login response
  
          // Check for redirect property in the response
          if (data.redirect) {
            console.log(`Redirecting to ${data.redirect}`);
            document.location.replace(data.redirect); // Client-side redirection
          } else {
            console.error('No redirect URL in response:', data);
            alert('Login successful, but no redirect URL provided.');
          }
        } else {
          const errorResponse = await response.json();
          console.error('Login error:', errorResponse); // Log error details
          alert(`Failed to log in. ${errorResponse.message || 'Please try again.'}`);
        }
      } catch (error) {
        console.error('Network or server error:', error); // Log network/server issues
        alert('An error occurred. Please check your network connection and try again.');
      }
    } else {
      alert('Please enter both username and password.');
    }
  };
  
  document.querySelector('.login-form form').addEventListener('submit', loginFormHandler);
  