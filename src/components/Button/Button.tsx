import { useState } from "react";
import styles from "./Button.module.css";

export default function Button({
  title,
  colorLeft,
  colorRight,
  nameButtonLeft,
  nameButtonRight,
  functionDrop,
  isOn
}: {
  title?: string;
  colorLeft: string;
  colorRight: string;
  nameButtonLeft: string;
  nameButtonRight: string;
  isOn?:boolean,
  functionDrop: (value1: number) => {};
}) {
  // const [isOn, setIsOn] = useState<boolean>(true);
  // const changeStatus = (value: boolean) => {
  //   setIsOn(value);
  //   return;
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
        // boxShadow: "2px 3px gray",
      }}
      className="border  border-stroke bg-white "
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "8px",
          textAlign: "left",
        }}
      >
        <span style={{ color: "black", fontWeight: "500" }}>{title}</span>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className={styles.buttoncss}
          style={{
            backgroundColor: `${isOn ? colorLeft : "gray"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            // changeStatus(true);
            functionDrop(1);
          }}
        >
          <div>{nameButtonLeft}</div>
        </div>
        <div
          className={styles.buttoncss}
          style={{
            backgroundColor: `${!isOn ? colorRight : "gray"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            // changeStatus(false);
            functionDrop(0);
          }}
        >
          {nameButtonRight}
        </div>
      </div>
    </div>
  );
}
