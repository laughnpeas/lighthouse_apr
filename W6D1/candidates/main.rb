# This is the main entrypoint into the program
# It requires the other files/gems that it needs

require 'pry'
require './candidates'
require './filters'

## Your test code can go here

# binding.pry

#pp @candidates

#pp qualified_candidates(@candidates)

def pry_command
  puts "input command: find 5, all, qualified, quit"
  command = gets.chomp.downcase
  case command
    when "find 5"
      p find_id(5)
    when "all"
      pp sort_by_qualification(@candidates)
    when "qualified"
      pp qualified_candidates(@candidates)
    when "quit"
      abort "Good Bye"
  end
  pry_command
end

pry_command
