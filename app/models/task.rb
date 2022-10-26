class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true
  validates :name, presence: true
  validates :description, presence: true
  validates :author, presence: true
  validates :description, length: { maximum: 500 }
  state_machine initial: :new_task do
    state :new_task
    state :in_development
    state :archived
    state :in_qa
    state :in_code_review
    state :ready_for_release
    state :released

    event :start do
      transition new_task: :in_development
    end

    event :test_code do
      transition in_development: :in_qa
    end

    event :review do
      transition in_qa: :in_code_review
    end
    event :back_to_development do
      transition [:in_qa, :in_code_review] => :in_development
    end

    event :ready_for_release_or_not do
      transition in_code_review: :ready_for_release
    end

    event :release do
      transition ready_for_release: :released
    end

    event :archive do
      transition [:new_task, :ready_for_release, :released] => :archived
    end
  end
  
end
