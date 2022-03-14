import DB from "./DB.js";
export default class Registration {
	constructor() {
		this.DB = new DB;
		this.initDOM();
	}

	initDOM() {
		this.form = document.querySelector('#registration');
		this.inpLogin = document.querySelector('#newLogin');
		this.inpPass = document.querySelector('#newPass');
		this.inpConfirmPass = document.querySelector('#newPassConfirm');
		this.chbx = document.querySelector('#signUpdates');
	}

	passwordsConfirmed(pass1, pass2) {
		if (pass1 === pass2) {
			return true;
		}
		return false;
	}

	addNewUser = (db, newUser) => {
		db.addEventListener('error', err => {
			this.DB.showPopUp('such login has already exist');
			return;
		});

		let transaction = db.transaction('users', "readwrite");
		let store = transaction.objectStore('users');
		let request = store.add(newUser);

		request.addEventListener('success', ev => {
			this.DB.showPopUp('you have created an account');
			this.DB.redirect('./home.html');
			// this.DB.clearBusket();
		});
	}

	getValues() {
		let pass2 = this.inpConfirmPass.value;
		let newUser = {
			login : this.inpLogin.value,
			password : this.inpPass.value,
			isSignUpdates : this.chbx.checked
		}

		return {pass2, newUser};
	}

	checkForm = async (db) => {
		let { pass2, newUser } = this.getValues();
		if (!this.passwordsConfirmed(newUser.password, pass2)) {
			this.DB.showPopUp('password is not confirm');
		}
		else if (newUser.login && this.passwordsConfirmed(newUser.password, pass2)) {
			this.addNewUser(db, newUser);
		}
	}

	init() {
		this.form.addEventListener('submit', e => {
			e.preventDefault();
			this.DB.request(this.checkForm);
		});
	}
}