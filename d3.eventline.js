function eventline() {
    // Default values for each of the plot's properties.
    // These may be retrieved/modified via the getters/setters
    // at the end of this file.

        // An object specifying the margins around the plot.
        //  Must contain values for 'top', 'right', 'bottom', 'left'.
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        // The width of the plot (including margins), in pixels.
        width = 750,
        // The height of each individual eventline (and the contained events),
        // in pixels.
        eventHeight = 20,
        // The functions used to retrieve the start and end dates of each
        // event object.
        eventStart = function(d) { return d.start; },
        eventEnd = function(d) { return d.end; },
        // The margin between the stacked eventlines, in pixels.
        bandMargin = 5,
        // The domain of the plot (the x-axis) as a two-element array of Dates,
        // the 0th element being the start date of the domain, and the 1st element
        // being the end date.
        domain = [
            new Date(2012, 0, 1, 0, 0, 0, 0),
            new Date(2012, 11, 31, 23, 59, 59, 999)
        ],
        // An object containing the arguments to be passed to the D3 axis generation.
        // See https://github.com/mbostock/d3/wiki/SVG-Axes for possible parameters.
        axisArgs = {
            "labelFormat": "%b",
            "tickSize": d3.time.month,
            "tickInterval": 1
        },
        // The amount of horizontal space to provide for the y-axis labels before
        // they are truncated.
        labelMargin = 50;

    function chart(selection) {
        selection.each(function (data) {
            var axisH = 30;
            var height = (margin.top + data.length * (eventHeight + bandMargin) -
                    bandMargin + margin.bottom + axisH);
            var bandWidth = (width - margin.left - labelMargin - margin.right);
            var xScale = d3.time.scale()
                .domain(domain)
                .range([0, bandWidth]);

            // We bind to an array containing this set of data so that we have at
            //  most one SVG that needs creation.
            var svg = d3.select(this).selectAll("svg").data([data]);
            var svgEnter = svg.enter().append("svg")
                .attr("width", width)
                .attr("height", height)
            var bg = svgEnter.append("rect")
                .attr("width", width)
                .attr("height", height)
                .attr("class", "background");

            // This will contain all of our "bands" of events (the individual eventlines)
            var stack = svg.append("g")
                .attr("transform", "translate(" +
                    (margin.left + labelMargin) + "," + margin.top + ")");

            var bands = stack.selectAll("g").data(data);

            var axisGen = d3.svg.axis().scale(xScale)
                .orient("bottom")
                .tickFormat(d3.time.format(axisArgs.labelFormat))
                .ticks(axisArgs.tickSize, axisArgs.tickInterval)
                .innerTickSize(height - 40)
                .outerTickSize(height - 40);
            var axis = stack.append("g")
                .attr("class", "axis")
                .call(axisGen);
            // Position axis labels between tick marks
            axis.selectAll(".axis text")
                .attr("x", function(d) {
                    return (width / (xScale.ticks(
                        axisArgs.tickSize, axisArgs.tickInterval).length * 2));
                });

            var bandEnter = bands.enter().append("g")
                .attr("transform", function(d, i) {
                    return "translate(0, " + (i * (eventHeight + bandMargin)) + ")";
                });
            // Labels come first to place them below the grid
            bandEnter.append("text")
                .attr("class", "label")
                .attr("x", -1 * labelMargin)
                .attr("y", eventHeight / 2)
                .text(function(d) { return d.label; });
            // Draw the outline "grid" around each new band
            bandEnter.append("rect")
                .attr("class", "grid")
                .attr("width", bandWidth)
                .attr("height", eventHeight)
                .attr("x", 0)
                .attr("y", 0);
            bandEnter.append("g");  // these groups will hold our events

            var events = bands.selectAll("g").selectAll("rect")
                .data(function(d) { return d.events; });
            var eventEnter = events.enter().append("rect")
                .attr("class", "event")
                .attr("x", function(d) { return xScale(d.start); })
                .attr("y", 0)
                .attr("width", function(d) { return xScale(d.end) - xScale(d.start); })
                .attr("height", eventHeight)
                .on("mouseover", function(d) {
                    d3.select(this.parentNode).selectAll(".event").sort(function(a, b) {
                        if (a != d) { return -1; }
                        else { return 1; }
                    });
                    d3.select(this).classed("focus", true);
                })
                .on("mouseout", function() {
                    d3.select(this).classed("focus", false);
                });

        });
    }

    chart.margin = function (val) {
        if (!arguments.length) return margin;
        margin = val;
        return chart;
    };

    chart.width = function (val) {
        if (!arguments.length) return width;
        width = val;
        return chart;
    };

    chart.eventHeight = function (val) {
        if (!arguments.length) return eventHeight;
        eventHeight = val;
        return chart;
    };

    chart.eventStart = function (val) {
        if (!arguments.length) return eventStart;
        eventStart = val;
        return chart;
    };

    chart.eventEnd = function (val) {
        if (!arguments.length) return eventEnd;
        eventEnd = val;
        return chart;
    };

    chart.bandMargin = function (val) {
        if (!arguments.length) return bandMargin;
        bandMargin = val;
        return chart;
    };

    chart.domain = function (val) {
        if (!arguments.length) return domain;
        domain = val;
        return chart;
    };

    chart.axisArgs = function (val) {
        if (!arguments.length) return axisArgs;
        axisArgs = val;
        return chart;
    };

    chart.labelMargin = function (val) {
        if (!arguments.length) return labelMargin;
        labelMargin = val;
        return chart;
    };

    return chart;
}

