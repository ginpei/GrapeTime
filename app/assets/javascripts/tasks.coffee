# $(document).on 'page:load', (event)->

findEventElement = (event)->
	$(event.currentTarget).closest('.js-taskItem')

$(document).on 'click', '.js-task-edit', (event)->
	$task = findEventElement(event)
	$task.toggleClass('is-task-editingOwn')

$(document).on 'click', '.js-addChildTask', (event)->
	$task = findEventElement(event)
	$task.toggleClass('is-editing-addChild')
