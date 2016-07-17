class Task < ActiveRecord::Base
  has_many :children, class_name: :Task, foreign_key: :parent_id
  belongs_to :parent, class_name: :Task, foreign_key: :parent_id
  has_many :work_periods

  validates :name, presence: true
  before_create :copy_estimate_to_necessary

  def to_family(options={})
    {
      children: children.map{|t|t.to_family},
      created_at: created_at,
      estimate_time: estimate_time,
      id: id,
      name: name,
      necessary_time: necessary_time,
      parent_id: parent_id,
      spent_time: spent_time,
      total_necessary_time: total_necessary_time,
      total_spent_time: total_spent_time,
      updated_at: updated_at,
      working: working?,
    }
  end

  def new
    Task.new(parent_id: id)
  end

  def update_time
    self.spent_time = work_periods
      .map{|p|p.duration}
      .inject(0){|s,n|s+n}
  end

  def update_time_recursively
    children.each{|t|t.update_time_recursively}
    update_time
  end

  def total_spent_time
    other_time = children
      .map{|c|c.total_spent_time}
      .inject(0){|s,n|s+n}

    spent_time + other_time
  end

  def total_necessary_time
    other_time = children
      .map{|c|c.total_necessary_time}
      .inject(0){|s,n|s+n}

    necessary_time + other_time
  end

  def start
    stop

    period = work_periods.build
    period.start
    period.save
  end

  def stop
    period = working_period
    return unless period
    period.finish
    period.save
  end

  def working_period
    period = work_periods.last
    if period and period.working?
      period
    else
      nil
    end
  end

  def working?
    !working_period.nil?
  end

  private

    def copy_estimate_to_necessary
      if necessary_time == 0
        self.necessary_time = estimate_time
      end
    end
end
