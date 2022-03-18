import ProductsRender from "./ProductsRender.js";

export default class Cards extends ProductsRender {
	constructor() {
		super();
	}

	initDOM() {
		this.miniImg = document.querySelectorAll('#miniImg');
	}

	imgHandler(ev) {
		let prodCard = ev.target.closest('.product-card');
		prodCard.firstElementChild.src = ev.target.src;
	}

	switchImgToMainImg() {
		this.miniImg.forEach(img => img.addEventListener('click', this.imgHandler));
	}

	async init() {
		await this.displayProducts();
		this.initDOM();
		this.switchImgToMainImg();
	}
}