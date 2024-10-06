module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
  
    format_plural: (word, amount) => {
      // Format words to be plural
      if (amount !== 1) {
        return `${word}s`;
      }
      return word;
    },
  
    format_url: (url) => {
      // Shorten URLs for display
      return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split('/')[0];
    },
  };
  