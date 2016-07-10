class Task < ActiveRecord::Base
  has_many :children, class_name: :Task, foreign_key: :parent_id
  belongs_to :parent, class_name: :Task, foreign_key: :parent_id

  validates :name, presence: true

  def new
    Task.new(parent_id: id)
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
end
