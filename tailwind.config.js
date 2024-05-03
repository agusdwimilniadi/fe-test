// eslint-disable-next-line no-undef
const flowbite = require('flowbite-react/tailwind');
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite-react/lib/esm/**/*.js',
    // eslint-disable-next-line no-undef
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require('flowbite/plugin')],
};
