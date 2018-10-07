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
    results: 3,
    showStationNames: true,
    to: "Brussels-South"
  }
},
```


## Configuration options

The following properties can be configured:

| Key                 | Description                                               | Example         |
| ------------------- |---------------------------------------------------------  |:---------------:|
| from                | Departure stationname or ID                               | Antwerp-Central |
| to                  | Destination stationname or ID                             | Brussels-South  |
| humanizeDuration    | Change time format (`1 hour` or `01:05`)  (Default: `true`)     | true (=> 1 hour)  false (=> 01:05)          |
| results             | Number of results (max 6)                                 |      3          |
| showStationNames    | Show or hide stationNames  (Default: `false`)             | false (=> 1 hidden) |

You can find a list [with the stations here](https://github.com/iRail/stations).

## Dependencies
This module is using the [iRail API](https://docs.irail.be/).

## Report bugs
You can report bugs here: [https://github.com/Jan-Bart/MMM-NMBS-Connection/issues](https://github.com/Jan-Bart/MMM-NMBS-Connection/issues)
