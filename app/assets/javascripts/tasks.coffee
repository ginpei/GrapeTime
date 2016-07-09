# $(document).on 'page:load', (event)->

$(document).on 'click', '.js-addTask', (event)->
	$body = $(event.currentTarget).closest('.js-taskBody')
	$body.toggleClass('is-editing')
