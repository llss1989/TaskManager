require 'faker'

FactoryBot.define do
  factory :task do
    name { Faker::DcComics.name }
    description { Faker::DcComics.title }
    association :author, factory: :manager
    association :assignee, factory: :manager
    state { '' }
    expired_at { Faker::Date.birthday(min_age: 18, max_age: 65) }
  end
end
