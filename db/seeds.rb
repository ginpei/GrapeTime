Task.create([
  {
    id: 100,
    name: 'task 1',
  },
  {
    id: 110,
    name: 'task 1-1',
    parent_id: 100,
  },
  {
    id: 111,
    name: 'task 1-1-1',
    parent_id: 110,
    spent_time: 30,
    estimate_time: 30,
    necessary_time: 30,
  },
  {
    id: 112,
    name: 'task 1-1-2</script>',
    parent_id: 110,
    spent_time: 10,
    estimate_time: 30,
    necessary_time: 30,
  },
  {
    id: 120,
    name: 'task 1-2',
    parent_id: 100,
  },
  {
    id: 121,
    name: 'task 1-2-1',
    parent_id: 120,
  },
  {
    id: 200,
    name: 'task 2',
  },
  {
    id: 210,
    name: 'task 2-1',
    parent_id: 200,
  },
  {
    id: 211,
    name: 'task 2-1-1',
    parent_id: 210,
    spent_time: 30,
    estimate_time: 30,
    necessary_time: 30,
  },
  {
    id: 212,
    name: 'task 2-1-2',
    parent_id: 210,
    spent_time: 10,
    estimate_time: 30,
    necessary_time: 30,
  },
  {
    id: 220,
    name: 'task 2-2',
    parent_id: 200,
  },
  {
    id: 221,
    name: 'task 2-2-1',
    parent_id: 220,
  },
])

WorkPeriod.create([
  {
    task_id: 111,
    started_at: '2000-01-01 00:00:00',
    finished_at: '2000-01-01 00:30:00',
    note: 'My first working',
  },
])
