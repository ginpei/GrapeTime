# $(document).on 'page:load', (event)->

findEventElement = (event)->
	$(event.currentTarget).closest('.js-taskItem')

$(document).on 'click', '.js-task-edit', (event)->
	$task = findEventElement(event)
	$task.toggleClass('is-task-editingOwn')

$(document).on 'ajax:success', '.task-item-formEdit', (event, data, status, xhr)->
	$task = findEventElement(event)
	$updatedTask = $(data.html)
	$task.replaceWith($updatedTask)

$(document).on 'ajax:error', '.task-item-formEdit', (event, res, status, errorType)->
	if res.status is Rails.http_status.unprocessable_entity
		console.error res.responseJSON
	else
		console.error res.responseText

$(document).on 'click', '.js-addChildTask', (event)->
	$task = findEventElement(event)
	$task.toggleClass('is-editing-addChild')
