class User < ApplicationRecord
  validates :name, presence: true
  has_one :score_board
end
