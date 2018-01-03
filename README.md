# Open City Modules

This repository contains generic and reusable Open City Modules and onboarding steps meant to be used in projects derived from [Open City Skeleton](https://github.com/haltu/open-city-skeleton) repo.


## Installation

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


## Onboarding steps

Onboarding steps can be created using the two Higher-order-Components (HoCs)
`createSingleChoiceStep` and `createMultiChoiceStep`. They both take a view
component as an argument, and return a component which is compatible with the
`Onboarding` component in the skeleton repository. The `options` and `choiceKey`
props must also be provided to the step component before passing it to `Onboarding`.
The easiest way to do this is using the `withProps` HoC from the npm package `recompose`.
The same step component can be used to create multiple steps by giving it a
different set of `options` and `choiceKey`.

`createSingleChoiceStep` creates a step where the user can select one of the
options. After a selection is made, it is inserted into the `profile` object using
the key provided in props (`choiceKey`) and the next step is shown.

`createMultiChoiceStep` creates a step where the user can select any number of the
options. When the `next` function is called by the view component, an array of the
selected options is inserted into the `profile` object, again using the provided key.

The `ChoiceView` component can be used as a view component for the HoCs or you
can create your own. `ChoiceView` is highly customizable via the following props:
* mode: 'list' | 'grid',
* containerStyle: ?StyleObj
* contentStyle: ?StyleObj
* topImage: any
* topImageStyle: any
* questionStyle: ?StyleObj
* buttonProps: any
* bottomBarProps: any
* bgImage: any
* bgImageAspectRatio: any
* marginTopMultiplier: number

`SplashScreen` can be passed to the `Onboarding` component (`splash` prop) to
be shown before the actual steps. It can be customized using the following props:
* bgImage: any
* bgImageAspectRatio: number
* logo: any
* cityName: string
* welcomeText: string
* beginText: string
* textColor: string
* marginTopMultiplier: number

## Modules
TODO


### WebView module
TODO


### FeedBack module
TODO


## Contributing
TODO
