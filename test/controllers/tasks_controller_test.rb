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

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create task" do
    assert_difference('Task.count') do
      post :create, task: { estimate_time: @task.estimate_time, name: @task.name, necessary_time: @task.necessary_time, spent_time: @task.spent_time }
    end

    assert_redirected_to tasks_path
  end

  test "should show task" do
    get :show, id: @task
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @task
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

    assert_redirected_to tasks_path
  end

  test 'should start task' do
    post :start, id: @task
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
