class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy, :start, :stop]

  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = Task.where(parent_id: nil)
    @tasks_json = @tasks.map{|t|t.to_family}.to_json
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(task_params)
    @task.user_id = login_user.id

    if @task.save
      render json: { data: @task.to_family }
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    @task.update_time
    if @task.update(task_params)
      render json: { data: @task.to_family }
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    render json: { old_task: @task }
  end

  # POST /tasks/1/start
  # POST /tasks/1/start.json
  def start
    @task.start
    @task.update_time
    @task.save
    render json: {}
  end

  # POST /tasks/1/stop
  # POST /tasks/1/stop.json
  def stop
    @task.stop
    @task.update_time
    @task.save
    render json: {}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.require(:task).permit(:name, :spent_time, :estimate_time, :necessary_time, :parent_id)
    end
end
