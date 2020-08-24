//fetching all categories from database
exports.getCustomers = async (Customer) =>{
	try{
		let result = await Customer.find();
		return Promise.resolve(result);
	}catch(err){
		return Promise.reject(err);
	}
}
//get a coustomer
exports.getCustomer = async (Customer,email) =>{
	try{
		let result = await Customer.findOne({email});
		if (!result) throw ('invalid email id!.')
		return Promise.resolve(result);
	}catch(err){
		return Promise.reject(err);
	}
}
//creating new category in database
exports.createCustomer = async (Customer,data,encryptedPassword) => {
	let {userName,address,city,state,postalCode,country,email} = data;
	try{
		let newCustomer = new Customer({
			userName,
			password:encryptedPassword,
			address,
			city,
			state,
			postalCode,
			country,
			email
		})
		let result = await newCustomer.save();
		return Promise.resolve(result);
	}
	catch(err){
		return Promise.reject(err);
	}
}
//updating an existing category in database
exports.updateCustomer = async (Customer,id,data) =>{
	try {
		if(req.user._id!==id) throw 'You are not authorized!'
		let result = await Customer.findOneAndUpdate(
			{
				_id : id
			},
			data,
			{
				new : true,
				runValidations:true
			}
		)
		return Promise.resolve(result);
	} catch(err) {
		return Promise.reject(err);
	}
}
//removing an existing customer in database
exports.deleteCustomer = async (Customer,id) =>{
	try {
		if(req.user._id!==id) throw 'You are not authorized!'
		let result = await Customer.findOneAndRemove(
			{
				_id : id
			}
		)
		return Promise.resolve(result);
	} catch(err) {
		return Promise.reject(err);
	}
}