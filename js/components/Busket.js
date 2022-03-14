import DB from './DB.js';

export default class Busket {

	constructor() {
		this.DB = new DB;
		this.cartInfo = document.querySelector('.cart__info');
		this.cartList = document.querySelector('.cart-list');
	}

	displayBusket() {

		this.DB.request(async (db) => {
			let transaction = db.transaction('busket', "readonly");
			let store = transaction.objectStore('busket');
			let item = store.getAll();

			item.addEventListener('error', err => console.log(err.target));

			item.addEventListener('success', ev => {
				let busket = ev.target.result;

				if (busket.length) {
					let cartListTop = this.itemsInBusketTemple(busket);
					this.cartInfo.textContent = busket.length;
					let total = busket.reduce((acc, item) => {
						return acc + +((item.price / 100) * (100 - item.discount)).toFixed();
					}, 0);

					let cartListBttm = this.cartListBttm(total);
					this.cartList.insertAdjacentHTML('beforeend', cartListTop);
					this.cartList.insertAdjacentHTML('beforeend', cartListBttm);
				} else {
					this.cartList.textContent = 'EMPTY';
				}
			});
		});

	}

	itemsInBusketTemple(dataArr) {
		let cartListTop = document.createElement('div');
		cartListTop.classList.add('cart-list__top');
		return cartListTop.innerHTMl = dataArr.map(item => {
			return `
				<li class="cart-list__item">
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
			`}).join('');
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

	addToBusket(db, item, clickedElem) {
		let transaction = db.transaction('busket', "readwrite");
		let store = transaction.objectStore('busket');
		let request = store.add(item);
		request.addEventListener('error', ev => {
			this.DB.showPopUp('this item has already been added');
		});
		request.addEventListener('success', ev => {
			this.displayBusket();
			clickedElem.closest('#addToBusket').disabled = true;
		});
	}

	init() {
		this.displayBusket();
		document.addEventListener('click', e => {
			let clickedElem = e.target;
			
			if (clickedElem.closest('#addToBusket')) {
				let prodCode = +clickedElem.closest('.product-card').dataset.code;
				this.DB.request( async (db) => {
					let currProduct = await this.DB.getData(db, prodCode, 'products');
					this.addToBusket(db, currProduct, clickedElem);
				});
			}
			else {
				return;
			}
		});
	}
}