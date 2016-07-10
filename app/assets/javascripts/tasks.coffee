# $(document).on 'page:load', (event)->

findEventElement = (event)->
	$(event.currentTarget).closest('.js-taskItem')

$(document).on 'click', '.js-task-edit', (event)->
	$task = findEventElement(event)
	$task.toggleClass('is-task-editingOwn')

$(document).on 'ajax:complete', '.task-item-formEdit', (event, res, status)->
	$task = findEventElement(event)

	if status is 'success'
		$body = $task.children('.js-task-body')

		data = JSON.parse(res.responseText)
		html = data.html
		$updatedTask = $(html)
		$updatedBody = $updatedTask.children('.js-task-body')

		$body.replaceWith($updatedBody)

		$task.removeClass('is-task-editingOwn')
	else
		if res.status is Rails.http_status.unprocessable_entity
			data = JSON.parse(res.responseText)
			console.error data
		else
			console.error res.responseText

$(document).on 'click', '.js-addChildTask', (event)->
	$task = findEventElement(event)
	$task.toggleClass('is-editing-addChild')
