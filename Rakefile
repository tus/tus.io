require 'jekyll'
require 'tmpdir'

# http://ixti.net/software/2013/01/28/using-jekyll-plugins-on-github-pages.html
# Change your GitHub reponame
GITHUB_REPONAME = "tus/tus.github.io"
GITHUB_BRANCH = "master"

namespace :site do
  desc "Generate blog files"
  task :generate do
    Jekyll::Site.new(Jekyll.configuration({
      "source"      => ".",
      "destination" => "_site"
    })).process
  end

  desc "Generate and publish blog to #{GITHUB_REPONAME}/#{GITHUB_BRANCH}"
  task :publish => [:generate] do
    Dir.mktmpdir do |tmp|
      cp_r "_site/.", tmp
      rm_r "#{tmp}/lib"
      system "echo 'This repo is just a deploy target. Edit the site over at https://github.com/tus/tus.io' > #{tmp}/README.md"
      Dir.chdir tmp
      system "git init"
      system "git add ."
      message = "Site updated at #{Time.now.utc}"
      system "git commit -m #{message.shellescape}"
      system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
      system "git push origin master:refs/heads/#{GITHUB_BRANCH} --force"
    end
  end
end
