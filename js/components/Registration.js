import Common from "./Common.js";

export default class Registration extends Common {
	constructor() {
		super();
		this.initDOM();
	}

	initDOM() {
		this.form = document.querySelector('#registration');
		this.inpLogin = document.querySelector('#newLogin');
		this.inpPass = document.querySelector('#newPass');
		this.inpConfirmPass = document.querySelector('#newPassConfirm');
		this.chbx = document.querySelector('#signUpdates');
	}

	checkPass(pass1, pass2) {
		return (pass1 === pass2) ? true : false;
	}

	getValues() {
		let pass2 = this.inpConfirmPass.value;
		let newUser = {
			login : this.inpLogin.value.toLowerCase(),
			password : this.inpPass.value,
			busket : [],
			isSignUpdates : this.chbx.checked
		}
		return {pass2, newUser};
	}

	async checkForm() {
		let { pass2, newUser } = this.getValues();
		let isLogin = await this.checkLogin(newUser.login);
		let isPassConfirm = this.checkPass(newUser.password, pass2);

		if (isLogin) {
			this.showPopUp('such login has already exist');
		}
		if (!isPassConfirm) {
			this.showPopUp('password is not confirm');
		}
		if (!isLogin && isPassConfirm) {
			await this.set('users', newUser);
			localStorage.setItem('current', newUser.login);
			this.showPopUp('you have created an account');
			this.redirect('./home.html');
			this.clearInputs([ this.inpLogin, this.inpConfirmPass, this.inpPass ]);
		}
	}

	init() {
		this.form.addEventListener('submit', e => {
			e.preventDefault();
			this.checkForm();
		});
	}
}