class ScoreBoard < ApplicationRecord
  validates :score, numericality: { greater_than: 0 }
  validates :strike, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }
end
