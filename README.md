# bar-chart

This is a project to fulfiled _Data Visualization_ Course provided by freeCodeCamp.

Goals: Build an app that is functionally similar to this https://bar-chart.freecodecamp.rocks using the following [database](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json).

In this project, the tech stack was used ReactJS, d3.js and CSS. Vite was used to build instead of the conventional ones, CRA.<br>
Check out the live demo [here](https://ndtrung-dev.github.io/bar-chart).

## Requirements:

### User story:

> 1. My chart should have a title with a corresponding _id="title"_.
>
> 1. My chart should have a g element x-axis with a corresponding _id="x-axis"_.
>
> 1. My chart should have a g element y-axis with a corresponding _id="y-axis"_.
>
> 1. Both axes should contain multiple tick labels, each with a corresponding _class="tick"_.
>
> 1. My chart should have a rect element for each data point with a corresponding _class="bar"_ displaying the data.
>
> 1. Each _.bar_ should have the properties _data-date_ and _data-date_ containing date and GDP values.
>
> 1. The _.bar_ elements' _data-date_ properties should match the order of the provided data.
>
> 1. The _.bar_ elements' _data-date_ properties should match the order of the provided data.
>
> 1. Each _.bar_ element's height should accurately represent the data's corresponding GDP.
>
> 1. The _data-date_ attribute and its corresponding _.bar_ element should align with the corresponding value on the x-axis.
>
> 1. The _data-date_ attribute and its corresponding _.bar_ element should align with the corresponding value on the y-axis.
>
> 1. I can mouse over an area and see a tooltip with a corresponding _id="tooltip"_ which displays more information about the area.
>
> 1. My tooltip should have a _data-date_ property that corresponds to the _data-date_ of the active area.

### Testing tools

<em>FCC Testing CDN</em> (https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js) is provided by freeCodeCamp

## Result

All checkpoint passed!

Source code uploaded to [github](https://github.com/ndtrung-dev/bar-chart).

[Live demo](https://ndtrung-dev.github.io/bar-chart) is uploaded to github using <code>gh-pages</code>. <em>FCC Testing CDN</em> was embedded. Select <code>D3: Bar Chart</code> option from dropdown menu to verify the result.
