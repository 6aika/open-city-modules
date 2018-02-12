# Open City Modules

This repository contains generic and reusable Open City Modules and onboarding steps meant to be used in projects derived from [Open City Skeleton](https://github.com/6aika/open-city-skeleton) repo.


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

WebView module is just a simple webview which can be used as a front page for the application. The module expects `locale` and `src` as screenProps.


### Feedback module
#### Installation
The feedback module has some peer dependencies which use native platform feature on android and iOS. This requires using `react-native-link` or manual linking after installing the npm packages.

The required peer dependency packages are:
* [react-native-maps](https://github.com/react-community/react-native-maps)
* [react-native-image-picker](https://github.com/react-community/react-native-image-picker)
* [react-native-image-resizer](https://github.com/bamlab/react-native-image-resizer)

Note that the module uses Google Maps both on android and iOS, so the Google Maps API key must be added to `AppDelegate.m` and/or `build.gradle` file as instructed in the package's readme.

#### Configuration
Feedback module exports the module itself and also a function to configure the module:

`import { FeedbackModule, configureFeedback } from 'open-city-modules';`

The default configuration is shown below. Any configuration fields can be overrided by creating a JSON-file as shown below and calling the configuration function with the new configuration JSON.

`configureFeedback(my_configuration.json);`

```
{
  // Default region set as Tampere
  "DEFAULT_LATITUDE" : 61.4983875,
  "DEFAULT_LONGITUDE": 23.752394,
  "DEFAULT_LATITUDE_DELTA": 0.02208,
  "DEFAULT_LONGITUDE_DELTA": 0.01010,

  // API URLs
  "OPEN311_API_URL": "http://feedback.tampere.fi/v1/",
  "OPEN311_SERVICES": "services.json",
  "OPEN311_SERVICE_LIST_LOCALE": "?locale=",
  "OPEN311_REQUESTS": "requests.json",
  "OPEN311_SERVICE_REQUEST_BASE_URL": "requests/",
  "OPEN311_SERVICE_REQUEST_PARAMETERS_URL": ".json?extensions=true",
  "OPEN311_SERVICE_REQUESTS_EXTENSIONS_POSTFIX": "?extensions=true",

  // API Key for sending new service requests
  "OPEN311_SEND_SERVICE_API_KEY": "", // Enter Open311 API Key here

  // Requests
  "TIMEOUT_THRESHOLD": 40000,
  "TIMEOUT_MESSAGE": "timeout",

  // Attachments
  "IMAGE_MAX_HEIGHT": 1080,
  "IMAGE_MAX_WIDTH": 1980,
  "IMAGE_QUALITY": 60,
  "IMAGE_FORMAT": "JPEG",
  "MAX_ATTACHMENTS": 5,
}
```

The module also expects `locale` and `colors` screenProps. 

### HomeView module
#### Installation
The homeview module has some peer dependencies which use native platform feature on android and iOS. This requires using `react-native-link` or manual linking after installing the npm packages.

The required peer dependency packages are:
* [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)
* [react-native-maps](https://github.com/react-community/react-native-maps)

Note that the module uses Google Maps both on android and iOS, so the Google Maps API key must be added to `AppDelegate.m` and/or `build.gradle` file as instructed in the package's readme.

#### Configuration
Homeview module exports the module itself and also a function to configure the module:

`import { HomeViewModule, configureHomeView } from 'open-city-modules';`

HomeView module consists of 4 main features: Hero, Event feed, Hearings feed and RSS feed(s). To disable any of the features just pass in a false value for the corresponding screenProp `showHero`, `showEvents`, `showHearings` or `
showFeed`. By default all of the values are true.

The module also expects `colors` and `locale` screenProps.

The default configuration is shown below. Any configuration fields can be overrided by creating a JSON-file as shown below and calling the configuration function with the new configuration JSON.

`configureHomeView(my_configuration.json);`

```
{
  // API URLs
  "HEARINGS_WEB_URL": "https://kerrokantasi.hel.fi/",
  "HEARINGS_API_BASE_URL": "https://api.hel.fi/kerrokantasi/v1/hearing/",
  "FEATURED_EVENT_API_BASE_URL": "https://www.myhelsinki.fi/api/path/%2Ffi%2Fnae-ja-koe%2Ftapahtumat",
  "LINKED_EVENTS_API_BASE_URL": "https://api.hel.fi/linkedevents/v1/event/",
  "RSS_FEED_EVENTS": "https://www.tampere.fi/tampereen-kaupunki/ajankohtaista/tapahtumat/rss2.xml.stx",
  "RSS_FEED_NEWS": "https://www.tampere.fi/tampereen-kaupunki/ajankohtaista/tiedotteet/rss.xml.stx",
  "RSS_FEED_ANNOUNCEMENTS": "https://www.tampere.fi/tampereen-kaupunki/ajankohtaista/ilmoitukset/rss.xml",
  "RSS_FEED_ARTICLES": "https://www.tampere.fi/tampereen-kaupunki/ajankohtaista/artikkelit/rss.xml.stx",

  // OPENID Settings
  "OPENID_AUTHORITY": "https://profile.dev.hel.ninja/openid",
  "OPENID_SCOPE": "openid profile https://api.hel.fi/auth/profile",
  "OPENID_CLIENT_ID": "3df25acb-325e-46bd-bc55-a34c62c12a0d",
  "OPENID_REDIRECT": "opencityapp://auth/callback",

  // Requests
  "TIMEOUT_THRESHOLD": 40000,
  "TIMEOUT_MESSAGE": "timeout",

}
```

Two new color theme values (`homebg`, `homefg`) must be added to the color theme object when using the module. 

`homebg = HomeView background color`

`homefg = HomeView banner color` 


## Contributing
TODO
