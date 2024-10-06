const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment-body').value.trim();
    const blog_id = document.querySelector('#blog-id').value.trim();
  
    if (comment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment, blog_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add comment. Please try again.');
      }
    }
  };
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
  