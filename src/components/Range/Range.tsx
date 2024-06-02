"use client";
import { useAppContext } from "@/providers/MyProvider";
import { getDatabase, ref, update } from "firebase/database";
import { useState } from "react";
import moment from "moment";
import ButtonOne from "../Button/ButtonOne";
import styles from "./Range.module.css";
import { toast } from "react-toastify";

export default function Range({
  setTimeStart,
  setTimeEnd,
}: {
  setTimeStart?: any;
  setTimeEnd?: any;
}) {
  const [selectedOption, setSelectedOption] = useState<string>("00");
  const [selectedMinute, setSelectedMinute] = useState<string>("00");

  const [selectedOption1, setSelectedOption1] = useState<string>("00");
  const [selectedMinute1, setSelectedMinute1] = useState<string>("00");

  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [isOptionSelected2, setIsOptionSelected2] = useState<boolean>(false);

  const [isCheckedOn, setIsCheckedOn] = useState<boolean>(false);
  const [isCheckedOff, setIsCheckedOff] = useState<boolean>(false);

  const [valueRange, setValueRange] = useState("0");

  const Minute: string[] = [];
  const Hour: string[] = [];
  const customId = "custom-id-yes";


  for (let i = 0; i < 60; i++) {
    Minute.push(i.toString().padStart(2, "0"));
  }
  for (let i = 0; i < 24; i++) {
    Hour.push(i.toString().padStart(2, "0"));
  }

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const updateHenGio = (start: any, end: any, option: any) => {
    // setPointAO(value);
    const db = getDatabase();
    // const postData = { data: value };
    const updates: any = {};
    updates["/time" + "/range" + "/timeStart"] = start;
    updates["/time/" + "/range" + "/timeEnd"] = end;
    updates["/time/" + "/range" + "/data"] = valueRange;
    updates["/time/" + "/range" + "/isTimer"] = 1;
    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        // notify();
        // setIsEditPointAO(false);
      })
      .catch((e) => {
        console.log(e);
        // notifyError();
      });
  };

  const updateRange = () => {
    updateHenGio(
      Number(selectedOption) + ":" + Number(selectedMinute),
      Number(selectedOption1) + ":" + Number(selectedMinute1),
      valueRange,
    )
  };

  return (
    <div className={styles.range}>
      
      <div className="flex justify-between border p-2">
        <div className="w-[50px]">{valueRange || 50}%</div>
        <div className="">
          <input
            type="range"
            id="vol"
            name="vol"
            min="0"
            max="100"
            value={valueRange}
            onChange={(value: any) => setValueRange(value.target.value)}
          />
        </div>
        <div>
          <div className="">
            <label className="mb-2 block pl-4 pr-4 text-sm font-medium text-black dark:text-white">
              THỜI GIAN BẮT ĐẦU
            </label>
            <div className="relative z-20 mb-5 bg-white dark:bg-form-input">
              <div className="flex items-center">
                <select
                  value={selectedOption}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                    changeTextColor();
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-2 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    isOptionSelected ? "text-black dark:text-white" : ""
                  }`}
                >
                  {Hour.map((e) => {
                    return (
                      <option
                        key={e}
                        value={e}
                        className="text-body dark:text-bodydark"
                      >
                        {e}
                      </option>
                    );
                  })}
                </select>
                :
                <span className="absolute left-10 top-1/2 z-10 -translate-y-1/2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill="#637381"
                      ></path>
                    </g>
                  </svg>
                </span>
                <select
                  value={selectedMinute}
                  onChange={(e) => {
                    setSelectedMinute(e.target.value);
                    changeTextColor();
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-2 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    isOptionSelected2 ? "text-black dark:text-white" : ""
                  }`}
                >
                  {Minute.map((e) => {
                    return (
                      <option
                        key={e}
                        value={e}
                        className="text-body dark:text-bodydark"
                      >
                        {e}
                      </option>
                    );
                  })}
                </select>
                <span className="absolute right-5 top-1/2 z-10 -translate-y-1/2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill="#637381"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <label className="mb-2 block pl-4 pr-4 text-sm font-medium text-black dark:text-white">
              THỜI GIAN KẾT THÚC
            </label>
            <div className="relative z-20 bg-white dark:bg-form-input">
              <div className="flex items-center">
                <select
                  value={selectedOption1}
                  onChange={(e) => {
                    setSelectedOption1(e.target.value);
                    changeTextColor();
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-2 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    isOptionSelected ? "text-black dark:text-white" : ""
                  }`}
                >
                  {Hour.map((e) => {
                    return (
                      <option
                        key={e}
                        value={e}
                        className="text-body dark:text-bodydark"
                      >
                        {e}
                      </option>
                    );
                  })}
                </select>
                :
                <span className="absolute left-10 top-1/2 z-10 -translate-y-1/2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill="#637381"
                      ></path>
                    </g>
                  </svg>
                </span>
                <select
                  value={selectedMinute1}
                  onChange={(e) => {
                    setSelectedMinute1(e.target.value);
                    changeTextColor();
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-2 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    isOptionSelected2 ? "text-black dark:text-white" : ""
                  }`}
                >
                  {Minute.map((e) => {
                    return (
                      <option
                        key={e}
                        value={e}
                        className="text-body dark:text-bodydark"
                      >
                        {e}
                      </option>
                    );
                  })}
                </select>
                <span className="absolute right-5 top-1/2 z-10 -translate-y-1/2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill="#637381"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <ButtonOne
          title={"YES"}
          color={"#54EA54"}
          width="45px"
          fuctionDrop={updateRange}
        ></ButtonOne>
      </div>
    </div>
  );
}
