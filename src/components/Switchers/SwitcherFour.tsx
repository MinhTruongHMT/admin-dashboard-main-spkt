import { database } from "@/configs/filebaseConfig";
import { get, onValue, ref } from "firebase/database";
import { truncate } from "fs";
import { useEffect, useState } from "react";
// import { Props } from "react-apexcharts";

interface Props {
  onChangeRegime: (enanble: number, value: number) => void;
  isEnable: boolean;
}
const SwitcherFour: React.FC<Props> = ({ onChangeRegime }) => {
  const [isEnable, setIsEnable] = useState<boolean>();

  useEffect(() => {
    const usersRef = ref(database, "control");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(
            ([id, data]: any) => ({
              id,
              ...data,
            }),
          );
 
          const isEnableDO1 = userArray.find(
            (e) => e.id == "Override Enable DO1",
          );

          isEnableDO1.data == 1 ? setIsEnable(true) : setIsEnable(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
      onValue(usersRef, (snapshot) => {
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(
            ([id, data]: any) => ({
              id,
              ...data,
            }),
          );
  
          const isEnableDO1 = userArray.find((e) => e.id == "Override Enable DO1");
          isEnableDO1.data == 1 ? setIsEnable(true) : setIsEnable(false);
        }
      });
  }, []);

  return (
    <div>
      <label
        htmlFor="toggle4"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle4"
            className="sr-only"
            onChange={() => {
              setIsEnable(!isEnable);
              isEnable ? onChangeRegime(0, 0) : onChangeRegime(1, 1);
            }}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-6"></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              isEnable == true ? "!right-1 !translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherFour;
