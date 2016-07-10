Task.create([
  {
    id: 1,
    name: 'task 1',
  },
  {
    id: 2,
    name: 'task 1-1',
    parent_id: 1,
  },
  {
    id: 3,
    name: 'task 1-1-1',
    parent_id: 2,
    spent_time: 30,
    estimate_time: 30,
    necessary_time: 30,
  },
  {
    id: 4,
    name: 'task 1-1-2',
    parent_id: 2,
    spent_time: 10,
    estimate_time: 30,
    necessary_time: 30,
  },
  {
    id: 5,
    name: 'task 1-2',
    parent_id: 1,
  },
  {
    id: 6,
    name: 'task 2',
  },
])
