require 'faker'

FactoryBot.define do
  factory :task do
    name { Faker::DcComics.name }
    description { Faker::DcComics.title }
    association :author, factory: :manager
    association :assignee, factory: :manager
    state { 'new_task' }
    expired_at {  }
  end
end
