workflow "Unit Test" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  uses = "actions/npm@master"
  args = "run cov"
  secrets = ["GITHUB_TOKEN"]
  needs = ["Install"]
}
