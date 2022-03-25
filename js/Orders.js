import Common from "./components/Common.js";

class Orders extends Common {

	constructor() {
		super();
	}

	templeOrders(parent, children) {
		parent.innerHTML = children.map(child => {
			return `
				<tr data-id="${child.id}">
					<td>
						<div class="table-txt">
							${child.name}
						</div>
					</td>
					<td>
						<div class="table-txt">
							${child.telNumber}
						</div>
					</td>
					<td>
						<button class="table-btn table-btn_blue" id="showOrdersBtn" type="button">
							show
						</button>
					</td>
					<td>
						<button class="table-btn ${(child.isDone) ? 'table-btn_green' : 'table-btn_red'}" id="execOrdersBtn" type="button" ${(child.isDone) ? 'disabled="true"' : ''}>
							execute
						</button>
					</td>
				</tr>
			`;
		}).join('');
	}

	async displayOrders() {
		let tbody = document.querySelector('.tbody');
		let orders = await this.getAll('orders');
		this.templeOrders(tbody, orders);
	}

	displayOrderedProd(parent, children) {
		parent.innerHTML = children.map(child => {
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
							${child.price}
						</div>
					</td>
					<td>
						<div class="table-txt">
							${child.productCode}
						</div>
					</td>
					<td>
						<div class="table-txt">
							${child.amount}
						</div>
					</td>
					
					<td>
						<div class="table-txt">
							${child.discount}
						</div>
					</td>
				</tr>
			`;
		}).join('');
	}

	async showBtnHandler(ev) {
		let showBtn = ev.target.closest('#showOrdersBtn');
		if (showBtn) {
			let ShowTbody = document.querySelector('.change-wrap .tbody');
			let id = +ev.target.closest('tr').dataset.id;
			let order = await this.get('orders', id);
			this.visibilityChangeWrap(true);
			this.displayOrderedProd(ShowTbody, order.orders);
		}
		else return;
	}

	closeShowOrders(ev) {
		let closeBtn = ev.target.closest('#closeShowBtn');

		if (closeBtn) {
			this.visibilityChangeWrap(false);
		}
		else return;
	}

	executeBtnHandler = async (ev) => {
		let execBtn = ev.target.closest('#execOrdersBtn');
		if (execBtn) {
			let id = +ev.target.closest('tr').dataset.id;
			let order = await this.get('orders', id);
			order.isDone = true;
			await this.set('orders', order);
			this.displayOrders();
			this.showPopUp('order has succesfully doned');
		}

		else return;
	}

	init() {
		this.displayOrders();
		this.hideLoader();

		document.addEventListener('click', ev => {
			this.showBtnHandler(ev);
			this.closeShowOrders(ev);
			this.executeBtnHandler(ev);
		});
	}

}

let orders = new Orders;

orders.init();