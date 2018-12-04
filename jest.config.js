module.exports = {
  bail: false,
  collectCoverageFrom: ['<rootDir>/src/client/**/*.{js,jsx}'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/assetsTransformer.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
    'Components(.*)$': '<rootDir>/src/client/Components/$1'
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/?(unit|?(*.)spec).js?(x)'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFiles: ['<rootDir>/config/jest/jest.setup.js']
}
