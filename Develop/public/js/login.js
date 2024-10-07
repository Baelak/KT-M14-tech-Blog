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
                // Redirect to dashboard after successful login
                document.location.replace('/dashboard');
            } else {
                const errorResponse = await response.json();
                console.error('Login error:', errorResponse);
                alert(`Failed to log in. ${errorResponse.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error('Network or server error:', error);
            alert('An error occurred. Please check your network connection and try again.');
        }
    } else {
        alert('Please enter both username and password.');
    }
};
  
// Make sure the class selector below matches the login form in your Handlebars file
document.querySelector('.login-form form').addEventListener('submit', loginFormHandler);
