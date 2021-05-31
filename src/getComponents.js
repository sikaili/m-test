/* eslint-disable */ 
const ctx = require.context("./components", true, /\.js$/);
const components = {};
ctx.keys().forEach((path) => {
  components[path.match(/\/([\s\S]*?)\./)[1]] = ctx(path).default;
});
export default components;
