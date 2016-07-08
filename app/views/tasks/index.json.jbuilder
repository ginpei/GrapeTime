json.array!(@tasks) do |task|
  json.extract! task, :id, :name, :spent_time, :estimate_time, :necessary_time
  json.url task_url(task, format: :json)
end
