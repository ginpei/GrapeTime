require 'test_helper'

class WorkPeriodTest < ActiveSupport::TestCase
  test 'get work time as minutes' do
    assert_equal 30.0, work_periods(:one).work_time
  end
end
