import Authorization from './components/Authorization.js';
import Registration from './components/Registration.js';

document.querySelector('.loader').style.display = 'none';

let authorization = new Authorization;
authorization.init();

let registration = new Registration;
registration.init();