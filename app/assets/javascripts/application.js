// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jade/runtime
//= require react
//= require react_ujs
//= require components
//= require_tree .

window.Rails = {
	http_status: {
		unprocessable_entity: 422,
	},

	/**
	 * @param {HTMLFormElement} elForm
	 * @param {function} callback
	 * @returns {XMLHttpRequest}
	 * @example
	 * window.Rails.post(this.refs.form, (xhr, event)=>{
	 *   console.log(event.type);
	 *   let data = JSON.parse(xhr.responseText);
	 * });
	 */
	post: function(elForm, callback) {
		return this.sendRemoteForm(elForm, callback);
	},

	/**
	 * @param {HTMLFormElement} elForm
	 * @param {function} [callback]
	 * @returns {XMLHttpRequest}
	 */
	sendRemoteForm: function(elForm, callback=()=>{}) {
		let { url, method, data } = this.getFormData(elForm);

		let xhr = new XMLHttpRequest();
		xhr.onload = function(event) {
			callback(xhr, event);
		};
		xhr.onerror = function(event) {
			callback(xhr, event);
		};
		xhr.open(method, url);
		xhr.setRequestHeader('X-CSRF-Token', this.getCSRFToken());
		xhr.send(data);

		return xhr;
	},

	/**
	 * @param {HTMLFormElement} elForm
	 * @returns {object}
	 * @example
	 * var elForm = document.querySelector('#the-form');
	 * let { url, method, data } = this.getFormData(elForm);
	 */
	getFormData: function(elForm) {
		let url = elForm.getAttribute('action');
		let method = elForm.getAttribute('method').toUpperCase();
		let data = new FormData(elForm);
		return { url, method, data };
	},

	/**
	 * @returns {string}
	 */
	getCSRFToken: function() {
		let el = document.querySelector('meta[name=csrf-token]');
		let token = el.getAttribute('content');
		return token;
	},
};
