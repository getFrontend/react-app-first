# react-app-first
Using Vite for build projects:

`npm create vite@latest`

### .vscode
Add to .vscode/settings.json:

`    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
      }`

### EsLint
* Add to rules: 

`    "semi": ["error", "always", {"omitLastInOneLineBlock": false}]`

* Add to rules: 

`"comma-dangle": ["error", "never"]`

* Add to rules: 

`quotes: ["error", "single"]`

* Add to rules: 

`'react/prop-types': [0],`