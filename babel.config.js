module.exports = api => {
  const isTest = api.env('test');

  return {
    "presets": [
      "@babel/preset-env",
      "@babel/typescript"
    ],
    "plugins": [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-transform-runtime"
    ],
    "ignore": isTest ? [] : [
      "src/**/*.spec.ts"
    ]
  }
}