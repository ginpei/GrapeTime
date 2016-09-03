let expect = require('chai').expect;

import Model from '../../app/assets/javascripts/bases/Model.es6.js';

class TestModel extends Model {
	get baseUrl() {
		return '/test_models';
	}
}
TestModel.attributeTypes = {
	'validAnything': Model.AttributeTypes.any,
	'validString': Model.AttributeTypes.string,
	'validDate': Model.AttributeTypes.instanceOf(Date),
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

describe('bases/Model', ()=>{
	let model;

	beforeEach(()=>{
		model = new TestModel();
	});

	describe('Constructor', ()=>{
		let obj = {};
		let attr;

		beforeEach(()=>{
			attr = { obj: obj, save: 123 };
			model = new TestModel(attr);
		});

		it('imports attributes', ()=>{
			expect(model.attributes.obj).to.equal(obj);
		});

		it('copies attributes object', ()=>{
			expect(model.attributes).not.to.equal(attr);
		});

		it('creates accessors', ()=>{
			expect(model.obj).to.equal(obj);
		});

		it('does not create accessors if the name exists', ()=>{
			expect(typeof model.save).to.equal('function');
		});
	});

	describe('set(name, value)', ()=>{
		let obj = {};
		beforeEach(()=>{
			model.set('num', 100);
			model.set('num', 200);
			model.set('str', 'foo');
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
		it('accepts any values when the type is not defined', ()=>{
			expect(()=>{
				model.checkValidation('undefinedValue', 123);
				model.checkValidation('undefinedValue', 'foo');
			}).to.not.throw();
		});

		it('accepts any values when the specified type is empty', ()=>{
			expect(()=>{
				model.checkValidation('validAnything', 123);
				model.checkValidation('validAnything', 'foo');
			}).to.not.throw();
		});

		it('accepts a value which is a specified type', ()=>{
			expect(()=>{
				model.checkValidation('validString', 'foo');
			}).to.not.throw();
		});

		it('rejects a value which is not a specified type', ()=>{
			expect(()=>{
				model.checkValidation('validString', 123);
			}).to.throw('The value 123 of validString has to be a string.');
		});

		it('accepts a value which is a specified instance', ()=>{
			expect(()=>{
				model.checkValidation('validDate', new Date());
			}).to.not.throw();
		});

		it('rejects a value which is not a specified instance', ()=>{
			expect(()=>{
				model.checkValidation('validDate', Date.now());
			}).to.throw(/The value \d+ of validDate has to be a Date./);
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
