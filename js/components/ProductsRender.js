import DB from "./DB.js";

export default class ProductRender {
	constructor() {
		this.DB = new DB;
		this.cardsOnColumn = 3;
		this.initDOM();
	}

	prodCardTemple({ productCode, img, price, discount , type, description}) {
		return `
			<div class="product-card" data-code="${productCode}">
				<img class="product-card__main-image" src="${img}" alt="main product image">
				<div class="product-card__top">
					<div class="product-card__price-wrap">
						<span class="product-price">
							<span class="product-price__price product-price__price_before">
								${(discount > 0) ? price : ''}
							</span>
							<span class="product-price__price">
								${((price / 100) * (100 - discount)).toFixed(2)}
							</span>
						</span>
					</div>
					<div class="product-card__mini-imgs">
						<img src="${img}" alt="product image">
						<img src="${img}" alt="product image">
					</div>
				</div>
				<div class="product-card__bttm">
					<div class="product-card__prod-name">
						${type}
						<span class="product-price">
							<span class="product-price__price product-price__price_before">
								${(discount > 0) ? price : ''}
							</span>
							<span class="product-price__price">
								${((price / 100) * (100 - discount)).toFixed(2)}
							</span>
						</span>
					</div>
					<div class="product-card__description">
						${description}
					</div>
					<div class="product-card-btns">
						<button class="product-card-btns__btn" id="addToBusket" type="button">
							<i class="product-card-btns__icon fa fa-shopping-cart"></i>
						</button>
						<button class="product-card-btns__btn" id="putLike" type="button">
							<i class="product-card-btns__icon fa fa-heart"></i>
						</button>
						<button class="product-card-btns__btn" id="theZoom" type="button">
							<i class="product-card-btns__icon fa fa-compress"></i>
						</button>
					</div>
				</div>
			</div>
		`;
	}

	initDOM() {
		this.prodContent = document.querySelector('.products-content');
	}

	getAllProducts = (db) => {
		let transaction = db.transaction('products', "readonly");
		let store = transaction.objectStore('products');
		let item = store.getAll();
		return new Promise( (res, rej) => {
			item.addEventListener('error', err => rej(err));
			item.addEventListener('success', (e) => res(e.target.result));
		});
	}

	disableAddedItems() {
		let cards = document.querySelectorAll('.product-card');
		let btns = document.querySelectorAll('#addToBusket');
		this.DB.request(async (db) => {
			let transaction = db.transaction('busket', "readonly");
			let store = transaction.objectStore('busket');
			let item = store.getAll();

			item.addEventListener('error', err => console.log(err));
			item.addEventListener('success', ev => {
				let busket = ev.target.result;
				busket.forEach(item => {

					cards.forEach(card => {
						let prodCode = +card.dataset.code;

						if ( prodCode === item.productCode) {
							btns[prodCode - 1].disabled = true;
						} else return;

					});

				});

			});

		});
	}

	displayProducts = async (db) => {
		let products = await this.getAllProducts(db);
		let cards = products.map(product => this.prodCardTemple(product));
		let colWrapEnd = Math.ceil(cards.length / this.cardsOnColumn);
		for (let i = 0; i < colWrapEnd; i++) {
			let colWrap = document.createElement('div');
			colWrap.classList.add('products-content__col');
			colWrap.innerHTML = cards.splice(0, this.cardsOnColumn).join('');
			this.prodContent.insertAdjacentElement('beforeend', colWrap);
		}
		
		this.disableAddedItems();
	}
	
	init () {
		this.DB.request(this.displayProducts);
	}
}