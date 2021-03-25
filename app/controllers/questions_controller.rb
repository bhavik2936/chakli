class QuestionsController < ApplicationController
  
  def index
    @users = User.find_by(id: params[:user_id], is_active: true)

    respond_to do |format|
      if @users.nil?
        format.html { redirect_to :root }
        format.json { render json: { error: "Bad Request", status: 400 }, status: 400 }
      else
        format.html { render :index }
        
        format.json do
          @questions = Question.all.select(:id, :statement, :answer).shuffle
          render json: @questions
        end
      end

    end
  end

end
