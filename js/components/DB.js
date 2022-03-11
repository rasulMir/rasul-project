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
			this.addDataToStore(result, 'users', users);
			this.addDataToStore(result, 'products', products);
		});

		this.db.addEventListener('upgradeneeded', ev => {
			let db = ev.target.result;
			this.addUsersStore(db);
			this.addProductsStore(db);
		});
	}

	addDataToStore(db, storeName, data) {
		let transaction = db.transaction(storeName, "readwrite");
		let store = transaction.objectStore(storeName);
		data.forEach(item => {
			store.add(item);
		});
	}

	addUsersStore(db) {
		if (!db.objectStoreNames.contains('users')) {
			let users = db.createObjectStore("users", {keyPath: 'login'});
			users.createIndex('currentUser', 'current');
		} else return;
	}

	addProductsStore(db) {
		if (!db.objectStoreNames.contains('products')) {
			let products = db.createObjectStore("products", {keyPath: 'productCode'});
		} else return;
	}

	request() {
		this.db = indexedDB.open('avalon-store', 1);
		return Promise((rej, err) => {
			this.db.addEventListener('error', err => {
				console.log('ERROR', err);
			});
	
			this.db.addEventListener('upgradeneeded', ev => {
				console.log('UPGRADENEEDED', ev);
			});
	
			this.db.addEventListener('succes', ev => {
				return ev.target.result;
			});
		});
	}
}
