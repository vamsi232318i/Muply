
document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const genre = document.getElementById('genre').value;
  const successMessage = document.getElementById('success-message');

  if (!name || !email || !password || !genre) {
    alert('Please fill in all fields');
    return;
  }
  else if (!checkUsername(name)) {
    successMessage.textContent = 'Username must not start with a number';
    successMessage.style.display = 'block';
    return;
  }
  else if (password.length < 8) {
    successMessage.textContent = 'Password must be at least 8 characters long';
    successMessage.style.display = 'block';
    return;
  }

  this.submit(); 
});

function checkUsername(username) {
  const regex = /^[A-Za-z]/;
  return regex.test(username);
}