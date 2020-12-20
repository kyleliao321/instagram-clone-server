module.exports = {
    "roots": [
        "src"
    ],
    "testMatch": [
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "testPathIgnorePatterns": [
      "/__integration__"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "babel-jest"
    },
    "setupFiles": [
      'dotenv/config'
    ],
    "testEnvironment": "node"
}