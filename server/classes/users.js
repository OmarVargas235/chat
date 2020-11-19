class User {

	constructor() {

		this.users = [];
	}

	get getUsers() {

		return this.users;
	}

	saveUser(data) {

		this.users.push(data);
	}

	getUserId(id) {
		
		const user = this.users.find(el => el.id === id);
		
		return user; 
	}

	deleteUser(id) {
		
		const users = this.users.filter(el => el.id !== id);

		this.users = users;
	}
}

module.exports = {
	User,
}