document.addEventListener('DOMContentLoaded', (event) => {
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const passwordError2 = document.getElementById('passwordError2');
    const registerButton = document.getElementById('registerButton');
    const registerFirstName = document.getElementById('registerFirstName');
    const registerLastName = document.getElementById('registerLastName');
    const registerEmail = document.getElementById('registerEmail');
    const registerPassword = document.getElementById('registerPassword');
    const registerConfirmPassword = document.getElementById('registerConfirmPassword');
    const registerFirstNameError = document.getElementById('registerFirstNameError');
    const registerLastNameError = document.getElementById('registerLastNameError');
    const registerEmailError = document.getElementById('registerEmailError');
    const registerPasswordError = document.getElementById('registerPasswordError');
    const registerConfirmPasswordError = document.getElementById('registerConfirmPasswordError');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
  
    // Validar Logeo
    loginButton.addEventListener('click', function(event) {
      if (validateLoginFields()) {
        handleLogin();
      }
    });
  
    function validateLoginFields() {
      let isValid = true;
  
      if (!validateLoginEmail()) {
        isValid = false;
      }
  
      if (!validateLoginPassword()) {
        isValid = false;
      }
  
      return isValid;
    }
  
    function validateLoginEmail() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailError.style.display = 'block';
        return false;
      } else {
        emailError.style.display = 'none';
        return true;
      }
    }
  
    function validateLoginPassword() {
      if (passwordInput.value.trim().length < 8) {
        passwordError.style.display = 'block'; 
        return false;
      } else {
        passwordError.style.display = 'none';
        return true;
      }
    }
  
    emailInput.addEventListener('input', function() {
      validateLoginEmail();
      updateLoginButtonState();
    });
  
    passwordInput.addEventListener('input', function() {
      validateLoginPassword();
      updateLoginButtonState();
    });
  
    function updateLoginButtonState() {
      const isPasswordValid = passwordInput.value.trim().length >= 8;
      const isEmailValid = validateLoginEmail();
  
      loginButton.disabled = !(isPasswordValid && isEmailValid);
    }
  
    function handleLogin() {
      const username = emailInput.value;
      const password = passwordInput.value;
  
      const storedPassword = localStorage.getItem(username);
      if (storedPassword === password) {
        alert('Inicio de sesión exitoso!');
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    }
  
    // Registro
    registerButton.addEventListener('click', function(event) {
      if (validateRegisterFields()) {
        handleRegister();
      }
    });
  
    function validateRegisterFields() {
      let isValid = true;
  
      if (!registerFirstName.value.trim()) {
        registerFirstNameError.style.display = 'block';
        isValid = false;
      } else {
        registerFirstNameError.style.display = 'none';
      }
  
      if (!registerLastName.value.trim()) {
        registerLastNameError.style.display = 'block';
        isValid = false;
      } else {
        registerLastNameError.style.display = 'none';
      }
  
      if (!validateRegisterEmail()) {
        isValid = false;
      }
  
      if (registerPassword.value.trim().length < 8) {
        registerPasswordError.style.display = 'block';
        isValid = false;
      } else {
        registerPasswordError.style.display = 'none';
      }
  
      if (registerPassword.value.trim() !== registerConfirmPassword.value.trim()) {
        registerConfirmPasswordError.style.display = 'block';
        isValid = false;
      } else {
        registerConfirmPasswordError.style.display = 'none';
      }
  
      return isValid;
    }
  
    function validateRegisterEmail() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(registerEmail.value.trim())) {
        registerEmailError.style.display = 'block';
        return false;
      } else {
        registerEmailError.style.display = 'none';
        return true;
      }
    }
  
    function handleRegister() {
      const username = registerEmail.value;
      const password = registerPassword.value;
  
      localStorage.setItem(username, password);
      alert('Usuario registrado exitosamente!');
      $('#registerModal').modal('hide');
    }
  
    // Validación en tiempo real 
    registerFirstName.addEventListener('input', function() {
      if (registerFirstName.value.trim()) {
        registerFirstNameError.style.display = 'none';
      }
    });
  
    registerLastName.addEventListener('input', function() {
      if (registerLastName.value.trim()) {
        registerLastNameError.style.display = 'none';
      }
    });
  
    registerEmail.addEventListener('input', function() {
      validateRegisterEmail();
    });
  
    registerPassword.addEventListener('input', function() {
      if (registerPassword.value.trim().length >= 8) {
        registerPasswordError.style.display = 'none';
      }
    });
  
    registerConfirmPassword.addEventListener('input', function() {
      if (registerPassword.value.trim() === registerConfirmPassword.value.trim()) {
        registerConfirmPasswordError.style.display = 'none';
      }
    });
  });
  