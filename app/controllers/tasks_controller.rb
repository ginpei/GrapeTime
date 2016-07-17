class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy, :start, :stop]

  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = Task.where(parent_id: nil)
    @tasks_json = @tasks.map{|t|t.to_family}.to_json.html_safe
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
  end

  # GET /tasks/new
  def new
    @task = Task.new
    @task.parent_id = params[:parent]
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: { data: @task.to_family }
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    if @task.update(task_params)
      html = render_to_string(:_index_item, layout: nil, locals: { task: @task } )
      render json: { html: html }
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    html = ''
    render json: { html: html }
  end

  # POST /tasks/1/start
  # POST /tasks/1/start.json
  def start
    @task.start
    @task.update_spent_time
    render json: {}
  end

  # POST /tasks/1/stop
  # POST /tasks/1/stop.json
  def stop
    @task.stop
    @task.update_spent_time
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
