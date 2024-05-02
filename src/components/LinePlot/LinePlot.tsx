"use client";
import * as d3 from "d3";

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}: {
  data?: any;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}) {
  // const x = d3.scaleLinear(
  //   [0, data.length - 1],
  //   [marginLeft, width - marginRight],
  // );
  // const y = d3.scaleLinear(
  //   d3.extent(data),
  //   [height - marginBottom, marginTop],
  // );
  // const line = d3.line((d, i) => x(i), y);
  // return (
  //   <svg width={width} height={height}>
  //     <path
  //       fill="none"
  //       stroke="currentColor"
  //       stroke-width="1.5"
  //       d={line(data)}
  //     />
  //     <g fill="white" stroke="currentColor" stroke-width="1.5">
  //       {data.map((d, i) => (
  //         <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
  //       ))}
  //     </g>
  //   </svg>
  // );
}

// import * as React from "react";
// import * as d3 from "d3";

// function LinePlot() {
//   const data = [7, 5, 6, 6, 9, 10];
//   const width = 640;
//   const height = 400;
//   const marginTop = 20;
//   const marginRight = 20;
//   const marginBottom = 20;
//   const marginLeft = 20;

//   const extents = d3.extent(data) || [0, 0];
//   const x = d3.scaleLinear(
//     [0, data.length - 1],
//     [marginLeft, width - marginRight],
//   );
//   const y = d3.scaleLinear(
//     [0, data.length - 1],
//     [height - marginBottom, marginTop],
//   );
//   const line = d3.line((d, i) => x(i), y);
//   return (
//     <svg width={width} height={height}>
//       <path
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         d={line(data)}
//       />
//       <g fill="white" stroke="currentColor" strokeWidth="1.5">
//         {data.map((d, i) => (
//           <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
//         ))}
//       </g>
//     </svg>
//   );
// }

// function drawChart(svgRef: React.RefObject<SVGSVGElement>) {
//   const data = [7, 5, 6, 6, 9, 10];
//   const h = 120;
//   const w = 250;
//   const svg = d3.select(svgRef.current);

//   svg
//     .attr("width", w)
//     .attr("height", h)
//     .style("margin-top", 50)
//     .style("margin-left", 50);

//   svg
//     .selectAll("rect")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("x", (d, i) => i * 40)
//     .attr("y", (d, i) => h - 10 * d)
//     .attr("width", 20)
//     .attr("height", (d, i) => d * 10)
//     .attr("fill", "steelblue");
// }

// const Chart: React.FunctionComponent = () => {
//   const svg = React.useRef<SVGSVGElement>(null);

//   React.useEffect(() => {
//     // drawChart(svg);
//     LinePlot();
//   }, [svg]);

//   return (
//     <div id="chart">
//       <svg ref={svg} />
//     </div>
//   );
// };

// export default Chart;
