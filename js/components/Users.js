import DB from "./DB.js";
export default class Users {
	constructor() {
		this.methods = new DB;
		this.init();
	}

	init() {
		// db.addDataToStore(this.db, 'users', [{login: 'kezo'}])
	}
}