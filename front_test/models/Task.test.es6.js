let expect = require('chai').expect;
let Task = require('../../app/assets/javascripts/models/Task.es6.js');

describe('models/Task', ()=>{
	let model;

	beforeEach(()=>{
		model = new Task({
			estimate_time: 0,
			name: 'task',
			necessary_time: 0,
		});
	});

	describe('constructor', ()=>{
		describe('has default values', ()=>{
			it('children', ()=>{
				expect(model.children).to.be.instanceof(Array);
				expect(model.children.length).to.equal(0);
			});

			it('parent_id', ()=>{
				expect(model.parent_id).to.equal(null);
			});

			it('spent_time', ()=>{
				expect(model.spent_time).to.equal(0);
			});
		});
	});
});
