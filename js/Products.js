import Common from "./components/Common.js";

class Products extends Common {

	constructor() {
		super();
		this.form = document.querySelector('.form');
		this.inpType = document.querySelector('#inpType');
		this.inpPrice = document.querySelector('#inpPrice');
		this.inpDiscount = document.querySelector('#inpDiscount');
		this.inpDescr = document.querySelector('#inpDescr');
		this.inpImg = document.querySelector('#inpImg');
	}

	async getInpValues() {
		let products = await this.getAll('products');
		let code = this.counter(products.length);
		if ( this.inpType 
				 && this.inpPrice 
				 && this.inpDiscount 
				 && this.inpDescr
				 && this.inpImg ) {
			return {
				productCode : code('+'),
				price : +this.inpPrice.value.trim(),
				discount : +this.inpDiscount.value.trim(),
				description : this.inpDescr.value.trim(),
				type : this.inpType.value.trim(),
				img : this.inpImg.value.trim(),
				amount: 1,
			};
		}

		else {
			return false;
		}
	}

	async displayProducts() {
		let tBody = document.querySelector('.tbody');
		let products = await this.getAll('products');
		this.templeProduct(tBody, products);
	}

	templeProduct(parent, children) {
		return parent.innerHTML = children.map(child => {
			return ` 
				<tr data-code="${child.productCode}">
					<td>
						<div class="table-img">
							<img src="${child.img}" alt="product image">
						</div>
					</td>
					<td>
						<div class="table-txt">
							${child.type}
						</div>
					</td>
					<td>
						<div class="table-txt">
							${((child.price / 100) * (100 - child.discount)).toFixed(2)}
						</div>
					</td>
					<td>
						<div class="table-txt">
							${child.productCode}
						</div>
					</td>
					<td>
						<div class="table-txt">
						${child.discount}
						</div>
					</td>
					<td>
						<button class="table-btn table-btn_blue" id="changeBtn" type="button">
							change
						</button>
					</td>
					<td>
						<button class="table-btn table-btn_red" id="delUser" type="button">
							delete
						</button>
					</td>
				</tr>
			`;
		}).join('');
	}

	addProduct = async () => {
		let product = await this.getInpValues();

		if (!product) {
			this.showPopUp('fill the all inputs please');
			this.clearInputs([this.inpType, this.inpDescr, this.inpPrice, this.inpDiscount, this.inpImg]);
			return;
		}

		await this.set('products', product);
		this.showPopUp('new product have added');
		this.clearInputs([this.inpType, this.inpDescr, this.inpPrice, this.inpDiscount, this.inpImg]);
		this.displayProducts();
	}

	async getChangeInpVal() {
		this.changeInpType = document.querySelector('#changeInpType');
		this.changeInpPrice = document.querySelector('#changeInpPrice');
		this.changeInpDiscount = document.querySelector('#changeInpDiscount');
		this.changeInpDescr = document.querySelector('#changeInpDescr');
		this.changeInpImg = document.querySelector('#changeInpImg');
		let product = await this.get('products', +this.code);

		product.productCode = product.productCode;
		product.price = +this.changeInpPrice.value.trim() || product.price;
		product.discount = +this.changeInpDiscount.value.trim() || product.discount;
		product.description = this.changeInpDescr.value.trim() || product.description;
		product.type = this.changeInpType.value.trim() || product.type;
		product.img = this.changeInpImg.value.trim() || product.img;
		product.amount = 1;

		return product;
	}

	async saveChangeBtn(ev) {
		let changeBtn = ev.target.closest('#saveBtn');

		if (changeBtn) {
			let product = await this.getChangeInpVal();
			await this.set('products', product);
			this.showPopUp('all changes have received');
			this.clearInputs([this.changeInpType, this.changeInpDescr, this.changeInpPrice, this.changeInpDiscount, this.changeInpImg]);
			this.displayProducts();
			this.visibilityChangeWrap(false);
		}
		else return;
	}

	delProduct = async (ev) => {
		let delBtn = ev.target.closest('#delUser');

		if (delBtn) {
			let code = +ev.target.closest('tr').dataset.code;
			await this.delete('products', code);
			this.showPopUp('product deleted');
			this.displayProducts();
		} 

		else return;
	}

	closeHandler(ev) {
		let closeBtn = ev.target.closest('#closeBtn');
		if (closeBtn) {
			this.visibilityChangeWrap(false);
		} 
		else return;
	}

	async changeUserBtn(ev) {
		let changeBtn = ev.target.closest('#changeBtn');

		if (changeBtn) {
			this.visibilityChangeWrap(true);
			this.code = ev.target.closest('tr').dataset.code;
		}

		else return;
	}

	init() {
		this.displayProducts();
		this.hideLoader();
		this.form.addEventListener('submit', ev => {
			ev.preventDefault();
			this.addProduct();
		});

		document.addEventListener('click', ev => {
			this.delProduct(ev);
			this.closeHandler(ev);
			this.changeUserBtn(ev);
			this.saveChangeBtn(ev);
		});
	}

}

let products = new Products;
products.init();