import Common from "./Common.js";

export default class Order extends Common {
	constructor() {
		super();
	}

	stylesForm() {
		this.order.style.display = 'none';
		this.order.style.height = `${window.screen.availHeight}px`;
	}

	initDOM() {
		// this.user = await this.get('users', this.getCurrent());
		this.order = document.querySelector('.order');
		this.buyItems = document.querySelector('#buyItems');
		this.form = document.querySelector('.order__form');
		this.cartList = document.querySelector('.cart-list');
	}

	showHideOrderForm = (ev) => {
		let current = ev.target;
		if(current.closest('#buyItems')) {
			this.order.style.display = 'flex';
		}
		else if (current.closest('#closeOrderBtn')) {
			this.order.style.display = 'none';
		}
		else return;
	}

	async packOrder() {
		let user = await this.get('users', this.getCurrent());
		if(!user.busket.length) {
			return false;
		}
		let orders = await this.getAll('orders');
		const userNumber = document.querySelector('#userNumber').value;
		const userName = document.querySelector('#userName').value;
		let id = this.counter(orders.length);
		return {
			id : id('+'),
			name : userName,
			telNumber : userNumber,
			oreders : user.busket,
		};
	}

	clearBusketDOM() {
		let cartList = document.querySelector('.cart-list');
		let cartInfo = document.querySelector('.cart__info');
		cartInfo.textContent = 'EMPTY';
		cartList.innerHTML = 'EMPTY';

	}

	submitHandler = async () => {
		let order = await this.packOrder();

		if (!order) {
			this.showPopUp('your busket is empty. Please add items to busket');
			this.order.style.display = 'none';
			return;
		}

		let user = await this.get('users', this.getCurrent());
		await this.set('orders', order);
		user.busket.splice(0, user.busket.length);
		await this.set('users', user);
		this.showPopUp('order successfully completed');
		this.order.style.display = 'none';
		this.clearBusketDOM();
	}

	init() {
		this.initDOM();
		this.stylesForm();
		document.addEventListener('click', this.showHideOrderForm);
		this.form.addEventListener('submit', ev => {
			ev.preventDefault();
			this.submitHandler();
		});
	}
}