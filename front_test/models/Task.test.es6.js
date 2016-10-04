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
		it('creats different children instances', ()=>{
			let model2 = new Task({
				estimate_time: 0,
				name: 'task',
				necessary_time: 0,
			});
			expect(model.children).not.to.equal(model2.children);
		});

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

	describe('_convertSetValue()', ()=>{
		beforeEach(()=>{
			model.set({
				children: [
					{
						children: [
							{
								estimate_time: 0,
								name: 'ground child',
								necessary_time: 0,
							},
						],
						estimate_time: 0,
						name: 'child',
						necessary_time: 0,
					},
				],
				estimate_time: '123',
				necessary_time: '123',
				created_at: '2000/01/01',
				updated_at: '2000/01/01',
			});
		});

		it('converts children from object to Task', ()=>{
			expect(model.children.length).to.equal(1);
			expect(model.children[0]).to.be.instanceof(Task);
		});

		it('converts children from object to Task recursively', ()=>{
			expect(model.children[0].children.length).to.equal(1);
			expect(model.children[0].children[0]).to.be.instanceof(Task);
		});

		it('converts estimate_time from string to number', ()=>{
			expect(model.get('estimate_time')).to.equal(123);
		});

		it('converts necessary_time from string to number', ()=>{
			expect(model.get('estimate_time')).to.equal(123);
		});

		it('converts created_at from string to number', ()=>{
			let result = model.get('created_at');
			expect(result).to.instanceof(Date);
			expect(result.getFullYear()).to.equal(2000);
			expect(result.getMonth()).to.equal(0);
			expect(result.getDate()).to.equal(1);
		});

		it('converts created_at from string to number', ()=>{
			let result = model.get('updated_at');
			expect(result).to.instanceof(Date);
			expect(result.getFullYear()).to.equal(2000);
			expect(result.getMonth()).to.equal(0);
			expect(result.getDate()).to.equal(1);
		});
	});

	describe('provides getters', ()=>{
		it('for children', ()=>{
			expect(model.children).not.to.equal(undefined);
			expect(model.children).to.equal(model.get('children'));
		});
	});

	describe('total_spent_time', ()=>{
		beforeEach(()=>{
			model.set('spent_time', 111);
			model.set('children', [
				{
					children: [
						{
							estimate_time: 0,
							name: 'ground child',
							necessary_time: 0,
							spent_time: 1,
						},
					],
					estimate_time: 0,
					name: 'child',
					necessary_time: 0,
					spent_time: 11,
				},
			]);
		});

		it('returns the sum of spent_time', ()=>{
			expect(model.total_spent_time).to.equal(123);
		});
	});

	describe('total_necessary_time', ()=>{
		beforeEach(()=>{
			model.set('necessary_time', 111);
			model.set('children', [
				{
					children: [
						{
							estimate_time: 0,
							name: 'ground child',
							necessary_time: 0,
							necessary_time: 1,
						},
					],
					estimate_time: 0,
					name: 'child',
					necessary_time: 0,
					necessary_time: 11,
				},
			]);
		});

		it('returns the sum of necessary_time', ()=>{
			expect(model.total_necessary_time).to.equal(123);
		});
	});
});
