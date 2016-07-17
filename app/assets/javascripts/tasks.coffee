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
	$('.js-task-new_area')
		.empty()
		.append(html)

##
# Render a task list using data from server.
render_list = ()->
	tasks_source = $('#data-tasks').prop('text')
	if tasks_source
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
	$area = $('.js-task-new_area')
	$area.toggleClass('is-task-new_area-opened')

##
# Toggle add child task form area.
toggle_add_child_area = ($task)->
	$task.toggleClass('is-editing-addChild')
	$form = $task.children('.js-task-formAddChild').find('form')
	$form[0].reset()

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

	##
	'ajax:success new_area': (event, data, status, xhr)->
		task = data.data
		html = render_item(task)
		$('.js-task-list')
			.append(html)

		toggle_new_area()

	##
	'click toggle': (event)->
		$task = findEventElement(event)
		$task.toggleClass('is-task-opened')

	##
	'click work': (event)->
		$task = findEventElement(event)
		if $task.hasClass('is-working')
			stopWorking($task)
		else
			startWorking($task)

	##
	'click edit': (event)->
		$task = findEventElement(event)
		$task.toggleClass('is-task-editingOwn')

	##
	'ajax:success formEdit': (event, data, status, xhr)->
		# do nothing if deleting
		return if $(event.target).closest('.js-task-delete').length > 0

		$task = findEventElement(event)
		html = render_item(data.data)
		$task.replaceWith(html)

	##
	'ajax:error formEdit': (event, res, status, errorType)->
		if res.status is Rails.http_status.unprocessable_entity
			console.error res.responseJSON
		else
			console.error res.responseText

	##
	'ajax:complete delete': (event, data, status, xhr)->
		$task = findEventElement(event)
		$task.remove()

	##
	'click addChildTask': (event)->
		$task = findEventElement(event)
		$task.toggleClass('is-editing-addChild')

	##
	'ajax:success formAddChild': (event, data, status, xhr)->
		$task = findEventElement(event)
		html = render_item(data.data)
		$children = $task.children('.js-task-children')
		$children.append(html)

		toggle_add_child_area($task)

# --------------------------------
# Entry point

$(window).on 'turbolinks:load', (event)->
	render_new_form()
	render_list()
