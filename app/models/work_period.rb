class WorkPeriod < ActiveRecord::Base
  belongs_to :task

  # Returns the difference as minutes.
  def duration
    (finished_at - started_at) / 60
  end

  def start
    self.started_at = DateTime.now
  end

  def finish
    self.finished_at = DateTime.now
  end

  def working?
    !self.started_at.nil? and self.finished_at.nil?
  end
end
