<h1>🎀 Contribution Guide</h1>
<p>By Contributing on to this project, you agree to release your work under the license assigned to this project.</p>
<h3>⚙️ Project Setup</h3>
<ol>
<li>Fork & Clone The Repo</li>
<li>run <code>yarn install</code> to install dependencies</li>
<li>create a branch for your PR with <code>git checkout -b pr/your-branch-name</code> </li>
</ol>

> 💡 Tip: Keep your `main` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```sh
> git remote add upstream https://github.com/ImCalledAshraf/react-mouse-pointer.git
> git fetch upstream
> git branch --set-upstream-to=upstream/main main
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `main`
> branch to use the upstream main branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `main` branch.
> Whenever you want to update your version of `main`, do a regular `git pull`.

<h3>🪚 Development</h3>
<h6>Creating New Functionality</h6>
- <p>if you wish to create a new functionality, you cancreate a new story in <code>stories/yourStoryName.story.tsx</code>, run <code>yarn start</code> to start the development server, create the functionality you wish to add, and test it in your story.
- <p>after creating and testing your newly added feature, add its respective documentation to <code>docs/yourFeatureDocName.md</code>.</p>
<h6>Editing Functionality</h6>
- <p>Update the functionality</p>
- <p>Update Documentation According to changes</p>
</p>
<h3>🧰  Commits & Pushes</h3>
<h6> Commit Messages </h6>

- <p> This repo uses <a href='https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716'> semantic-release </a> and conventional commit messages (Commitizen) so prefix your commits with fix: or feat: if you want your changes to appear in release notes.</p>
- <p>A list of available Convetional Commit Messages:<img src="https://raw.githubusercontent.com/commitizen/cz-cli/master/meta/screenshots/add-commit.png" alt="GPLv3 License"></p>


<h3>⚔️ Dont Know Where to Start? </h3>
<p>Check <code><a href='https://github.com/ImCalledAshraf/react-mouse-pointer/issues?q=is%3Aopen+is%3Aissue'>Open Issues</a></code> for issues, bug reports and questions to answer.</p>

<p>Happy Coding!</p>
