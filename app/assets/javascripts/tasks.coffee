# $(document).on 'page:load', (event)->

##
# @type {jQuery}
# @see #startWorking
# @see #stopWorking
$workingTask = null

##
# Render a form for new top task record.
render_new_form = ()->
	f = JST['templates/tasks/_form_new']
	html = f({ task: null })
	$('.js-task-newArea')
		.empty()
		.append(html)

##
# Render a task list using data from server.
render_list = ()->
	tasks_source = $('#data-tasks').prop('text')
	tasks = JSON.parse(tasks_source)
	html = tasks.map(render_item).join('')
	$('.js-task-list')
		.empty()
		.append(html)

##
# Render one task record and its children recursively.
# @param {object} task A task data.
render_item = (task)->
	f = JST['templates/tasks/item']
	f(task: task)

##
# Send a request to start working.
# @param {jQuery} $task A task element.
startWorking = ($task)->
	stopWorking()

	$form = findStartForm($task)
	$form.submit()
	$task.addClass('is-working')

	$workingTask = $task

##
# Send a request to stop working.
# @param {jQuery} $task A task element.
stopWorking = ($task = $workingTask)->
	return unless $task

	$form = findStopForm($task)
	$form.submit()
	$task.removeClass('is-working')

	$workingTask = null

##
# Find an element contains the element which the event fired.
# @param {Event} event
findEventElement = (event)->
	$(event.currentTarget).closest('.js-taskItem')

##
# @param {jQuery} $task A task element.
findStartForm = ($task)->
	$task.children('.js-task-formStart')

##
# @param {jQuery} $task A task element.
findStopForm = ($task)->
	$task.children('.js-task-formStop')

##
# @param {Event} event
$(document).on 'click', '.js-task-new', (event)->
	$area = $('.js-task-newArea')
	$area.toggleClass('is-task-newArea-opened')

##
# @param {Event} event
$(document).on 'click', '.js-task-toggle', (event)->
	$task = findEventElement(event)
	$task.toggleClass('is-task-opened')

##
# @param {Event} event
$(document).on 'click', '.js-task-work', (event)->
	$task = findEventElement(event)
	if $task.hasClass('is-working')
		stopWorking($task)
	else
		startWorking($task)

##
# @param {Event} event
$(document).on 'click', '.js-task-edit', (event)->
	$task = findEventElement(event)
	$task.toggleClass('is-task-editingOwn')

##
# @param {Event} event
$(document).on 'ajax:success', '.task-item-formEdit', (event, data, status, xhr)->
	# do nothing if deleting
	return if $(event.target).closest('.js-task-delete').length > 0

	$task = findEventElement(event)
	$updatedTask = $(data.html)
	$task.replaceWith($updatedTask)

##
# @param {Event} event
$(document).on 'ajax:error', '.task-item-formEdit', (event, res, status, errorType)->
	if res.status is Rails.http_status.unprocessable_entity
		console.error res.responseJSON
	else
		console.error res.responseText

##
# @param {Event} event
$(document).on 'ajax:complete', '.js-task-delete', (event, data, status, xhr)->
	$task = findEventElement(event)
	$task.remove()

##
# @param {Event} event
$(document).on 'click', '.js-addChildTask', (event)->
	$task = findEventElement(event)
	$task.toggleClass('is-editing-addChild')

##
# The entry point.
# @param {Event} event
$(window).on 'turbolinks:load', (event)->
	render_new_form()
	render_list()
