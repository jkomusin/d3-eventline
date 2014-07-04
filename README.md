# Eventline

Eventline is a Javascript plugin which leverages [D3](http://d3js.org/) to provide a Gantt chart-like data visualization for plotting multiple series of temporal "events." The events are plotted on stacked timelines to afford easy comparison and potential exploration of their occurences in order to illustrate or discover correlations between datasets.

A series of years, the default configuration:

![Year Series Eventline](https://raw.github.com/jkomusin/d3-eventline/master/examples/year_demo.png)

A series of months:

![Month Series Eventline](https://raw.github.com/jkomusin/d3-eventline/master/examples/month_demo.png)

## Usage

Eventline exposes a number of parameters in order to display datasets in an appealing way. They may be set prior to calling a generated eventline() function to render a plot. They are detailed at the top of the d3.eventline.js source.

Examples (along with CSS styling boilerplate) are available in the `examples/` folder.

## Data Format

Data bound to Eventline plots should be in an array of eventlines with a `label` and `events` properties. `events` are by default expected to be an array of objects with `start`, `end`, and (optional) `magnitude` values. However, the function used to retrieve the start and end dates of each event may be configured to fit other formats via the `eventStart` and `eventEnd` properties of a plot. An example of the default format:

```js
[
    {"label": "2010", "events": [
        {"start": new Date(), "end": new Date(), "magnitude": 100},
        {"start": new Date(), "end: new Date(), "magnitude": 100}]},
    {"label": "2011", "events": [
        {"start": new Date(), "end": new Date(), "magnitude": 100},
        {"start": new Date(), "end: new Date(), "magnitude": 100}]}
];
```


