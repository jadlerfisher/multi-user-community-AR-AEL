function validateRegister(email, password, confirmPassword) {
  var hasValidated = validateLogin(email, password);
  var errors = [];
  var form = document.getElementsByClassName('card-container')[0];

  if (password !== confirmPassword) {
    errors.push('Confirm password has to match.');
  }

  displayAlerts(errors, form);
  return hasValidated && errors.length == 0;
}

function validateLogin(email, password) {
  var alert = document.getElementsByClassName('alert-wrapper');
  if (alert.length) {
    alert[0].remove();
  }

  var errors = [];
  var form = document.getElementsByClassName('card-container')[0];

  if (email === '') {
    errors.push('Email can\'t be empty.');
  }

  if (password === '') {
    errors.push('Password can\'t be empty.');
  }

  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    errors.push('Email is not valid.');
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long.');
  }

  if (errors.length) {
    wrapper = document.createElement('div');
    wrapper.className = 'alert-wrapper';
    displayAlerts(errors, form);
  }

  return errors.length == 0;
}

function displayAlerts(errors, form) {
  for (var i = 0; i < errors.length; i++) {
    div = document.createElement('div');
    div.className = 'alert alert-danger';
    div.role = 'alert';
    div.innerHTML = errors[i];
    wrapper.appendChild(div);
    form.appendChild(wrapper);
  }
}
