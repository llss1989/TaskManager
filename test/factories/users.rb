require 'faker'

FactoryBot.define do
  factory :user do
    first_name { Faker::Name.name }
    last_name { Faker::Name.last_name }
    password { Faker::Books::Dune.planet }
    email { Faker::Internet.email }
    avatar { Faker::Avatar.image }
    type { '' }

    factory :developer do
      type { 'Developer' }
    end

    factory :manager do
      type { 'Manager' }
    end

    factory :admin do
      type { 'Admin' }
    end
  end
end
