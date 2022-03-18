import Common from "./Common.js";

export default class Authorization extends Common {
	constructor() {
		super();
		this.initDOM();
	}

	initDOM() {
		this.form = document.querySelector('#authorization');
		this.inpLogin = document.querySelector('#login');
		this.inpPassword = document.querySelector('#pass');
	}

	async checkUser() {
		let inpLog = this.inpLogin.value;
		let inpPass = this.inpPassword.value;
		let user = await this.get('users', inpLog);

		if (user) {
			if (user.password === inpPass) {
				localStorage.setItem('current', inpLog);
				this.redirect('./home.html');
			} 
			else this.showPopUp('incorrect paswword');
		} 
		else this.showPopUp('incorrect login');

		this.clearInputs([this.inpLogin, this.inpPassword]);
	}

	init() {
		this.form.addEventListener('submit', ev => {
			ev.preventDefault();
			this.checkUser();
		});
	}
}