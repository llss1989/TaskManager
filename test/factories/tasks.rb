require 'faker'

FactoryBot.define do
  factory :task do
<<<<<<< HEAD
    name { Faker::DcComics.name }
    description { Faker::DcComics.title }
    association :author, factory: :manager
    association :assignee, factory: :manager
    state { '' }
    expired_at { Faker::Date.birthday(min_age: 18, max_age: 65) }
=======
    name { Faker::DcComics.name}
    description {Faker::DcComics.title}
    association :author, factory: :manager
    association :assignee, factory: :manager
    state { '' }
    expired_at {Faker::Date.birthday(min_age: 18, max_age: 65)}
>>>>>>> 0d41bec62374d18d6c6e42bad54b1ca6f79a8c0e
  end
end
