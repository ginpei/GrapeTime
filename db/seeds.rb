Task.create([
  {
    id: 100,
    name: 'task 1',
  },
  {
    id: 110,
    name: 'task 1-1',
    parent_id: 1,
  },
  {
    id: 111,
    name: 'task 1-1-1',
    parent_id: 2,
    spent_time: 30,
    estimate_time: 30,
    necessary_time: 30,
  },
  {
    id: 112,
    name: 'task 1-1-2',
    parent_id: 2,
    spent_time: 10,
    estimate_time: 30,
    necessary_time: 30,
  },
  {
    id: 120,
    name: 'task 1-2',
    parent_id: 1,
  },
  {
    id: 200,
    name: 'task 2',
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
