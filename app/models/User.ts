import {StorageUtils} from '../utils/StorageUtils';

export class User {
	
	private username: string;
	private password: string;

	constructor(username:any, password:any, token:string) {
		this.username = username;
		this.password = password;
		StorageUtils.setToken(token)
	}

	public printCurrentUser():void {
		console.log(this.username);
	}

	logout() {
		StorageUtils.removeToken();
	}

}