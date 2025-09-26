export default {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        pragma: 'SeongJoo.createElement', // React.createElement 역할의 함수
        pragmaFrag: 'SeongJoo.Fragment',
      },
    ],
  ],
};
