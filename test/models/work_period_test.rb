require 'test_helper'

class WorkPeriodTest < ActiveSupport::TestCase
  test 'get duration as minutes' do
    p = work_periods(:one)

    assert_equal 30.0, p.duration

    p.finished_at = nil
    travel_to DateTime.new(2000,01,01,01,00,00) do
      assert_equal 60.0, p.duration
    end

    p.started_at = nil
    assert_equal 0.0, p.duration
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
