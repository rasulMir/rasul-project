import ProdCardImgSwitcher from "./components/ProdCardImgSwitcher.js";
let prodCardImgSwitcher = new ProdCardImgSwitcher({
	miniImgWrap : '.product-card__mini-imgs',
	prodCard : '.product-card',
});
prodCardImgSwitcher.init();