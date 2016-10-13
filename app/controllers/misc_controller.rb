class MiscController < ApplicationController
  def home
  end

  def login
    session[:user_id] = 1
    redirect_to root_path
  end

  def logout
    session[:user_id] = nil
    redirect_to root_path
  end
end
