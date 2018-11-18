# MMM-NMBS-Connection

[![license](https://img.shields.io/github/license/raywo/MMM-PublicTransportLeipzig.svg?style=flat)](LICENSE)

Display upcoming trains between 2 NMBS / SNCB stations (Belgium | Belgian Railways)

This module is an extension of the [MagicMirror² project](https://github.com/MichMich/MagicMirror).

## Screenshots
![Connections](https://github.com/Jan-Bart/MMM-NMBS-Connection/blob/master/screenshots/screenshot.png)

## Installation
1. Navigate into your MagicMirror's modules folder
2. Execute: `git clone https://github.com/Jan-Bart/MMM-NMBS-Connection`
3. Add [config](https://github.com/Jan-Bart/MMM-NMBS-Connection#configuration)
4. Done


## Configuration
Sample minimum configuration entry for your `~/MagicMirror/config/config.js`:

```
{
  module: "MMM-NMBS-Connection",
  position: "bottom_left",
  config: {
    from: "Antwerp-Central",
    to: "Brussels-South"
  }
},
```

Sample configuration entry for your `~/MagicMirror/config/config.js` with optional parameters:

```
{
  module: "MMM-NMBS-Connection",
  position: "bottom_left",
  config: {
    from: "Antwerp-Central",
    humanizeDuration: false,
    language: "en",
    results: 3,
    showStationNames: true,
    to: "Brussels-South"
  }
},
```

## Configuration options

The following properties can be configured:

| Key                 | Description                                    | Default         | Example         |
| ------------------- |------------------------------------------------|:---------------:|:---------------:|
| from                | Departure stationname or ID                    | "http://irail.be/stations/NMBS/008893120" | "Antwerp-Central" |
| to                  | Destination stationname or ID                  | "http://irail.be/stations/NMBS/008821196" | "Brussels-South"  |
| humanizeDuration    | Change time format<br />(`1 hour` or `01:05`)       | true  | `true` => 1 hour<br />`false` => 01:05    |
| language            | Overwrite language if necessary<br />*Possible options*: `de`, `en`, `fr`, `nl` |  "en"   | "nl"          |
| results             | Number of rows<br />*Possible options*:  `1` - `6`                   |  3    |      5          |
| showStationNames    | Show or hide station names<br />*Possible options*:  `false`, `true` | false | `true` => show stationnames |

You can find a list [with the stations here](https://github.com/iRail/stations).

## Dependencies
This module is using the [iRail API](https://docs.irail.be/).

## Report bugs
You can report bugs here: [https://github.com/Jan-Bart/MMM-NMBS-Connection/issues](https://github.com/Jan-Bart/MMM-NMBS-Connection/issues)
