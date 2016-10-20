User.create([
  {
    id: 1,
    name: 'Alice',
  },
  {
    id: 2,
    name: 'Bob',
  },
])

Task.create([
  {
    id: 100,
    name: 'task 1',
    user_id: 1,
  },
  {
    id: 110,
    name: 'task 1-1',
    parent_id: 100,
    user_id: 1,
  },
  {
    id: 111,
    name: 'task 1-1-1',
    parent_id: 110,
    spent_time: 1500,
    user_id: 1,
    estimate_time: 1800,
  },
  {
    id: 112,
    name: 'task 1-1-2</script>',
    parent_id: 110,
    user_id: 1,
    estimate_time: 1800,
  },
  {
    id: 120,
    name: 'task 1-2',
    parent_id: 100,
    user_id: 1,
  },
  {
    id: 121,
    name: 'task 1-2-1',
    parent_id: 120,
    user_id: 1,
    estimate_time: 1800,
  },
  {
    id: 200,
    name: 'task 2',
    user_id: 1,
  },
  {
    id: 210,
    name: 'task 2-1',
    parent_id: 200,
    user_id: 1,
  },
  {
    id: 211,
    name: 'task 2-1-1',
    parent_id: 210,
    estimate_time: 1800,
    user_id: 1,
  },
  {
    id: 212,
    name: 'task 2-1-2',
    parent_id: 210,
    estimate_time: 1800,
    user_id: 1,
  },
  {
    id: 220,
    name: 'task 2-2',
    parent_id: 200,
    user_id: 1,
  },
  {
    id: 221,
    name: 'task 2-2-1',
    parent_id: 220,
    user_id: 1,
  },
  {
    id: 2100,
    name: 'Bob\'s task',
    user_id: 2,
  },
])

WorkPeriod.create([
  {
    task_id: 111,
    started_at: '2000-01-01 00:00:00',
    finished_at: '2000-01-01 00:05:00',
    note: 'My first working',
  },
  {
    task_id: 111,
    started_at: '2000-01-01 00:10:00',
    finished_at: '2000-01-01 00:30:00',
    note: 'My second working',
  },
  {
    task_id: 121,
    started_at: '2000-01-01 00:30:00',
    finished_at: '2000-01-01 01:00:00',
    note: '',
  },
])
