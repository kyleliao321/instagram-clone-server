module.exports = {
    "roots": [
        "src",
        "db"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
      ],
    "transform": {
      "^.+\\.(ts|tsx)$": "babel-jest"
    },
    "setupFiles": [
      'dotenv/config'
    ]
}