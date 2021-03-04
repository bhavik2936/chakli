class QuestionsController < ApplicationController
  
  def index
    @questions = Question.all.select(:id, :statement, :answer).shuffle.as_json
    render json: { status: :ok , message: 'Questions loaded', data: @questions }
  end
  
end
