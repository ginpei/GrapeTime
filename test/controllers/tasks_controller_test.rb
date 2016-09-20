require 'test_helper'

class TasksControllerTest < ActionController::TestCase
  setup do
    @task = tasks(:task_1)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tasks)
  end

  test "should create task" do
    assert_difference('Task.count') do
      post :create, task: { estimate_time: @task.estimate_time, name: @task.name, necessary_time: @task.necessary_time, spent_time: @task.spent_time }
    end

    assert_response :success
  end

  test "should show task" do
    get :show, id: @task
    assert_response :success
  end

  test "should update task" do
    patch :update, id: @task, task: { estimate_time: @task.estimate_time, name: @task.name, necessary_time: @task.necessary_time, spent_time: @task.spent_time }
    assert_response :success
  end

  test "should destroy task" do
    assert_difference('Task.count', -1) do
      delete :destroy, id: @task
    end

    assert_response :success
  end

  test 'should start task' do
    @task.spent_time = 0
    assert_difference('WorkPeriod.count') do
      post :start, id: @task
    end
    @task = Task.find(@task.id)  # updated
    assert @task.working?
    assert_response :success
  end

  test 'should stop task' do
    @task.start
    patch :stop, id: @task
    assert_not @task.working?
    assert_response :success
  end
end
