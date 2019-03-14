"use strict";

let mongoose = require('mongoose');
let UtilsErrors = require('../../utils/error-treatments');
let CustomerValidations = require('./validations');

class CustomerController {
	constructor(app){
		this.app = app;
	}
	
	getCustomer(req, res){
		let instance = this,
			CustomerModel = mongoose.model('Customer'),
			customerId = req.params.id;
		
		if(customerId){
			CustomerModel.findOne({ _id: customerId})
				.then(data => res.status(200).json(data))
				.catch(err => UtilsErrors.throwError(res, err));
		}else {
			CustomerModel.find({})
				.then(data => res.status(200).json(data))
				.catch(err => UtilsErrors.throwError(res, err));
		}
	}
	
	changeCustomer(req, res){
		let instance = this,
			customerId = req.params.id,
			validationError = CustomerValidations.checkCustomerData(req);
		
		if(validationError){
			return UtilsErrors.throwError(res, 'Campos inválidos no controller de usuários.');
		}else if(customerId){
			return instance.updateCustomer(customerId, req, res);
		}else {
			return instance.addCustomer(req, res);
		}
	}
	
	addCustomer(req, res){
		let instance = this,
			CustomerModel = mongoose.model('Customer'),
			data = instance.formatCustomerData(req);
		
		CustomerModel.create(data)
			.then(resp => instance.addCustomerInDropboxFolder(resp, req, res))
			.catch(err => UtilsErrors.throwError(res, err));
	}
	
	
	addCustomerInDropboxFolder(data, req, res){
		let	DropboxModel = mongoose.model('Dropbox'),
			folderId = req.body.folder_id,
			query = {'folders.id': folderId},
			customerId = data._id;
		
		if(!folderId){
			return UtilsErrors.throwError(res, 'Não foi informado um folder_id válido.');
		}
		
		DropboxModel.update(query, { '$push': {'folders.$.customers': customerId}}, {}, (err) => {
			if (err) return UtilsErrors.throwError(res, err);
			res.status(200).json({status: 'success', data: data});
		});
	}
	
	updateCustomer(customerId, req, res){
		let instance = this,
			CustomerModel = mongoose.model('Customer'),
			data = instance.formatCustomerData(req);
		
		CustomerModel.findByIdAndUpdate(customerId, { $set: data}, {}, (err, previousData)=>{
			if (err) return UtilsErrors.throwError(res, err);
			res.status(200).json({previousData: previousData});
		});
	}
	
	formatCustomerData(req){
		let data = {
			login: req.body.login,
			password: req.body.password,
			name: req.body.name
		}
		
		return data;
	}
}

module.exports = app => new CustomerController(app);