# $(document).on 'page:load', (event)->

$(document).on 'click', '.js-addChildTask', (event)->
	$task = $(event.currentTarget).closest('.js-taskItem')
	$task.toggleClass('is-editing-addChild')
