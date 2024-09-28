document.getElementById('cat').addEventListener('mouseover', function() {
    const hello = document.getElementById('hello');
    hello.classList.add('fall');
  
    // Wait for the animation to complete before redirecting
    hello.addEventListener('transitionend', function() {
      window.location.href = 'login.html'; // Redirect to login.html
    });
  });
  