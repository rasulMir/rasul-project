
export default class Common {


	constructor() {
		
	}

	counter(start) {
		let begin = start;
		return (str) => {
			if (str === '+') return ++begin;
			else return --begin;
		}
	}

	getDB() {
		return new Promise((res, rej) => {
			if (!('indexedDB' in window)) reject('not supported');

			const dbOpen = indexedDB.open('avalon-store', 1);
			dbOpen.onsuccess = (ev) => {
        res(ev.target.result);
      };

      dbOpen.onerror = err => {
        rej(`IndexedDB error: ${ err.target.errorCode }`);
      };
		});
	}

	async delete(storeName, key) {
		const db = await this.getDB();
		
		return new Promise(( res, rej ) => {
			const transaction = db.transaction(storeName, "readwrite");
			const store = transaction.objectStore(storeName);
			const item = store.delete(key);

			item.onsuccess = (ev) => res(ev.target.result);
			item.onerror = (err) => rej(true);
		});
	}

	async getAll(storeName) {
		const db = await this.getDB();
		
		return new Promise(( res, rej ) => {
			const transaction = db.transaction(storeName, "readonly");
			const store = transaction.objectStore(storeName);
			const item = store.getAll();

			item.onsuccess = (ev) => res(ev.target.result);
			item.onerror = (err) => rej(false);
		});
	}

	async get(storeName, key) {
		const db = await this.getDB();
		
		return new Promise(( res, rej ) => {
			const transaction = db.transaction(storeName, "readonly");
			const store = transaction.objectStore(storeName);
			const item = store.get(key);

			item.onsuccess = (ev) => res(ev.target.result);
			item.onerror = (err) => rej(false);
		});
	}

	getCurrent = () => localStorage.getItem('current');

	hideLoader() {
		document.querySelector('.loader').style.display = 'none';
	}

	async set(storeName, item) {
		const db = await this.getDB();

		return new Promise(( res, rej ) => {
			const transaction = db.transaction(storeName, "readwrite");
			const store = transaction.objectStore(storeName);
			const request = store.put(item);

			request.onsuccess = (ev) => res(true);
			request.onerror = (err) => rej(false);
		});
	}
	
	async checkLogin(login) {
		return await this.get('users', login);
	}

	showPopUp(text) {
		let scrolledTopHeight = Math.max(
			document.body.scrollTop, document.documentElement.scrollTop,
		);
		let popUp = document.querySelector('.pop-up');
		popUp.textContent = text;
		popUp.classList.add('pop-up_show');
		let top = (+scrolledTopHeight + window.screen.availHeight / 2) - popUp.clientHeight ;
		popUp.style.top = `${top - 150}px`;
		let timeOut = setTimeout(() => popUp.classList.remove('pop-up_show'), 1500);
		setInterval(() => clearTimeout(timeOut), 1501);
	}

	visibilityChangeWrap(bool) {
		let changeWrap = document.querySelector('.change-wrap');
		if (bool) {
			changeWrap.classList.remove('change-wrap_hidden');
		} else {
			changeWrap.classList.add('change-wrap_hidden');
		}
	}

	clearInputs(inps) {
		inps.forEach(inp => inp.value = '');
	}

	redirect = (url) => {
		setTimeout( () => window.location.href = url, 0);
	}
}

