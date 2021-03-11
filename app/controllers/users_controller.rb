class UsersController < ApplicationController
  def new
    @user = User.new
    # @users = User.all
    @score = ScoreBoard.includes(:user).all.order("score DESC")
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to user_questions_path(@user)
    else
      redirect_to root_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end

end
