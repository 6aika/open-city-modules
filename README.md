# README

## Open City Modules

This is the module repository for the Open City project.

This repository can be imported to an existing project using `npm install`. 
Yarn is currently not supported, as it doesn't respect `.npmignore` and `files`
filter in `package.json`. 

`npm install <modules_repository>` installs the following files:

```
  "files": [
    "src/*",
    "index.js",
    "types.js"
  ],
```

The repository also has files `development.js` and `App.js` which can be used to 
independently develop new and existing modules in this repository, but they're excluded
from installed files.

When developing modules, uncomment all lines in `development.js`. The file is added to gitignore, so don't commit it to the repository.
