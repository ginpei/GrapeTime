let expect = require('chai').expect;

import Model from '../../app/assets/javascripts/bases/Model.es6.js';

class TestModel extends Model {
}

describe('bases/Model', ()=>{
	let model;

	beforeEach(()=>{
		model = new TestModel();
	});

	it('is OK', ()=>{
		expect(model instanceof Model).to.be.true;
	});
});
