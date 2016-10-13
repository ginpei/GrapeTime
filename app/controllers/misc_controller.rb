class MiscController < ApplicationController
  def home
    if login_user
      @tasks = login_user.tasks.select{|t|not t.parent_id}
      @tasks_json = @tasks.map{|t|t.to_family}.to_json
    end
  end

  def login
    # FIXME
    session[:user_id] = params[:id]
    redirect_to root_path
  end

  def logout
    session[:user_id] = nil
    redirect_to root_path
  end
end
