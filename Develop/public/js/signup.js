const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
      const response = await fetch('/api/users/signup', { // Ensure this matches the route in your userRoutes.js
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          const errorResponse = await response.json(); // Get the error response for debugging
          console.error('Sign up error:', errorResponse); // Log the error for debugging
          alert('Failed to sign up. Please try again.');
      }
  }
};

document.querySelector('.signup-form form').addEventListener('submit', signupFormHandler); // Attach the event listener to the form
