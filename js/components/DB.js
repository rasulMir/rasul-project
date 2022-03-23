import { users, products, orders, busket } from "./data.js";

export default class DB {
	constructor() {}

	open() {
		if (!('indexedDB' in window)) return false;

		
		const dbOpen = indexedDB.open('avalon-store', 1);

		dbOpen.onsuccess = (ev) => {
			let result = ev.target.result;
			if (!localStorage.getItem('db')) {
				this.putData(result, 'users', users);
				this.putData(result, 'products', products);
				this.putData(result, 'orders', orders);
				localStorage.setItem('db', 'true');
			}
			else return;
		};

		dbOpen.onerror = err => {
			console.log(`IndexedDB error: ${ err.target.errorCode }`);
		};

		dbOpen.onupgradeneeded = ev => {
			let result = ev.target.result;
			this.createStore(result, 'users', 'login');
			this.createStore(result, 'products', 'productCode');
			this.createStore(result, 'orders', 'id');
		}
	}

	putData = (db, storeName, dataArr) => {
		const transaction = db.transaction(storeName, "readwrite");
		const store = transaction.objectStore(storeName);
		
		dataArr.forEach(data => {
			const request = store.put(data);
			request.onsuccess = (ev) => console.log('all data have been added. line=1');
			request.onerror = (err) => console.log('error', err.target.result);
		});
	}

	createStore(db, storeName, keyP) {
		if (!db.objectStoreNames.contains(storeName)) {
			let users = db.createObjectStore(storeName, {keyPath: keyP});
		} else return;
	}
}

let db = new DB;
db.open();