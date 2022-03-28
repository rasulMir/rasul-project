import Busket from "./components/Busket.js";
import Cards from './components/Cards.js';
import Common from "./components/Common.js";
import Order from './components/Order.js';
import Search from "./components/Search.js";
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
		let { admin } = await this.get('users', this.getCurrent()) || false;
		if (admin) {
			let usersAdd = document.querySelector('.users-add');
			usersAdd.innerHTML = '<a href="./admin.html" class="users-add__link">admin</a>'
		}
		else return;
	}

	async initClasses() {
		if (this.getCurrent()) {
			this.cards = new Cards;
			await this.cards.init();
	
			this.busket = new Busket;
			await this.busket.init();

			this.order = new Order;
			this.order.init();

			this.search = new Search;
			this.search.init();
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