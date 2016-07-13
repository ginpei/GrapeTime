class WorkPeriodsController < ApplicationController
  before_action :set_work_period, only: [:show, :edit, :update, :destroy]

  # GET /work_periods
  # GET /work_periods.json
  def index
    @work_periods = WorkPeriod.all
  end

  # GET /work_periods/1
  # GET /work_periods/1.json
  def show
  end

  # GET /work_periods/new
  def new
    @work_period = WorkPeriod.new
  end

  # GET /work_periods/1/edit
  def edit
  end

  # POST /work_periods
  # POST /work_periods.json
  def create
    @work_period = WorkPeriod.new(work_period_params)

    respond_to do |format|
      if @work_period.save
        format.html { redirect_to @work_period, notice: 'Work period was successfully created.' }
        format.json { render :show, status: :created, location: @work_period }
      else
        format.html { render :new }
        format.json { render json: @work_period.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /work_periods/1
  # PATCH/PUT /work_periods/1.json
  def update
    respond_to do |format|
      if @work_period.update(work_period_params)
        format.html { redirect_to @work_period, notice: 'Work period was successfully updated.' }
        format.json { render :show, status: :ok, location: @work_period }
      else
        format.html { render :edit }
        format.json { render json: @work_period.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /work_periods/1
  # DELETE /work_periods/1.json
  def destroy
    @work_period.destroy
    respond_to do |format|
      format.html { redirect_to work_periods_url, notice: 'Work period was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_work_period
      @work_period = WorkPeriod.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def work_period_params
      params.require(:work_period).permit(:started_at, :finished_at, :note, :task_id)
    end
end
