class QuestionsController < ApplicationController
  
  def index
    @questions = Question.all.select(:id, :statement, :answer).shuffle
    @users = User.find_by(id: params[:user_id])

    respond_to do |format|
      format.html { render :index }
      format.json { render json: @questions }
    end
  end
end
