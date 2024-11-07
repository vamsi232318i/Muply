const form = document.getElementById('signinForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const flag=0
    if (username === '' || password === '') {
        alert('Please fill in all fields.');
    } else if(!checkusername(username))
        {
          document.getElementById('error').innerHTML="Username Does't strat with number!!!!";
          document.getElementById('error').style.display="block";
          return;
        }
        else if(password.length<8)
        {
          document.getElementById('error').innerHTML="Password Length is minimum 8 charcters!!!";
          document.getElementById('error').style.display="block";
          return;
        }
        this.submit();
        
});
function checkusername(username)
{
  const regex = /^[A-Za-z]/;
  return regex.test(username);
}