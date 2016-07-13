require 'test_helper'

class WorkPeriodsControllerTest < ActionController::TestCase
  setup do
    @work_period = work_periods(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:work_periods)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create work_period" do
    assert_difference('WorkPeriod.count') do
      post :create, work_period: { finished_at: @work_period.finished_at, note: @work_period.note, started_at: @work_period.started_at, task_id: @work_period.task_id }
    end

    assert_redirected_to work_period_path(assigns(:work_period))
  end

  test "should show work_period" do
    get :show, id: @work_period
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @work_period
    assert_response :success
  end

  test "should update work_period" do
    patch :update, id: @work_period, work_period: { finished_at: @work_period.finished_at, note: @work_period.note, started_at: @work_period.started_at, task_id: @work_period.task_id }
    assert_redirected_to work_period_path(assigns(:work_period))
  end

  test "should destroy work_period" do
    assert_difference('WorkPeriod.count', -1) do
      delete :destroy, id: @work_period
    end

    assert_redirected_to work_periods_path
  end
end
