import DB from "./components/DB.js";
import ProdCardImgSwitcher from "./components/ProdCardImgSwitcher.js";
import Users from "./components/Users.js";
document.querySelector('.loader').style.display = 'none';
let db = new DB;
db.open();
let prodCardImgSwitcher = new ProdCardImgSwitcher({
	miniImgWrap : '.product-card__mini-imgs',
	prodCard : '.product-card',
});
prodCardImgSwitcher.init();

let users = new Users;
console.log(users);