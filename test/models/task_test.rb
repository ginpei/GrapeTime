require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test 'start' do
    t = tasks(:task_1)

    travel_to DateTime.new(2000,1,1, 0,0,0) do
      t.start
      assert_not_nil t.working_period
      assert_equal 1, t.work_periods.length

      travel_to DateTime.new(2000,1,1, 1,0,0) do
        p0 = t.working_period
        t.start
        p1 = t.working_period
        assert_equal 2, t.work_periods.length
        assert_not p0.working?
        assert_equal 60.0, p0.duration
        assert p1.working?
      end
    end
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
