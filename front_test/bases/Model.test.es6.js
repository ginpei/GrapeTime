let expect = require('chai').expect;

import Model from '../../app/assets/javascripts/bases/Model.es6.js';

class TestModel extends Model {
	_convertSetValue(name, value) {
		var result;
		if (name === 'validNumeric') {
			result = Number(value);
		}
		else {
			result = value;
		}
		return result;
	}

	get baseUrl() {
		return '/test_models';
	}
}
TestModel.attributeTypes = {
	'validAnything': Model.AttributeTypes.any,
	'validBool': Model.AttributeTypes.bool,
	'validBoolOptional': Model.AttributeTypes.bool.optional,
	'validDate': Model.AttributeTypes.instanceOf(Date),
	'validFunction': Model.AttributeTypes.func,
	'validNumber': Model.AttributeTypes.number,
	'validObject': Model.AttributeTypes.object,
	'validString': Model.AttributeTypes.string,
	'validNumeric': Model.AttributeTypes.number,
	'validOneLetter': function(AttributeTypes, name, value) {
		let message = null;
		if (typeof value !== 'string') {
			message = 'has to be a string';
		}
		else if (value.length !== 1) {
			message = 'has to be one letter';
		}
		return message;
	},
};
class StrictAttributesModel extends Model {
	get defaults() {
		return {
			valueWithDefault: 123,
		};
	}
}
StrictAttributesModel.attributeTypes = {
	'validAny': Model.AttributeTypes.any,
	'valueWithDefault': Model.AttributeTypes.number,
};
StrictAttributesModel.allowUndefinedAttributes = false;
StrictAttributesModel.allowOmittingAttributes = false;

describe('bases/Model', ()=>{
	let model;

	beforeEach(()=>{
		model = new TestModel();
	});

	describe('Constructor', ()=>{
		let obj = {};
		let attr;

		beforeEach(()=>{
			attr = { obj: obj };
			model = new TestModel(attr);
		});

		it('copies attributes object', ()=>{
			expect(model.attributes).not.to.equal(attr);
		});
	});

	describe('set(name, value)', ()=>{
		let obj = {};
		beforeEach(()=>{
			model.set('num', 100);
			model.set('num', 200);
			model.set('str', 'foo');
			model.set('validNumeric', '101');
		});

		it('converts set value', ()=>{
			expect(model.attributes.validNumeric).to.equal(101);
		});

		it('stores values', ()=>{
			expect(model.attributes.num).to.equal(200);
			expect(model.attributes.str).to.equal('foo');
		});
	});

	describe('set(attributes)', ()=>{
		beforeEach(()=>{
			model.set({
				num: 100,
				str: 'foo',
			});
		});

		it('stores values', ()=>{
			expect(model.attributes.num).to.equal(100);
			expect(model.attributes.str).to.equal('foo');
		});
	});

	describe('get(name)', ()=>{
		beforeEach(()=>{
			model.set('num', 100);
			model.attributes.str = 'foo';
		});

		it('returns the value', ()=>{
			expect(model.get('num')).to.equal(100);
			expect(model.get('str')).to.equal('foo');
		});
	});

	describe('save()', ()=>{
		describe('options for a new record', ()=>{
			let options;
			let callback;

			beforeEach(()=>{
				callback = function(){};
				model.set('id', null);
				model._sendRequest = (o)=>{
					options = o;
					let xhr = {
						addEventListener: function(type, listener) {
						},
					};
					return xhr;
				};

				model.save(callback);
			});

			it('sets the specified callback', ()=>{
				expect(options.callback).to.equal(callback);
			});
			it('sets model data as parameters', ()=>{
				let data = {};
				data.task = model.attributes;
				expect(options.data).to.eql(data);
			});
			it('sets proper method for new model', ()=>{
				expect(options.method).to.equal('POST');
			});
			it('sets url', ()=>{
				expect(options.url).to.equal('/test_models');
			});
		});

		describe('options for an existing record', ()=>{
			let options;

			beforeEach(()=>{
				model.set('id', 123);
				model._sendRequest = (o)=>{
					options = o;
					let xhr = {
						addEventListener: function(type, listener) {
						},
					};
					return xhr;
				};
				model.save();
			});

			it('sets proper method for existing model', ()=>{
				expect(options.method).to.equal('PATCH');
			});

			it('sets url', ()=>{
				expect(options.url).to.equal('/test_models/123');
			});
		});

		describe('data', ()=>{
			beforeEach(()=>{
				model._sendRequest = (o)=>{
					let xhr = {
						addEventListener: function(type, listener) {
							xhr.responseText = JSON.stringify({
								data: {
									id: 123,
									name: 'foo',
								},
							});

							let event = {};
							listener(event);
						},
					};
					return xhr;
				};
				model.save();
			});

			it('updates model attributes according to the response', ()=>{
				expect(model.attributes.id).to.equal(123);
				expect(model.attributes.name).to.equal('foo');
			});
		});
	});

	describe('checkValidation()', ()=>{
		describe('for types', ()=>{
			it('accepts any values when the specified type is any', ()=>{
				expect(()=>{
					model.checkValidation('validAnything', 123);
					model.checkValidation('validAnything', 'foo');
				}).to.not.throw();
			});

			it('accepts a value which is a bool', ()=>{
				expect(()=>{
					model.checkValidation('validBool', true);
				}).to.not.throw();
			});

			it('rejects a value which is not a bool', ()=>{
				expect(()=>{
					model.checkValidation('validBool', 123);
				}).to.throw('The value 123 of validBool has to be a boolean, not a number.');
			});

			it('accepts a value which is a function', ()=>{
				expect(()=>{
					model.checkValidation('validFunction', function(){});
				}).to.not.throw();
			});

			it('rejects a value which is not a function', ()=>{
				expect(()=>{
					model.checkValidation('validFunction', 123);
				}).to.throw('The value 123 of validFunction has to be a function, not a number.');
			});

			it('accepts a value which is a number', ()=>{
				expect(()=>{
					model.checkValidation('validNumber', 123);
				}).to.not.throw();
			});

			it('rejects a value which is not a number', ()=>{
				expect(()=>{
					model.checkValidation('validNumber', 'foo');
				}).to.throw('The value foo of validNumber has to be a number, not a string.');
			});

			it('accepts a value which is a object', ()=>{
				expect(()=>{
					model.checkValidation('validObject', {});
					model.checkValidation('validObject', []);
					model.checkValidation('validObject', new Date);
				}).to.not.throw();
			});

			it('rejects a value which is not a object', ()=>{
				expect(()=>{
					model.checkValidation('validObject', 123);
				}).to.throw('The value 123 of validObject has to be a object, not a number.');
			});

			it('accepts a value which is a string', ()=>{
				expect(()=>{
					model.checkValidation('validString', 'foo');
				}).to.not.throw();
			});

			it('rejects a value which is not a string', ()=>{
				expect(()=>{
					model.checkValidation('validString', 123);
				}).to.throw('The value 123 of validString has to be a string, not a number.');
			});
		});

		describe('for optionals', ()=>{
			it('accepts a proper value which is a optional bool', ()=>{
				expect(()=>{
					model.checkValidation('validBoolOptional', true);
				}).to.not.throw();
			});

			it('accepts null which is a optional bool', ()=>{
				expect(()=>{
					model.checkValidation('validBoolOptional', null);
				}).to.not.throw();
			});

			it('accepts undefined which is a optional bool', ()=>{
				expect(()=>{
					model.checkValidation('validBoolOptional', undefined);
				}).to.not.throw();
			});

			it('rejects null which is a required bool', ()=>{
				expect(()=>{
					model.checkValidation('validBool', null);
				}).to.throw('The value null of validBool has to be a boolean, not a null.');
			});

			it('rejects undefined which is a required bool', ()=>{
				expect(()=>{
					model.checkValidation('validBool', undefined);
				}).to.throw('The value undefined of validBool has to be a boolean, not a undefined.');
			});
		});

		describe('InstanceOf', ()=>{
			it('accepts a value which is a specified instance', ()=>{
				expect(()=>{
					model.checkValidation('validDate', new Date());
				}).to.not.throw();
			});

			it('rejects a value which is not a specified instance', ()=>{
				expect(()=>{
					model.checkValidation('validDate', new RegExp('foo'));
				}).to.throw(/The value \/foo\/ of validDate has to be a Date, not a RegExp\./);
			});
		});

		describe('allowUndefinedAttributes', ()=>{
			let strictModel;

			beforeEach(()=>{
				strictModel = new StrictAttributesModel({
					validAny: 123,
				});
			});

			it('accepts any undefined values if the flag is off', ()=>{
				expect(()=>{
					model.checkValidation('undefinedValue', 123);
					model.checkValidation('undefinedValue', 'foo');
				}).to.not.throw();
			});

			it('accepts a defined value if the flag is on', ()=>{
				expect(()=>{
					strictModel.checkValidation('validAny', 123);
				}).to.not.throw();
			});

			it('rejects any undefined values if the flag is on', ()=>{
				expect(()=>{
					strictModel.checkValidation('undefinedValue', 123);
				}).to.throw('The value of undefinedValue has to be defined in attributeTypes at the constructor.');
			});
		});

		describe('allowOmittingAttributes', ()=>{
			let strictModel;

			it('allows to create an instance with defined attributes', ()=>{
				expect(()=>{
					strictModel = new StrictAttributesModel({
						validAny: 123,
					});
				}).to.not.throw();
			});

			it('accepts undefined value', ()=>{
				expect(()=>{
					strictModel = new StrictAttributesModel({
						validAny: undefined,
					});
				}).to.not.throw();
			});

			it('denies to create an instance without defined attributes', ()=>{
				expect(()=>{
					strictModel = new StrictAttributesModel({
					});
				}).to.throw('The value of validAny is required.');
			});

			it('allows to create an instance without defined attributes if it is defined in defaults', ()=>{
				expect(()=>{
					strictModel = new StrictAttributesModel({
						validAny: undefined,
					});
				}).to.not.throw();
			});
		});
	});

	describe('url', ()=>{
		let newModel;
		let existingModel;
		let originalModel;

		beforeEach(()=>{
			newModel = new TestModel();
			existingModel = new TestModel({ id: 1 });
			originalModel = new Model();
		});

		it('returns an URL not including the ID for new model', ()=>{
			expect(newModel.url).to.equal('/test_models');
		});

		it('returns an URL including the ID for existing model', ()=>{
			expect(existingModel.url).to.equal('/test_models/1');
		});

		it('throws an error if `baseUrl` is not set', ()=>{
			expect(()=>originalModel.url).to.throw();
		});
	});
});
