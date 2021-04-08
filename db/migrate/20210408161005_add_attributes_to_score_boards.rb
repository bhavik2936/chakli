class AddAttributesToScoreBoards < ActiveRecord::Migration[6.1]
  def change
    add_column :score_boards, :time_taken, :float
  end
end
