import Common from './Common.js';

export default class Busket extends Common {

	constructor() {
		super();
	}

	async initDOM() {
		this.user = await this.get('users', this.getCurrent());
		this.cartInfo = document.querySelector('.cart__info');
		this.cartList = document.querySelector('.cart-list');
	}

	totalPrice(busket) {
		return busket.reduce((acc, item) => {
			return acc + +((item.price / 100) * (100 - item.discount)).toFixed();
		}, 0);
	}

	displayBusket = async () => {

		if (this.user) {
			if (this.user.busket.length) {
				let cartListTop = this.itemsInBusketTemple(this.user.busket);
				this.cartList.innerHTML = cartListTop;
			}
		}
		
		this.showItemsInBusket();
	}

	itemsInBusketTemple(dataArr) {
		let items = dataArr.map(item => {
			return `
				<li class="cart-list__item" data-key="${item.productCode}">
					<div class="cart-list__img">
						<img src="${item.img}" alt="product image">
					</div>
					<h3 class="cart-list__title">
						${item.type}
					</h3>
					<label class="cart-list__lbl" for="itemsCounter">
						<input class="cart-list__inp-counter" type="number" name="itemCount" id="itemsCounter" min="1" value="1">
					</label>
					<button class="cart-list__btn" type="button" id="deleteItem">delete</button>
				</li>
			`;
		}).join('');
		return `<ul class="cart-list__top">${ items }</ul> 
						${this.cartListBttm(this.totalPrice(dataArr))}`;
	}

	cartListBttm(total) {
		return `
			<div class="cart-list__bttm">

				<div class="cart-list__total">total: ${total}</div>
				<button class="cart-list__btn" type="button" id="clearItems">clear cart</button>
				<button class="cart-list__btn" type="button" id="buyItems">buy items</button>

			</div>
		`;
	}

	async getCurrProduct(currBtn) {
		let prodCode = currBtn.closest('.product-card').dataset.code;
		return await this.get('products', +prodCode);
	}

	clearBusket = async (ev) => {
		let clearItemsBtn = ev.target.closest('#clearItems');

		if (clearItemsBtn) {
			let busket = await this.getAll('busket');
			busket.forEach(async item => await this.delete('busket', item.productCode));
			this.user.busket = [];
			await this.set('users', this.user);
			this.showPopUp('busket has been cleared');
			this.displayBusket();
		}
	}

	addToBusket = async (ev) => {
		let currBtn = ev.target;
		if (currBtn.closest('#addToBusket')) {
			let product = await this.getCurrProduct(currBtn);
			await this.set('busket', product);
			this.user.busket = await this.getAll('busket');
			let request = await this.set('users', this.user);
			if (request) {
				this.showPopUp(' item added ');
				this.displayBusket();
			}
			else return;
		}
	}

	clearItem = async (ev) => {
		let delBtn = ev.target;
		if (delBtn.closest('#deleteItem')) {
			let code = delBtn.closest('.cart-list__item').dataset.key;
			await this.delete('busket', +code);
			this.user.busket = await this.getAll('busket');
			let request = await this.set('users', this.user);
			if (request) {
				this.showPopUp(' item deleted ');
				this.displayBusket();
			}
			else return;
			
		}
		else return;
	}

	showItemsInBusket() {
		if (!this.user.busket.length) {
			this.cartInfo.textContent = 'EMPTY';
			this.cartList.textContent = 'EMPTY';
		} else {
			this.cartInfo.textContent = this.user.busket.length;
		}
	}

	async init() {
		await this.initDOM();
		this.displayBusket();
		document.addEventListener('click', ev => {
			this.addToBusket(ev);
			this.clearItem(ev);
			this.clearBusket(ev);
		});
	}
}