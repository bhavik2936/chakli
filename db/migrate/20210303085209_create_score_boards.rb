class CreateScoreBoards < ActiveRecord::Migration[6.1]
  def change
    create_table :score_boards do |t|
      t.integer :score
      t.integer :strike

      t.timestamps
    end
  end
end
