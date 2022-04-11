const switchButtonRegister = document.querySelector('#switch-button-register');
const switchButtonLogin = document.querySelector('#switch-button-login');
const signupView = document.querySelector('#signup');
const signinView = document.querySelector('#signin');

const formSignIn = document.querySelector('.signin-form');
const formSignUp = document.querySelector('.signup-form');

const signinUsername = document.querySelector('#signin-username');
const signinPassword = document.querySelector('#signin-password');

const signupUsername = document.querySelector('#signup-username');
const signupAvatar = document.querySelector('#signup-avatar');
const signupFirstName = document.querySelector('#signup-firstname');
const signupLastName = document.querySelector('#signup-lastname');
const signupPassword = document.querySelector('#signup-password');

const submitSignup = document.querySelector('#submitSignup');
const submitSignin = document.querySelector('#submitSignin');

switchButtonLogin.addEventListener('click', (e) => {
  e.preventDefault();

  signupView.style.display = 'none';
  signinView.style.display = 'block';
});

switchButtonRegister.addEventListener('click', (e) => {
  e.preventDefault();

  signupView.style.display = 'block';
  signinView.style.display = 'none';
});

submitSignup.addEventListener('click', async (e) => {
  e.preventDefault();

  const response = await fetch('/auth/signup/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: signupUsername.value,
      firstName: signupFirstName.value,
      lastName: signupLastName.value,
      password: signupPassword.value,
      avatar: signupAvatar.value
    }),
  });

  const parsedResponse = await response.json();
  document.location.reload();
});

submitSignin.addEventListener('click', async (e) => {
  e.preventDefault();

  const response = await fetch('/auth/signin/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: signinUsername.value,
      password: signinPassword.value,
    }),
  });

  const parsedResponse = await response.json();
  document.location.reload();
});

(function ($) {
  'use strict';

  $('.toggle-password').click(function () {
    $(this).toggleClass('fa-eye fa-eye-slash');
    var input = $($(this).attr('toggle'));
    if (input.attr('type') == 'password') {
      input.attr('type', 'text');
    } else {
      input.attr('type', 'password');
    }
  });
})(jQuery);
