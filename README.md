#How to run the application
1 - (install and) use node 16.
2 - npm i
3 - npm start

##testing
npm test

##Process of creating this app

###Create the project and st
npm init -y
mkdir src
mkdir public
touch public/index.html && then populate manually
touch .babelrc && add presets so the code can be transpiled.
npm i react react-dom
touch src/HistoricalEvents.js src/index.js and add the basics

to convert ES6 & JSX to browser compatible readable code - we need to install bable.
npm install --save-dev @babel/core 
npm install --save-dev @babel/cli 
npm install --save-dev @babel/preset-env
npm install --save-dev @babel/preset-react

We need to build the app into a deployable asset and create a local dev server so I'm using webpack for this.
npm install --save-dev webpack 
npm install --save-dev webpack-cli
npm install --save-dev webpack-dev-server

touch webpack.config.js 

####Found an issue, resolved with npm i
Module not found: Error: Can't resolve 'babel-loader' in '/Users/cooneyk/Desktop/github_repos/historicalevents':
npm i --save-dev babel-loader

Added husky prehooks to include linting & running jest tests