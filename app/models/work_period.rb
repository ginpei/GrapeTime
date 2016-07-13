class WorkPeriod < ActiveRecord::Base
  belongs_to :task

  # Returns the difference as minutes.
  def duration
    if started_at
      if finished_at
        (finished_at.to_i - started_at.to_i) / 60
      else
        (DateTime.current.to_i - started_at.to_i) / 60
      end
    else
      0.0
    end
  end

  def start
    self.started_at = DateTime.current
  end

  def finish
    self.finished_at = DateTime.current
  end

  def working?
    !self.started_at.nil? and self.finished_at.nil?
  end
end
