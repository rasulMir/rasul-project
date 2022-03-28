import Common from './Common.js';
export default class Slider extends Common {

	constructor() {
		super();
	}

	prev = () => {
		this.sliderCont.style.left = `0px`;
	}

	next = () => {
		this.sliderCont.style.left = `-570px`;
	}

	initDOM() {
		this.sliderCont = document.querySelector('.slider-cont');
		this.prevBtn = document.querySelector('.slider__btns_prev');
		this.nextBtn = document.querySelector('.slider__btns_next');
	}

	init() {
		this.initDOM();
		this.prevBtn.addEventListener('click', this.prev);
		this.nextBtn.addEventListener('click', this.next);

	}

}