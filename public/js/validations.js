function validateUserCredentials(email, password, confirmPassword=null) {
  var alert = document.getElementsByClassName('alert-wrapper');
  if (alert.length) {
    alert[0].remove();
  }

  var errors = [];
  var form = document.getElementsByClassName('card-container')[0];

  if (email) {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      errors.push('Email is not valid.');
    }
  } else {
    errors.push('Email can\'t be empty.');
  }

  if (password === '') {
    errors.push('Password can\'t be empty.');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
  }

  // Validate confirmPassword if the parameter is passed in
  if (confirmPassword !== null) {
    if (confirmPassword === '') {
      errors.push('Confirm password can\'t be empty.');
    } else if (password !== confirmPassword) {
      errors.push('Password and confirm password must match.');
    }
  }

  if (errors.length) {
    displayAlerts(errors, form);
  }

  return errors.length == 0;
}

function displayAlerts(errors, form) {
  var wrapper = document.createElement('div');
  wrapper.className = 'alert-wrapper';

  for (var i = 0; i < errors.length; i++) {
    div = document.createElement('div');
    div.className = 'alert alert-danger';
    div.role = 'alert';
    div.innerHTML = errors[i];
    wrapper.appendChild(div);
    form.appendChild(wrapper);
  }
}
