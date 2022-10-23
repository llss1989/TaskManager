class Task < ApplicationRecord
<<<<<<< HEAD
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true
  validates :name, presence: true
  validates :description, presence: true
  validates :author, presence: true
  validates :description, length: { maximum: 500 }
=======
    belongs_to :author, class_name: 'User'
    belongs_to :assignee, class_name: 'User', optional: true
    validates :name, presence: true
    validates :description, presence: true
    validates :author, presence: true
    validates :description, length: { maximum: 500 }
>>>>>>> 0d41bec62374d18d6c6e42bad54b1ca6f79a8c0e
end
