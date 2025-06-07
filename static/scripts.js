function getData() {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        document.getElementById('output').textContent = data.message;
      })
      .catch(error => console.error('Error:', error));
  }