// Function to handle the new post form submission
const newPostFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        try {
            const response = await fetch('/api/blogs/newpost', {
                method: 'POST',
                body: JSON.stringify({ title, content }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // Optionally, show a success message
                alert('Post created successfully!');
                document.location.replace('/dashboard'); // Redirect to dashboard
            } else {
                const errorResponse = await response.json();
                console.error('New Post error:', errorResponse);
                alert(`Failed to create post: ${errorResponse.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    } else {
        alert('Please provide both title and content for the post.');
    }
};

// Attach the event listener to the new post form
document.querySelector('#new-post-form').addEventListener('submit', newPostFormHandler);
