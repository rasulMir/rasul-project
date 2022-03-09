export default class ProdCardImgSwitcher {
	constructor({ miniImgWrap, prodCard}) {
		this.miniImgWrap = document.querySelectorAll(miniImgWrap);
		this.prodCard = document.querySelector(prodCard);
	}

	switchImgToMainImg(event) {
		let prodCard = event.target.closest('.product-card');
		prodCard.firstElementChild.src = event.target.src;
	}

	init() {
		this.miniImgWrap.forEach(wrap => {
			wrap.children[0].addEventListener('click', this.switchImgToMainImg);
			wrap.children[1].addEventListener('click', this.switchImgToMainImg);
		});
	}
}