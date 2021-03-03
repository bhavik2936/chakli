class Question < ApplicationRecord
  validates :statement, presence: true
end
