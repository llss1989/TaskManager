class User < ApplicationRecord
  has_secure_password
  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assignee_id
  validates :first_name, presence: true, length: { minimum: 2 }, format: { with: /\A[^0-9]+\z/ }
  validates :last_name, presence: true, length: { minimum: 2 }, format: { with:  /\A[^0-9]+\z/ }
  validates :email, presence: true, uniqueness: true, format: { with: /@/m }
end
