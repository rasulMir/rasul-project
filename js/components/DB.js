import {users, products} from "./data.js";
export default class DB {
	constructor() {
		if (!!DB.instance) {
			return DB.instance;
		}
		DB.instance = this;
		return this;
	}

	open() {
		this.db = indexedDB.open('avalon-store', 1);

		this.db.addEventListener('error', err => {
			console.log('ERROR', err);
		});

		this.db.addEventListener('success', ev => {
			let result = ev.target.result;
			this.addDataToStoreOnce(result, 'products', products);
			this.addDataToStoreOnce(result, 'users', users);
		});

		this.db.addEventListener('upgradeneeded', ev => {
			let db = ev.target.result;
			this.addStore(db, 'users', 'login');
			this.addStore(db, 'products', 'productCode');
			this.addStore(db, 'busket', 'productCode');
		});
	}

	addStore(db, storeName, keyP) {
		if (!db.objectStoreNames.contains(storeName)) {
			let users = db.createObjectStore(storeName, {keyPath: keyP});
		} else return;
	}

	addDataToStore(db, storeName, data) {
		let transaction = db.transaction(storeName, "readwrite");
		let store = transaction.objectStore(storeName);
		data.forEach(item => {
			store.put(item);
		});
	}

	addDataToStoreOnce(db, storeName, data) {
		let transaction = db.transaction(storeName, "readwrite");
		let store = transaction.objectStore(storeName);
		data.forEach(item => {
			store.add(item);
		});
	}

	clearBusket() {
		let db = indexedDB.open('avalon-store', 1);
		db.addEventListener('error', err => {
			console.log('ERROR', err);
		});

		db.addEventListener('upgradeneeded', ev => {
			let db = ev.target.result;
			db.deleteObjectStore('busket');
		});
		
		db.addEventListener('success', ev => {
			console.log('success')
		});
		
	}

	showPopUp(text) {
		let scrolledTopHeight = Math.max(
			document.body.scrollTop, document.documentElement.scrollTop,
		);
		let popUp = document.querySelector('.pop-up');
		popUp.textContent = text;
		popUp.classList.add('pop-up_show');
		let top = (+scrolledTopHeight + window.screen.height / 2) - popUp.clientHeight ;
		popUp.style.top = `${top}px`;
		let timeOut = setTimeout(() => popUp.classList.remove('pop-up_show'), 1000);
		setInterval(() => clearTimeout(timeOut), 1001)
	}

	getData = (db, key = '', storeName) => {
		let transaction = db.transaction(storeName, "readonly");
		let store = transaction.objectStore(storeName);
		let item = store.get(key);
		return new Promise( (res, rej) => {
			item.addEventListener('error', err => rej(err));
			item.addEventListener('success', (e) => res(e.target.result));
		});
	}

	async request(cb) {
		this.db = indexedDB.open('avalon-store', 1);
		this.db.addEventListener('error', err => {
			console.log('ERROR', err);
		});

		this.db.addEventListener('upgradeneeded', ev => {
			console.log('UPGRADENEEDED', ev);
		});
		
		this.db.addEventListener('success', ev => {
			cb(ev.target.result);
		});
	}

	redirect = (url) => {
		setTimeout( () => window.location.href = url, 0);
	}
}
