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

	it('is an instance', ()=>{
		expect(model).to.be.instanceof(Task);
	});
});
