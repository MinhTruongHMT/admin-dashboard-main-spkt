import ButtonOne from "../Button/ButtonOne";
import { useAppContext } from "@/providers/MyProvider";
import { useEffect, useState } from "react";
import TimePikerOne from "../TimePiker/TimePiker";
import Range from "../Range/Range";
import {
  Database,
  get,
  getDatabase,
  onValue,
  ref,
  update,
} from "firebase/database";
import { database } from "@/configs/filebaseConfig";
import CardTimer from "../Card/CardTimer";
import CardRange from "../Card/CardRange";
import styles from "./Range.module.css";

interface IRange {
  id: string;
  data: string;
  isTimer: number;
  timeEnd: string;
  timeStart: string;
}

interface ITime {
  id: string;
  data: string;
  option: number;
  isTimer: number;
  timeEnd: string;
  timeStart: string;
}
const DialogChirend = () => {
  const starCountRef = ref(database, "time");

  const { setOnDialog } = useAppContext();
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [cheDo, SetCheDo] = useState<boolean>();
  const [time, setTime] = useState<ITime>();
  const [range, setRange] = useState<IRange>();

  const changeDialog = () => {
    setOnDialog(false);
  };

  const updateHenGio = (start: any, end: any, option: any) => {
    // setPointAO(value);

    const db = getDatabase();
    const updates: any = {};
    updates["/time" + "/times" + "/timeStart"] = start;
    updates["/time" + "/times" + "/timeEnd"] = end;
    updates["/time/" + "times/option"] = option;
    updates["/time" + "/times" + "/isTimer"] = 1;
    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        // notify();
        // setIsEditPointAO(false);
      })
      .catch((e) => {
        console.log(e);
        // notifyError();add
      });
  };

  useEffect(() => {
    const starCountRef = ref(database, "time");
    get(starCountRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(
            ([id, data]: any) => ({
              id,
              ...data,
            }),
          );

          const range = userArray.find((e) => e.id == "range");
          const time = userArray.find((e) => e.id == "times");
          setTime(time);
          setRange(range);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const userArray = Object.entries(snapshot.val()).map(
          ([id, data]: any) => ({
            id,
            ...data,
          }),
        );
        const range = userArray.find((e) => e.id == "range");
        const time = userArray.find((e) => e.id == "times");
        setTime(time);
        setRange(range);
      }
    });
  }, []);

  return (
    <>
      {/* transform: translate(-50%, -50%) */}
      <div
        className="flex -translate-x-1/2  -translate-y-1/2 flex-col  justify-between p-4 text-center "
        style={{
          position: "absolute",
          zIndex: "99999",
          backgroundColor: "white",
          width: "600px",
          height: "700px",
          top: "50%",
          left: "50%",
          borderRadius: "8px",
        }}
      >
        <h3 className="font-medium">LỊCH TRÌNH CHIẾU SÁNG</h3>
        {time?.isTimer == 1 || range?.isTimer == 1 ? (
          <div className={styles.range}>
            <div className="flex gap-5 border p-2 text-left">
              {time?.isTimer == 1 ? (
                <CardTimer
                  start={time.timeStart}
                  end={time.timeEnd}
                  option={time.option}
                ></CardTimer>
              ) : (
                <></>
              )}
              {range?.isTimer == 1 ? (
                <CardRange
                  start={range.timeStart}
                  end={range.timeEnd}
                  data={range.data}
                ></CardRange>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="w-full">
          <TimePikerOne
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            SetCheDo={SetCheDo}
            updateHenGio={updateHenGio}
          />
        </div>
        <div className={styles.range}>
          <Range />
        </div>
        <div className="m-1 flex flex-row-reverse">
          <div
            onClick={() => {
              changeDialog();
            }}
          >
            <ButtonOne title={"Cannel"} color={"#366EE3"}></ButtonOne>
          </div>
        </div>
      </div>
    </>
  );
};

export default DialogChirend;
