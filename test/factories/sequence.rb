FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password, :name, :description] do |n|
    "string#{n}"
  end
  sequence :email do |n|
    "email#{n}@example.com"
  end
  sequence :avatar do |n|
    "~/app/assets/images/#{n}"
  end
  sequence :expired_at do |n|
    "21/12/199#{n}"
  end
end
