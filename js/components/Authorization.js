import DB from "./DB.js";
export default class Authorization {
	constructor() {
		this.DB = new DB;
		this.initDOM();
	}

	initDOM() {
		this.form = document.querySelector('#authorization');
		this.inpLogin = document.querySelector('#login');
		this.inpPassword = document.querySelector('#pass');
	}

	checkUser = async (db) => {
		let inpLog = this.inpLogin.value;
		let inpPass = this.inpPassword.value;
		let {login, password} = await this.DB.getData(db, inpLog, 'users') || { undefined, undefined};
		if (inpLog === login && inpPass === password) {
			localStorage.setItem('current', login);
			this.DB.redirect('./home.html');
		} else {
			this.DB.showPopUp('incorrect login or password');
		}
	}

	init() {
		this.form.addEventListener('submit', ev => {
			ev.preventDefault();
			this.DB.request(this.checkUser);
		});
	}
}