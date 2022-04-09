const switchButtonRegister = document.querySelector('#switch-button-register');
const switchButtonLogin = document.querySelector('#switch-button-login');
const signupView = document.querySelector('#signup');
const signinView = document.querySelector('#signin');

switchButtonLogin.addEventListener('click', (e) => {
  e.preventDefault();

  signupView.style.display = 'block';
  signinView.style.display = 'none';
});

switchButtonRegister.addEventListener('click', (e) => {
  e.preventDefault();

  signupView.style.display = 'none';
  signinView.style.display = 'block';
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
