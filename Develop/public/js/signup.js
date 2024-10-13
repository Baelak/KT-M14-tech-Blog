// public/js/signup.js

// Function to handle the signup form submission
const signupFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieve input values and trim any whitespace
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Check if all fields are filled
  if (username && email && password) {
    try {
      // Send a POST request to the signup route
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Handle the server response
      if (response.ok) {
        const result = await response.json(); // Parse the JSON response
        alert(result.message); // Display the success message
        document.location.replace(result.redirect); // Redirect to the dashboard
      } else {
        // Parse the error response if signup fails
        const errorResponse = await response.json();
        console.error('Signup error:', errorResponse); // Log the error details
        alert(`Failed to sign up: ${errorResponse.message || 'Please try again.'}`);
      }
    } catch (error) {
      // Handle any unexpected errors during the fetch
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  } else {
    // Alert if any of the fields are empty
    alert('Please fill in all fields.');
  }
};

// Attach the event listener to the signup form
document.querySelector('.signup-form form').addEventListener('submit', signupFormHandler);
