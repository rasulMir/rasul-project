import Busket from "./components/Busket.js";
import Cards from './components/Cards.js';
import Common from "./components/Common.js";

class Home extends Common {
	constructor() {
		super();
	}

	throwToRegistration() {
		let popUp = document.querySelector('.pop-up-link');
		popUp.style.height = `${window.screen.availHeight}px`;
		if (!this.getCurrent()) {
			popUp.style.display = '';
			document.body.style.overflow = 'hidden';
		} else {
			popUp.style.display = 'none';
			document.body.style.overflow = '';
		}
	}

	async isAdmin() {
		let { admin } = await this.get('users', this.getCurrent());
		if (admin) {
			let usersAdd = document.querySelector('.users-add');
			let link = '<a href="./admin.html" class="users-add__link">admin</a>'
			usersAdd.insertAdjacentHTML('afterbegin', link);
		}
		else return;
	}

	async initClasses() {
		if (this.getCurrent()) {
			this.cards = new Cards;
			await this.cards.init();
	
			this.busket = new Busket;
			await this.busket.init();
		}
	}

	async initHome() {
		await this.initClasses();
		this.isAdmin();
		this.hideLoader();
		this.throwToRegistration();
	}
}

let home = new Home;
home.initHome();