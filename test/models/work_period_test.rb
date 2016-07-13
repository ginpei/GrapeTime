require 'test_helper'

class WorkPeriodTest < ActiveSupport::TestCase
  test 'get work time as minutes' do
    assert_equal 30.0, work_periods(:one).work_time
  end

  test 'start' do
    p = work_periods(:not_started)
    p.start
    assert p.started_at
  end

  test 'finish' do
    p = work_periods(:not_started)
    p.finish
    assert p.finished_at
  end

  test 'working?' do
    p = work_periods(:not_started)
    assert_not p.working?
    p.start
    assert p.working?
    p.finish
    assert_not p.working?
  end
end
