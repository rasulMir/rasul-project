import Common from "./Common.js";

export default class ProductsRender extends Common{
	constructor() {
		super();
		this.cardsOnColumn = 3;
	}

	prodCardTemple({ productCode, img, price, discount , type, description}) {
		return `
			<div class="product-card " data-code="${productCode}">
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
						<img src="${img}" alt="product image" id="miniImg">
						<img src="${img}" alt="product image" id="miniImg">
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
	
	async getMappedCards() {
		let products = await this.getAll('products');
		return products.map(product => this.prodCardTemple(product));
	}

	async displayProducts() {
		this.prodContent = document.querySelector('.products-content');
		let cards = await this.getMappedCards();
		let colWrapEnd = Math.ceil(cards.length / this.cardsOnColumn);
		for (let i = 0; i < colWrapEnd; i++) {
			let colWrap = document.createElement('div');
			colWrap.classList.add('products-content__col');
			colWrap.innerHTML = cards.splice(0, this.cardsOnColumn).join('');
			this.prodContent.insertAdjacentElement('beforeend', colWrap);
		}
	}
}