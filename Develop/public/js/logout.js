document.getElementById('logout-button')?.addEventListener('click', async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensure cookies are sent
    });
  
    if (response.ok) {
      // Redirect to the homepage after successful logout
      window.location.href = '/';  // Redirect to the homepage
    } else {
      // Handle error
      console.error('Logout failed');
      alert('Failed to log out. Please try again.');
    }
  });
  