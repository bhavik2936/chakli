class UpdateColumnInScoreBoards < ActiveRecord::Migration[6.1]
  def change
    change_column_default :score_boards, :score, 0
    change_column_default :score_boards, :strike, 0
  end
end
