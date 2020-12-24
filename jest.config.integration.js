module.exports = {
    "roots": [
        "src"
    ],
    "testMatch": [
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "babel-jest"
    },
    "setupFiles": [
      'dotenv/config'
    ],
    "testEnvironment": "node"
}