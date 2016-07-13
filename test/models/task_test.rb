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

  test 'start' do
    t = tasks(:task_1)
    t.start
    assert_not_nil t.working_period
    assert_equal 1, t.work_periods.length
  end

  test 'stop' do
    t = tasks(:task_1)
    t.start
    t.stop
    assert_nil t.working_period
    assert_equal 1, t.work_periods.length
  end

  test 'working_period' do
    t = tasks(:task_1)
    t.start
    assert_not_nil t.working_period
    t.stop
    assert_nil t.working_period
  end

  test 'working?' do
    t = tasks(:task_1)
    t.start
    assert t.working?
    t.stop
    assert_not t.working?
  end
end
