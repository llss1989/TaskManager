# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

admin = Admin.find_or_create_by(first_name: 'admin', last_name: 'admin', email: 'admin@localhost')
admin.password = 'admin'
admin.save

number_of_users = 60
number_of_tasks = 300

number_of_users.times do |i|
  u = [Manager, Developer].sample.new
  u.email = Faker::Internet.email
  u.first_name =  Faker::Name.name
  u.last_name = Faker::Name.last_name
  u.password = Faker::Books::Dune.planet
  u.save
end

number_of_users.times do |i|
  t = Task.create()
  t.name = Faker::Movie.title
  t.description = Faker::Movie.quote
  t.author_id = (1..60).to_a.sample
  t.state = ['new_task','in_development','in_qa','in_code_review','ready_for_release','released','archived'].sample
  t.save
end