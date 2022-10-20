FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password] do |n|
    "string#{n}"
  end
  sequence :email do |n| 
    "email#{n}@example.com"
  end
  sequence :avatar do |n|
    "~/app/assets/images/#{n}"
  end
  
  factory :user do
    first_name
    last_name
    password
    email
    avatar
    type { "" }

    factory :developer do
      type { "Developer" }
    end

    factory :manager do
      type { "Manager" }
    end

    factory :admin do
      type { "Admin" }
    end
  end
end