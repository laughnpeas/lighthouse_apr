//add .git directory in the end | get rid of git => rm -rf .git

*repository - your project, and its history of changes
* branch - timeline of those changes
* commit - point of timeline(milestone)
* Three states - keeps track of differences
  - working directory
  - staging
  - repository
  - remote


git init
git status // status of our repository
git add <fileName>
git commit -m(message) "Created ... and added initial ..." // -a : commit all( -am )
git log // unique Id
git branch <more_content>
git checkout more_content // switch to branch more_content -  stash before change branch
git merge more_content  // @master branch to merge into - resolve merge conflicts : automatically commit changes
git pull
git remote // add origin <git_url> -v: veryfy
git push -u origin master