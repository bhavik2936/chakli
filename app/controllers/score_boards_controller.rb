class ScoreBoardsController < ApplicationController

  def index
  end

  def new
    @score_board = ScoreBoard.new(user_id: params[:user_id])
  end

  def create
    @score_board = ScoreBoard.new(score_board_params)

    respond_to do |format|
      if @score_board.save
        format.json
      else
        format.json { render json: { error: "Bad Request", status: 400 }, status: 400 }
      end
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
