let expect = require('chai').expect;

import Model from '../../app/assets/javascripts/bases/Model.es6.js';

class TestModel extends Model {
	get baseUrl() {
		return '/test_models';
	}
}

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

		it('imports attributes', ()=>{
			expect(model.attributes.obj).to.equal(obj);
		});

		it('copies attributes object', ()=>{
			expect(model.attributes).not.to.equal(attr);
		});

		it('creates accessors', ()=>{
			expect(model.obj).to.equal(obj);
		});

		it('does not create accessors if the name exists');
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

	describe('save()', ()=>{
		describe('for new options', ()=>{
			let options;
			let callback;

			beforeEach(()=>{
				callback = function(){};
				model.set('id', null);
				model._sendRequest = (o)=>{
					options = o;
				};

				model.save(callback);
			});

			it('sets the specified callback', ()=>{
				expect(options.callback).to.equal(callback);
			});
			it('sets model data', ()=>{
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

		describe('for existing options', ()=>{
			let options;

			beforeEach(()=>{
				model.set('id', 123);
				model._sendRequest = (o)=>{
					options = o;
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
