module.exports = api => {
  let dev = false;
  let modules = true;

  switch (api.env()) {
    case 'docs':
    case 'test':
      dev = true;
      modules = false;
      break;
    case 'dist-dev':
      dev = true;
      modules = false;
      break;
    case 'dist-prod':
    case 'esm':
      modules = false;
      break;
    case 'build':
    default:
      break;
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // modules: modules ? 'commonjs' : false,
          corejs: 3,
          // We only use .jsx files on the logged in site, where
          // we strongly encourage using Chrome latest.
          // This disables some tranfroms that hurt performance and
          // aren't needed for most modern browsers.
          targets: {
            chrome: '71',
          },
          useBuiltIns: 'usage',
        }
      ],
      ['@babel/preset-react', { development: dev }]
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      'babel-plugin-dev-expression',
      modules && 'babel-plugin-add-module-exports',
      api.env() === 'test' && 'babel-plugin-istanbul'
    ].filter(Boolean)
  };
};
