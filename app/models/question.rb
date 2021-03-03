class Question < ApplicationRecord
  validates :statement, presence: true
  validates :answer, presence: true
end
