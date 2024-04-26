"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import LinePlot from "@/components/LinePlot/LinePlot";
import * as d from "d3";
import React from "react";
import { useState } from "react";

export default function LinedPlot() {
  const [data, setData] = useState<any>(() => d.ticks(-2, 2, 200).map(Math.sin));
  function onMouseMove(event: any) {
    console.log(data)
    const [x, y] = d.pointer(event);
    setData(data.slice(-200).concat(Math.atan2(x, y)));
    
  }
  return (
    <DefaultLayout>
      <div
        style={{border:'1px solid red', width: 1000, height: 1000 }}
        onMouseMove={onMouseMove}
      >
        <LinePlot data={data} />
      </div>
    </DefaultLayout>
  );
}
