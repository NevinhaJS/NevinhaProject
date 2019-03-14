"use strict";

let mongoose = require('mongoose');
let CustomerHookClass = require('./hook');
let Hook = require('../../utils/hook');

class CustomerModel {
	constructor(){
		this.CustomerScheme = mongoose.Schema({
			login: {type: String, required: true},
			name: {type: String, required: true },
			password: {type: String, required: true }
		});
	}
	
	createCustomerModel(){
		let instance = this,
			CustomerHook = new CustomerHookClass(),
			Customer = mongoose.model('Customer', instance.CustomerScheme);
		
		Customer.find({}, (err, result) => {
			if(!result.length) Hook.createHook(Customer, CustomerHook.getData);
		});
		
		return Customer;
	}
}

module.exports = app => {
	let Customer = new CustomerModel();
	
	return Customer.createCustomerModel();
};