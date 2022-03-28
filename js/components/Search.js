import Common from "./Common.js";

export default class Search extends Common {
	constructor() {
		super();
	}

	inpHandler = (ev) => {
		let inpVal = ev.currentTarget.value.toLowerCase().trim();
		this.names.forEach(name => {
			let strName = name.firstChild.textContent.toLocaleLowerCase().trim();
			if (!strName.startsWith(inpVal)) {
				name.closest('.product-card').style.display = 'none';
				return;
			};
			name.closest('.product-card').style.display = '';
		});
	}

	initDOM() {
		this.names = document.querySelectorAll('.product-card__prod-name');
		this.searchInp = document.querySelector('.search__inp');
	}

	init() {
		this.initDOM();
		this.searchInp.addEventListener('input', this.inpHandler);
	}
}