class CustomerValidation {
	static checkCustomerData(req) {
		req.assert('login').notEmpty();
		req.assert('password').notEmpty();
		req.assert('name').notEmpty();
		
		return req.validationErrors(true);
	}
}

module.exports = CustomerValidation;

