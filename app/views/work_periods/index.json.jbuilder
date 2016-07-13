json.array!(@work_periods) do |work_period|
  json.extract! work_period, :id, :started_at, :finished_at, :note, :task_id
  json.url work_period_url(work_period, format: :json)
end
