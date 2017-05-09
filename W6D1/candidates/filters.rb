# In this file we define the methods to help filter out candidates
# This way, we keep these methods separated from other potential parts of the program

def find_id(id)
  @candidates.find {|candidate| candidate if candidate[:id] == id}
end

def experienced?(candidate)
  candidate[:years_of_experience] >= 2
end

def has_git_point?(candidate)
  candidate[:github_points] >= 100
end

def recent_applied?(candidate)
  candidate[:date_applied] > 15.days.ago.to_date
end

def old_enough?(candidate)
  candidate[:age] > 17
end

def knows_languages?(candidate)
  candidate[:languages].include?('Ruby' || 'Python')
end

def qualified_candidates(candidates)
  candidates.select do |candidate|
    experienced?(candidate) &&
        has_git_point?(candidate) &&
        recent_applied?(candidate) &&
        old_enough?(candidate) &&
        knows_languages?(candidate)
  end
end

def sort_by_qualification(candidates)
  candidates.sort_by{|candidate| candidate[:years_of_experience] || candidate[:github_points] = candidate[:years_of_experience] || candidate[:github_points]}.reverse
end

