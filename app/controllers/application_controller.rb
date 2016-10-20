class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :login_user

  # Make sure the user is logged in
  def auth
    unless login_user
      # TODO: support JSON format
      render status: :unauthorized, text: 'Need to log in'
    end
  end

  def login_user
    @login_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
