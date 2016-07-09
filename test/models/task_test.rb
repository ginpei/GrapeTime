require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test 'total_spent_time' do
    sum =
      tasks(:task_1).spent_time +
      tasks(:task_1_1).spent_time +
      tasks(:task_1_1_1).spent_time
    assert_equal sum, tasks(:task_1).total_spent_time
  end

  test 'total_necessary_time' do
    sum =
      tasks(:task_1).necessary_time +
      tasks(:task_1_1).necessary_time +
      tasks(:task_1_1_1).necessary_time
    assert_equal sum, tasks(:task_1).total_necessary_time
  end
end
