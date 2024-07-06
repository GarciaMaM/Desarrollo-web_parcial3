document.addEventListener('DOMContentLoaded', (event) => {
  const loginButton = document.getElementById('loginButton');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const passwordError2 = document.getElementById('passwordError2');

  loginButton.addEventListener('click', function(event) {
      validateFields();
  });

  function validateFields() {
      validateEmail();
      validatePassword();
      updateSubmitButtonState();

      if (validatePassword() && passwordInput.value.trim() != 'admin123') {
          passwordError2.style.display = 'block'; 
      } else {
          passwordError2.style.display = 'none'; 
      }

      if (isValidDefEmail()) {
          showAlert('Usuario ya registrado. Verifica las alertas.');
          if (!emailInput.value.trim()) {
              emailError.style.display = 'block';
          }
      } else {
          showAlert('El usuario no fue encontrado.');
      }
  }

  function isValidDefEmail() {
      var defEmail = "prueba@gmail.com";
      return isValidEmail() && defEmail === emailInput.value.trim();
  }

  function isValidEmail() {
      var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(emailInput.value.trim())) {
          emailError.style.display = 'block';
      } else {
          emailError.style.display = 'none';
      }
      return emailRegex.test(emailInput.value.trim());
  }

  function validatePassword() {
      passwordError.style.display = 'none';
      passwordError2.style.display = 'none';

      if (passwordInput.value.trim().length < 8) {
          passwordError.style.display = 'block'; 
          return false;
      } else {
          passwordError.style.display = 'none';
          return true;
      }
  }

  emailInput.addEventListener('input', function() {
      isValidEmail();
      updateSubmitButtonState();
  });

  passwordInput.addEventListener('input', function() {
      validatePassword();
      updateSubmitButtonState();
  });

  function updateSubmitButtonState() {
      var isPasswordValid = passwordInput.value.trim().length >= 8;
      var isEmailValid = isValidEmail();

      loginButton.disabled = !(isPasswordValid && isEmailValid);
  }

  function showAlert(message) {
      alert(message);
  }
});



