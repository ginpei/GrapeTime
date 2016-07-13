# $(document).on 'page:load', (event)->

$workingTask = null

startWorking = ($task)->
	stopWorking()

	$form = findStartForm($task)
	$form.submit()
	$task.addClass('is-working')

	$workingTask = $task

stopWorking = ($task = $workingTask)->
	return unless $task

	$form = findStopForm($task)
	$form.submit()
	$task.removeClass('is-working')

	$workingTask = null

findEventElement = (event)->
	$(event.currentTarget).closest('.js-taskItem')

findStartForm = ($task)->
	$task.children('.js-task-formStart')

findStopForm = ($task)->
	$task.children('.js-task-formStop')

$(document).on 'click', '.js-task-toggle', (event)->
	$task = findEventElement(event)
	$task.toggleClass('is-task-opened')

$(document).on 'click', '.js-task-work', (event)->
	$task = findEventElement(event)
	if $task.hasClass('is-working')
		stopWorking($task)
	else
		startWorking($task)

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
