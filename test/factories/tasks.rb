FactoryBot.define do
  sequence :string2, aliases: [:name, :description] do |n|
    "string#{n}"
  end
  factory :task do
    name
    description
    author_id { 1 }
    assignee_id { 1 }
    state { ""}
    expired_at { "#{time_rand}" }
  end
end


def time_rand from = 0.0, to = Time.now
  Time.at(from + rand * (to.to_f - from.to_f)).to_s.split('')[0, 10].join()
end


