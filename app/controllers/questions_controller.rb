class QuestionsController < ApplicationController
  def index
    @questions = Question.all.select(:id, :statement, :answer).shuffle
  end
end
