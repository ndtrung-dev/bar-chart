import { useEffect, useMemo, useState } from "react";
import "./App.css";
import * as d3 from "d3";

const DATA_URL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const WIDTH = 900;
const HEIGHT = 400;
const TOOLTIP_WIDTH = 90;
const TOOLTIP_HEIGHT = 22;
const MARGIN = 60;

function formatTime(time) {
  return new Date(...time.split("-"));
}

function App() {
  const [data, setData] = useState(undefined);
  const [scale, setScale] = useState({ x: undefined, y: undefined });

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((d) => {
        setData(d.data);
        setScale({
          x: d3
            .scaleTime()
            .range([0, WIDTH])
            .domain([formatTime(d.from_date), formatTime(d.to_date)]),
          y: d3
            .scaleLinear()
            .range([HEIGHT, 0])
            .domain([0, d3.max(d.data, (i) => Math.ceil(i[1] / 2000) * 2000)]),
        });
      })
      .catch((err) => console.error(err));
  }, []);

  useMemo(() => {
    if (data && !document.getElementById("#chart")) {
      const svg = d3
        .select("#chart-wrapper")
        .append("svg")
        .attr("id", "chart")
        .attr("width", WIDTH + MARGIN * 2)
        .attr("height", HEIGHT + MARGIN * 2)
        .attr("style", "position:relative");

      //horizontal axis
      svg
        .append("g")
        .attr("id", "x-axis")
        .call(d3.axisBottom(scale.x).tickFormat(d3.timeFormat("%Y")).ticks(12))
        .attr("transform", `translate(${MARGIN},${HEIGHT + MARGIN})`);

      //vertical axis
      svg
        .append("g")
        .attr("id", "y-axis")
        .call(d3.axisLeft(scale.y))
        .attr("transform", `translate(${MARGIN},${MARGIN})`);

      //bars setting
      const bar = svg
        .selectAll()
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("data-date", (d) => d[0])
        .attr("data-gdp", (d) => d[1])
        .attr("height", (d) => HEIGHT - scale.y(d[1]))
        .attr("width", WIDTH / data.length)
        .attr("x", (d) => MARGIN + scale.x(formatTime(d[0])))
        .attr("y", (d) => MARGIN + scale.y(d[1]))
        .attr("style", "fill: #f38986");

      //tooltip
      const tooltip = d3
        .select("#chart-wrapper")
        .append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("display", "none")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("width", TOOLTIP_WIDTH)
        .style("height", TOOLTIP_HEIGHT)
        .style("text-align", "center")
        .style("padding", "5px");

      tooltip
        .on("mousemove", () => {
          tooltip.style("display", "none");
        })
        .on("mouseover", () => {
          tooltip.style("display", "none");
        });

      //mouseover
      bar
        .on("mouseover", (e) => {
          e.preventDefault();
          const tempDate = e.target.attributes["data-date"].value;
          const date = new Date(tempDate);
          tooltip
            .attr("data-date", tempDate)
            .html(
              `Q${Math.ceil(date.getMonth() / 4) + 1}/${date.getFullYear()}`
            )
            .style("display", "block");

          e.target.classList.add("active");
          d3.select(".active").style("stroke", "grey").style("fill", "#f31916");
        })
        .on("mousemove", (e) => {
          e.preventDefault();
          tooltip
            .style(
              "left",
              e.clientX + MARGIN + 20 + TOOLTIP_WIDTH > window.innerWidth
                ? e.clientX - 20 - TOOLTIP_WIDTH + "px"
                : e.clientX + 20 + "px"
            )
            .style("top", e.clientY - 20 + "px");
        })
        .on("mouseleave", (e) => {
          e.preventDefault();
          tooltip.style("display", "none");
          d3.selectAll(".bar").style("stroke", "none").style("fill", "#f38986");
          e.target.classList.remove("active");
        });
    }
  }, [data, scale]);

  return (
    <div className="screen">
      <div className="main">
        <h1 id="title">United States GDP</h1>
        <div id="chart-wrapper"></div>
      </div>
    </div>
  );
}

export default App;
