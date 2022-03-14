import Busket from "./components/Busket.js";
import DB from "./components/DB.js";
import ProdCardImgSwitcher from "./components/ProdCardImgSwitcher.js";
import ProductRender from "./components/ProductsRender.js";

document.querySelector('.loader').style.display = 'none';

let db = new DB;
db.open();

let productRender = new ProductRender;
productRender.init();

let prodCardImgSwitcher = new ProdCardImgSwitcher({
	miniImgWrap : '.product-card__mini-imgs',
	prodCard : '.product-card',
});
prodCardImgSwitcher.init();

let busket = new Busket;
busket.init();