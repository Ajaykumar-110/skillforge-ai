// Simple connection test
fetch('http://localhost:5000/api/health')
  .then(response => response.json())
  .then(data => console.log('Backend is working:', data))
  .catch(error => console.log('Backend connection failed:', error));
