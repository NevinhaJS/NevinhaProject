"use strict";

function CustomerRouter(app){
	let customerController = app.entities.customers.controller;
	
	app.get('/customers', customerController.getCustomer.bind(customerController));
	app.get('/customers/:id', customerController.getCustomer.bind(customerController));
	app.put('/customers/:id', customerController.changeCustomer.bind(customerController))
	app.post('/customers/', customerController.changeCustomer.bind(customerController))
}

module.exports = CustomerRouter;