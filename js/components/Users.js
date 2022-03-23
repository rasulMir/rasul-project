import Registration from './Registration.js';

export default class Users extends Registration {
	constructor () {
		super();
	}

	usersTempl(parent, children){
		return parent.innerHTML = children.map(child => {
			return `
				<tr data-log="${child.login}">
					<td>
						<div class="table-img">
							<img src="./images/user.png" alt="user image">
						</div>
					</td>
					<td>
						<div class="table-txt">
							${child.login}
						</div>
					</td>
					<td>
						<div class="table-txt">
							${child.password}
						</div>
					</td>
					<td>
						<button class="table-btn table-btn_blue" type="button">
							change
						</button>
					</td>
					<td>
						<button class="table-btn table-btn_red" id="delUser" type="button">
							delete
						</button>
					</td>
				</tr>
			`
		}).join('');
	}

	async showUsers() {
		let tBody = document.querySelector('.tbody');
		let users = await this.getAll('users');
		this.usersTempl(tBody, users);
	}

	async addUser() {
		let { pass2, newUser } = this.getValues();
		let isLogin = await this.checkLogin(newUser.login);
		let isPassConfirm = this.checkPass(newUser.password, pass2);

		if (isLogin) {
			this.showPopUp('such login has already exist');
		}
		if (!isPassConfirm) {
			this.showPopUp('password is not confirm');
		}
		if (!isLogin && isPassConfirm) {
			await this.set('users', newUser);
			this.showPopUp('you have created an account');
			this.clearInputs([ this.inpLogin, this.inpConfirmPass, this.inpPass ]);
			this.showUsers();
		}
	}

	async deleteUser(ev) {
		let delBtn = ev.target.closest('#delUser');
		if (delBtn) {
			let userLog = ev.target.closest('tr').dataset.log;
			await this.delete('users', userLog);
			this.showPopUp('user deleted');
			this.showUsers();
		}

		else return;
	}

	async ChangeUser(ev) {
		
	}

	init() {
		this.showUsers();

		this.form.addEventListener('submit', ev => {
			ev.preventDefault();
			this.addUser();
		});

		document.addEventListener('click', ev => {
			this.deleteUser(ev);
		});
	}
}