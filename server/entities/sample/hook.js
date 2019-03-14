"use strict";

class CustomerHook {
	get getData(){
		let data = [{
			login: 'jenny',
			name: 'Jennycken',
			password: 'mimorimez'
		}];

		return data;
	}
}

module.exports = CustomerHook;
