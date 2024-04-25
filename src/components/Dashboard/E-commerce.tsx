"use client";
import React, { useEffect } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import MapOne from "../Maps/MapOne";
import "@passageidentity/passage-elements/passage-auth";
import "@passageidentity/passage-elements/passage-login";
import { PassageFlex } from "@passageidentity/passage-flex-js";
import Auth from "../Auth/Auth";

const ECommerce: React.FC = () => {
  // useEffect(() => {
  //   console.log(process.env.REACT_APP_PASSAGE_APP_ID);
  //   require("@passageidentity/passage-elements/passage-auth");
  // }, []);
  return (
    <>
      {/* <div>
        <passage-auth app-id={"W90YV0vFkNEmjFIfm7ZuKapc"}></passage-auth>
      </div> */}
      <Auth/>
    </>
  );
};

export default ECommerce;
