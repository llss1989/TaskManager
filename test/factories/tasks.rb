FactoryBot.define do
  sequence :string2, aliases: [:name, :description] do |n|
    "string#{n}"
  end
  factory :task do
    name
    description
    author_id { 1 }
    assignee_id { 1 }
    state { "MyString" }
    expired_at { "2022-10-20" }
  end
end
