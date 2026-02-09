module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("Headshot.jpg");
};
