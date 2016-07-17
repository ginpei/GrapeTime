###
Tasks
###

# --------------------------------
# Vars

##
# @type {jQuery}
# @see #startWorking
# @see #stopWorking
$workingTask = null

# --------------------------------
# UIs

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
# Toggle new task form area.
toggle_new_area = ()->
	$area = $('.js-task-newArea')
	$area.toggleClass('is-task-newArea-opened')

# --------------------------------
# Logics

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

# --------------------------------
# Elements

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

# --------------------------------
# Events

##
# @param {string} prefix Class name's prefix. (eg: "task"->".js-task-xxx")
# @param {object} definitions Key as pair of event and name, value as listener.
observe_events = (prefix, definitions)->
	$document = $(document)
	for key of definitions
		{ type, name } = _destruct_event_key(key)
		selector = ".js-#{prefix}-#{name}"
		listener = definitions[key]
		$document.on(type, selector, listener)

##
# Called from `observe_events()`.
# @param {string} key
# @returns {object}
# @example
# { type, name } _destruct_event_key('click name')
# console.log type, name  # => "click", "name"
_destruct_event_key = (key)->
	DELIMITER = ' '
	index = key.indexOf(DELIMITER)
	{
		type: key.slice(0, index)
		name: key.slice(index + DELIMITER.length)
	}

observe_events 'task',
	##
	'click new': (event)->
		toggle_new_area()

# ##
# # @param {Event} event
# $(document).on 'click', '.js-task-new', (event)->
# 	toggle_new_area()

$(document).on 'ajax:success', '.js-task-newArea', (event, data, status, xhr)->
	task = data.data
	html = render_item(task)
	$('.js-task-list')
		.append(html)

	toggle_new_area()

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

# --------------------------------
# Entry point

$(window).on 'turbolinks:load', (event)->
	render_new_form()
	render_list()
