import Common from './Common.js';

export default class Busket extends Common {
	constructor() {
		super();
	}

	async initDOM() {
		this.cartList = document.querySelector('.cart-list');
		this.cartInfo = document.querySelector('.cart__info');
	}

	totalPrice(busket) {
		return busket.reduce((acc, item) => {
			return acc + (+((item.price / 100) * (100 - item.discount)).toFixed() * item.amount);
		}, 0);
	}

	async itemsSum(ev) {
		let current = ev.target;
		if (current.closest('#itemsCounter')) {
			let totalElem = document.querySelector('.cart-list__total');
			let code = current.closest('.cart-list__item').dataset.code;
			let user = await this.get('users', this.getCurrent());
			let product = user.busket.find(item => item.productCode === +code);
			product.amount = +current.value;
			await this.set('users', user);
			totalElem.textContent = `Total: ${this.totalPrice(user.busket)}`;
		}
		else return;
	}

	displayBusket = async () => {
		let user = await this.get('users', this.getCurrent());
		if (user && user.busket.length) {
			let cartListTop = this.itemsInBusketTemple(user.busket);
			this.cartList.innerHTML = cartListTop;
		}
		this.showItemsInBusket();
	}

	async showItemsInBusket() {
		
		let user = await this.get('users', this.getCurrent()) || false;
		if (user) {
			if (!user.busket.length) {
				this.cartInfo.textContent = 'EMPTY';
				this.cartList.textContent = 'EMPTY';
			} 
			else {
			 this.cartInfo.textContent = user.busket.length;
			}
		}
	 }

	itemsInBusketTemple(dataArr) {
		let items = dataArr.map(item => {
			return `
				<li class="cart-list__item" data-code="${item.productCode}">
					<div class="cart-list__img">
						<img src="${item.img}" alt="product image">
					</div>
					<h3 class="cart-list__title">
						${item.type}
					</h3>
					<label class="cart-list__lbl" for="itemsCounter">
						<input class="cart-list__inp-counter" type="number" name="itemCount" id="itemsCounter" min="1" value="${item.amount}">
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

	async getCurrProduct(currBtn, className, storeName) {
		let prodCode = currBtn.closest(className).dataset.code;
		return await this.get(storeName, +prodCode);
	}

	clearBusket = async (ev) => {
		let clearItemsBtn = ev.target.closest('#clearItems');

		if (clearItemsBtn) {
			
			let user = await this.get('users', this.getCurrent());
			user.busket.length = 0;
			await this.set('users', user);
			this.showPopUp('busket has been cleared');
			this.displayBusket();
		}
	}

	addToBusket = async (ev) => {
		let currBtn = ev.target;
		if (currBtn.closest('#addToBusket')) {
			
			let user = await this.get('users', this.getCurrent());
			let product = await this.getCurrProduct(currBtn, '.product-card', 'products');
			let bool = user.busket.find(item => item.productCode === product.productCode);
			if (bool) {
				this.showPopUp('this item has already added');
				return;
			}
			else {
				user.busket.push(product);
				await this.set('users', user);
				this.showPopUp(' item added ');
				this.displayBusket();
			}
		}
	}

	clearItem = async (ev) => {
		let delBtn = ev.target;
		if (delBtn.closest('#deleteItem')) {
			let user = await this.get('users', this.getCurrent());
			let code = delBtn.closest('.cart-list__item').dataset.code;
			let delIndex = user.busket.findIndex(item => item.productCode !== code);
			user.busket.splice(delIndex, 1);
			await this.set('users', user);
			this.showPopUp(' item deleted ');
			this.displayBusket();
		}
		else return;
	}

	async init() {
		await this.initDOM();
		this.displayBusket();
		document.addEventListener('click', ev => {
			this.addToBusket(ev);
			this.clearItem(ev);
			this.clearBusket(ev);
			this.itemsSum(ev);
		});
	}
}