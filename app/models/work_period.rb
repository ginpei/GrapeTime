class WorkPeriod < ActiveRecord::Base
  belongs_to :task

  # Returns the difference as minutes.
  def work_time
    (finished_at - started_at) / 60
  end
end
