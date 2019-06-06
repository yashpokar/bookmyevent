export default class Auth {
	static token () {
		return localStorage.getItem('token');
	}

	static isLoggedIn () {
		return Auth.token();
	}
}
