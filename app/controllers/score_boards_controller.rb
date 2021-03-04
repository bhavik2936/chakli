class ScoreBoardsController < ApplicationController

  def index

  end

  def new
    @score_board = ScoreBoard.new(user_id: params[:user_id])
    create
  end

  def create
    if @score_board.save
      redirect_to user_questions_path
    else
      redirect_to :root
    end
  end
  
  def edit

  end

  def update

  end

  private

  def score_board_params
    params.require(:score_board).permit(:score, :strike, :user_id)
  end

end
