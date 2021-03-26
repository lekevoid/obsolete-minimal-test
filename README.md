![Broadsign Logo](https://cdn2.hubspot.net/hubfs/297064/images/BroadSign%20Logos/BroadSign-Logo-Low-Quality.png)

# Broadsign.com

[Broadsign.com](https://broadsign.com) website, running on [GatsbyJS](https://www.gatsbyjs.org).

## Table of Contents
* [Getting Started](#getting-started)
	* [Prerequisites](#prerequisites)
		* [Node and Yarn](#node-and-yarn)
		* [Compass](#compass)
		* [Recommended : Fork](#recommended--fork)
	* [Clone Repo and Install](#clone-repo-and-install)
* [Development](#development)
	* [Start Gatsby](#start-gatsby)
		* [On Windows](#on-windows)
		* [On other environments](#on-other-environments)
	* [Start Compass](#start-compass)
* [Deployment](#deployment)
	* [Local](#local)
	* [Staging](#staging)
	* [Production](#production)
* [Authors](#authors)

## Getting Started

### Prerequisites

#### Node and Yarn

Make sure to have [Node](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your local machine.

#### Compass

To compile SASS to CSS, we use [Compass](http://compass-style.org/install/).

First install [Ruby](http://www.ruby-lang.org/en/downloads/), then install the Gem :

```
$ gem update --system
$ gem install compass
```

#### Recommended : Fork

Our recommended free Git client on Windows and Mac is [Fork](https://git-fork.com/)

### Clone Repo and Install

Clone the repo in the directory of your choice and then move to this new directory.

```
git clone https://github.com/broadsignmarketing/broadsign_website.git
cd broadsign_website
yarn install
```

Then make sure your Git client is set to pull/push from/to the **STAGING** branch. **We do not develop on Master**. The only changes that are pushed to Master are made through pull requests from Staging.

It is advised to create a new branch, from the current state of Staging, and use it as a starting point to develop new pages, components, features etc. You can merge your branch with [Staging](https://staging.broadsign.com) once you're confident the changes are ready to push to [Production](https://broadsign.com).

## Development

Compass will re-compile your CSS any time it detects a change in your _*.scss_ files.

### Start Gatsby

#### On Windows

You can use this command to clear the _.cache_ folder (if it exists) and then start the [local server](http://localhost/8000) :

```
yarn serve
```

#### On other environments

You may not need to clear the cache, so you can just go directly with :

```
yarn develop
```

The process of starting the server should take ~10 minutes.

**On Windows**, if the process seems to freeze at any point, just go to the command prompt and press _Enter_. Sometimes the command prompt seems to need a little, well... prompt.

You will now be able to view the local instance at http://localhost:8000/.

Any change you make to your React components or the CSS will be visible in the browser after a few seconds.

### Start Compass

When making changes to the SCSS, make sure to open a new terminal window and run the following command beforehand to re-compile the CSS each time you save your SCSS files.

```
compass watch
```

## Deployment

### [Local](http://localhost/8000)

Testing is primarily done on [local](http://localhost/8000). At any point during development, you can ensure your newly added features don't cause errors when attempting to build for production by running the following to test the build on a local instance :

```
yarn build
```

We also have AWS Amplify installs for each member to connect one branch at a time to test without having to cement [Staging](https://staging.broadsign.com). Ask your Marketing representative or web dev to have such an install provided for you.

### [Staging](https://staging.broadsign.com)

Once changes are tested and you feel they're ready to be deployed, merge your branch with Staging, or push your changes directly to the Staging branch if they are simple and require no real testing. When you push changes, make sure your admin has enabled the auto-build feature in AWS, otherwise you won't be able to see the changes on Staging or share them with other Marketing members.

Once the push is made, the building process on AWS should take between 8 and 12 minutes. You can then view the changes [here](https://staging.broadsign.com).

### [Production](https://broadsign.com)

Once the changes on [Staging](https://staging.broadsign.com) are approved and ready to push, you can initiate a pull request on GitHub. Once approved, it will merge the Staging branch onto the Master branch. This will trigger a deploy on our Netlify install. The process should take between 10 and 14 minutes. If the build succeeds, you will see the changes on the [live website](https://broadsign.com).

## Authors

#### [Kevin Gagnon](https://www.linkedin.com/in/kevin-gagnon-aa485972/)
Front-end developer at Broadsign

#### [Valentin Lacheré](https://www.linkedin.com/in/valentin-lacher%C3%A9/)
Front-end developer at Broadsign

#### [Charbel Chahine](https://www.linkedin.com/in/charbelchahine/)
Prototype author, Front-end developer intern at Broadsign (2018)

#### [Michel Maroun](https://www.linkedin.com/in/michel-maroun-b564a5126/)
Front-end developer intern at Broadsign (2018)
