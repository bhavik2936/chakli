class UsersController < ApplicationController
  def new
    @user = User.new
    @score = ScoreBoard.includes(:user).all.order(score: :desc, time_taken: :asc)
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to user_questions_path(@user)
    else
      redirect_to root_path
    end
  end

  def update
    @user = User.find_by(id: params["id"])

    respond_to do |format|
      if @user.update(is_active: false)
       format.js
      else
        format.js { render js: "users", status: 400 }
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end

end
