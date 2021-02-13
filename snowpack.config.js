/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
  mount: {
    public: { url: '/', static: true },
    src:'/',
  },
  plugins: [
    [
      'snowpack-plugin-raw-file-loader',
      {
        exts: ['.txt', '.md', '.svg', '.frag', '.vert'], // Add file extensions saying what files should be loaded as strings in your snowpack application. Default: '.txt'
      },
    ],
    '@snowpack/plugin-typescript',
  ],
  buildOptions: {
    sourcemap: true,
  },
  devOptions: {open:'none'},
  exclude: ['**/node_modules/**/*', './output'],
};
module.exports = config;
