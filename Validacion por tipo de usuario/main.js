document.addEventListener('DOMContentLoaded', (event) => {
  // Elementos del formulario de inicio de sesión
  const loginButton = document.getElementById('loginButton');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const passwordError2 = document.getElementById('passwordError2');

  // Agregar evento de clic al botón de inicio de sesión
  loginButton.addEventListener('click', function(event) {
    validateLoginFields();
  });

  // Validación de entrada de correo electrónico en tiempo real
  emailInput.addEventListener('input', function() {
    validateLoginEmail();
    updateLoginButtonState();
  });

  // Validación de entrada de contraseña en tiempo real
  passwordInput.addEventListener('input', function() {
    validateLoginPassword();
    updateLoginButtonState();
  });

  // Función para validar los campos de inicio de sesión
  function validateLoginFields() {
    const isEmailValid = validateLoginEmail();
    const isPasswordValid = validateLoginPassword();

    if (isEmailValid && isPasswordValid) {
      const username = emailInput.value;
      const password = passwordInput.value;
      const storedPassword = localStorage.getItem(username);
      if (storedPassword === password) {
        alert('Inicio de sesión exitoso!');
      } else {
        passwordError2.style.display = 'block';
      }
    }
  }

  // Función para validar el correo electrónico de inicio de sesión
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

  // Función para validar la contraseña de inicio de sesión
  function validateLoginPassword() {
    if (passwordInput.value.trim().length < 8) {
      passwordError.style.display = 'block';
      return false;
    } else {
      passwordError.style.display = 'none';
      return true;
    }
  }

  // Función para actualizar el estado del botón de inicio de sesión
  function updateLoginButtonState() {
    const isPasswordValid = passwordInput.value.trim().length >= 8;
    const isEmailValid = validateLoginEmail();

    loginButton.disabled = !(isPasswordValid && isEmailValid);
  }

  // Elementos del formulario de registro
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

  // Agregar evento de clic al botón de registro
  registerButton.addEventListener('click', function(event) {
    validateRegisterFields();
  });

  // Validación de entrada de nombre en tiempo real
  registerFirstName.addEventListener('input', function() {
    if (registerFirstName.value.trim()) {
      registerFirstNameError.style.display = 'none';
    }
    updateRegisterButtonState();
  });

  // Validación de entrada de apellidos en tiempo real
  registerLastName.addEventListener('input', function() {
    if (registerLastName.value.trim()) {
      registerLastNameError.style.display = 'none';
    }
    updateRegisterButtonState();
  });

  // Validación de entrada de correo electrónico en tiempo real
  registerEmail.addEventListener('input', function() {
    validateRegisterEmail();
    updateRegisterButtonState();
  });

  // Validación de entrada de contraseña en tiempo real
  registerPassword.addEventListener('input', function() {
    if (registerPassword.value.trim().length >= 8) {
      registerPasswordError.style.display = 'none';
    }
    updateRegisterButtonState();
  });

  // Validación de entrada de confirmación de contraseña en tiempo real
  registerConfirmPassword.addEventListener('input', function() {
    if (registerPassword.value.trim() === registerConfirmPassword.value.trim()) {
      registerConfirmPasswordError.style.display = 'none';
    }
    updateRegisterButtonState();
  });

  // Función para validar los campos de registro
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

    if (isValid) {
      alert('Registro exitoso');
      $('#registerModal').modal('hide');
      // Guardar los datos en LocalStorage
      const userData = {
        firstName: registerFirstName.value.trim(),
        lastName: registerLastName.value.trim(),
        password: registerPassword.value.trim()
      };
      localStorage.setItem(registerEmail.value.trim(), JSON.stringify(userData));
    }
  }

  // Función para validar el correo electrónico de registro
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

  // Función para actualizar el estado del botón de registro
  function updateRegisterButtonState() {
    const isFirstNameValid = registerFirstName.value.trim().length > 0;
    const isLastNameValid = registerLastName.value.trim().length > 0;
    const isEmailValid = validateRegisterEmail();
    const isPasswordValid = registerPassword.value.trim().length >= 8;
    const isConfirmPasswordValid = registerPassword.value.trim() === registerConfirmPassword.value.trim();
    registerButton.disabled = !(isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid);
  }
});
