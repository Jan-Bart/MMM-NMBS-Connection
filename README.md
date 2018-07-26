# MMM-NMBS-Connection
Display upcoming trains between 2 NMBS/SNCB stations (Belgium)

This module is an extension of the [MagicMirror² project](https://github.com/MichMich/MagicMirror).

## Screenshots
![Connections](https://github.com/Jan-Bart/MMM-NMBS-Connection/blob/master/screenshots/screenshot.png)

## Installation
1. Navigate into your MagicMirror's modules folder
2. Execute git clone https://github.com/Jan-Bart/MMM-NMBS-Connection
3. Add config
4. Done


## Configuration
Sample minimum configuration entry for your `~/MagicMirror/config/config.js`:

```
{
  module: "MMM-NMBS-Connection",
  position: "bottom_left",
  config: {
    from: "Antwerp-Central"
    to: "Brussels-South",
  }
},
```

Sample configuration entry for your `~/MagicMirror/config/config.js` with optional parameters:

```
{
  module: "MMM-NMBS-Connection",
  position: "bottom_left",
  config: {
    from: "Antwerp-Central"
    to: "Brussels-South",
    results: 3
  }
},
```


## Configuration options

The following properties can be configured:

| Key        | Description                    | Example         |
| ---------- |------------------------------  |:---------------:|
| from       | Departure stationname or ID    | Antwerp-Central |
| to         | Destination stationname or ID  | Brussels-Sout   |
| results    | Number of results (max 6)      |      3          |

You can find a list [with the stations here](https://github.com/iRail/stations).

## Dependencies
This module is using the [iRail API](https://docs.irail.be/).