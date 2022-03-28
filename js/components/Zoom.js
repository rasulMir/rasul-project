import Common from "./Common.js";

export default class Zoom extends Common {
	constructor() {
		super();
	}

	initDOM() {
		this.slider = document.querySelector('.slider');
		this.cSquare = document.querySelector('.cursor-square');
		this.imgResult = document.querySelector('.image-res');
	}

	moveHandler = (ev) => {
		let ox = ev.offsetX;
		let oy = ev.offsetY;
		this.cSquare.style.left = `${ ox - 50 }px`;
		this.cSquare.style.top = `${ oy - 50 }px`;
	}

	zoomHandler = (ev) => {
		let cursor = ev.currentTarget;
		let x = (cursor.offsetLeft / this.imgResult.offsetWidth) * 100;
		let y = (cursor.offsetTop / this.imgResult.offsetHeight) * 100;
		this.imgResult.style.backgroundPosition = `${x}% ${y}%`;
	}

	init() {
		this.initDOM();

		this.slider.addEventListener('mousemove', ev => {
			ev.preventDefault();
			this.moveHandler(ev);
		});

		this.cSquare.addEventListener('mousemove', ev => {
			ev.preventDefault();
			this.zoomHandler(ev);
		});

		this.slider.addEventListener('mouseenter', ev => {
			this.cSquare.style.opacity = '1';
			this.imgResult.style.opacity = '1';
		});
		
		this.slider.addEventListener('mouseleave', ev => {
			this.cSquare.style.opacity = '0';
			this.imgResult.style.opacity = '0';
		});
	}
}