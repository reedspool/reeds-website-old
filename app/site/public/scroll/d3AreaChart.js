// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/area-chart
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
export function AreaChart(data, {
  x = ([x]) => x, // given d in data, returns the (temporal) x-value
  y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
  defined, // given d in data, returns true if defined (for gaps)
  curve = d3.curveLinear, // method of interpolation between points
  marginTop = 20, // top margin, in pixels
  marginRight = 30, // right margin, in pixels
  marginBottom = 40, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  xType = d3.scaleUtc, // type of x-scale
  xDomain, // [xmin, xmax]
  xRange = [marginLeft, width - marginRight], // [left, right]
  xLabel, // a label for the y-axis
  yType = d3.scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  yFormat, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  color = "currentColor", // fill color of area
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const I = d3.range(X.length);

  // Compute which data points are considered defined.
  if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
  const D = d3.map(data, defined);

  // Compute default domains.
  if (xDomain === undefined) xDomain = d3.extent(X);
  if (yDomain === undefined) yDomain = [d3.min(Y), d3.max(Y)];

  // Construct scales and axes.
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

  // Construct an area generator.
  const area = d3.area()
    .defined((i) => D[i])
    .curve(curve)
    .x((i) => xScale(X[i]))
    .y0((i) => yScale(Y[i] < 0 ? Y[i] : 0))
    .y1((i) => yScale(Y[i] < 0 ? 0 : Y[i]));

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g.append("text")
        .attr("x", 0)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(yLabel)
    );

  svg.append("path")
    .attr("fill", color)
    .attr("d", area(I));

  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis)
    .call((g) =>
      g.append("text")
        .attr("x", marginLeft)
        .attr("y", marginTop * 1.8)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(xLabel)
    );

  return svg.node();
}
