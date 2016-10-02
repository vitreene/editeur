// This file is auto-generated
// Any change will be overriden
const ignoreTarget = Meteor.isServer ? 'client' : 'server';

let testFiles = [];

if (Meteor.isAppTest) {
  testFiles = testFiles.concat(require.context('./-p', true, /.(test|spec|app-test|app-spec)(s)?.(.+)$/i).keys()).map(file => './-p' + file.substr(1));
  testFiles = testFiles.concat(require.context('./imports', true, /.(test|spec|app-test|app-spec)(s)?.(.+)$/i).keys()).map(file => './imports' + file.substr(1));
  testFiles = testFiles.concat(require.context('./man', true, /.(test|spec|app-test|app-spec)(s)?.(.+)$/i).keys()).map(file => './man' + file.substr(1));
  testFiles = testFiles.concat(require.context('./src', true, /.(test|spec|app-test|app-spec)(s)?.(.+)$/i).keys()).map(file => './src' + file.substr(1));
} else {
  testFiles = testFiles.concat(require.context('./-p', true, /.(test|spec)(s)?.(.+)$/i).keys()).map(file => './-p' + file.substr(1));
  testFiles = testFiles.concat(require.context('./imports', true, /.(test|spec)(s)?.(.+)$/i).keys()).map(file => './imports' + file.substr(1));
  testFiles = testFiles.concat(require.context('./man', true, /.(test|spec)(s)?.(.+)$/i).keys()).map(file => './man' + file.substr(1));
  testFiles = testFiles.concat(require.context('./src', true, /.(test|spec)(s)?.(.+)$/i).keys()).map(file => './src' + file.substr(1));
}

testFiles
  .filter(file => file.indexOf('/' + ignoreTarget + '/') < 0)
  .map(file => require(file));
