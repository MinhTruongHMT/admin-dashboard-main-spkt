import ButtonOne from "../Button/ButtonOne";
import { useAppContext } from "@/providers/MyProvider";
import { useEffect, useState } from "react";
import TimePikerOne from "../TimePiker/TimePiker";
import Range from "../Range/Range";
import { Database, get, getDatabase, onValue, ref, update } from "firebase/database";
import { database } from "@/configs/filebaseConfig";
import CardTimer from "../Card/CardTimer";

const DialogChirend = () => {
  const starCountRef = ref(database, "time");

  const { setOnDialog } = useAppContext();
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [cheDo, SetCheDo] = useState<boolean>();
  const changeDialog = () => {
    setOnDialog(false);
  };

  const updateHenGio = (start: any, end: any, option: any) => {
    // setPointAO(value);

    const db = getDatabase();
    const updates: any = {};
    updates["/time" + "/times"+'/timeStart'] = start;
    updates["/time" + "/times"+'/timeEnd'] = end;
    updates["/time/" + "times/option"] = option;
    updates['/time' + '/times' + '/isTimer'] = 1;
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
          // notify();
          // notify();

          const datCamBien1 = userArray.find((e) => e.id == "CAMBIEN1");
          const datCamBien2 = userArray.find((e) => e.id == "CAMBIEN2");
          const brightData = userArray.find((e) => e.id == "Relay Output 2");
          const operationModeData = userArray.find(
            (e) => e.id == "Relay Output 1",
          );
          const datalampBrightness = userArray.find(
            (e) => e.id == "Analog Output 01",
          );

          // setCamBien1(datCamBien1.data);
          // setCamBien2(datCamBien2.data);
          // setBright(brightData.data);
          // setOperationMode(operationModeData.data);
          // setLampBrightness(datalampBrightness.data);
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
        const datCamBien1 = userArray.find((e) => e.id == "CAMBIEN1");
        const datCamBien2 = userArray.find((e) => e.id == "CAMBIEN2");
        const brightData = userArray.find((e) => e.id == "Relay Output 2");
        const operationModeData = userArray.find(
          (e) => e.id == "Relay Output 1",
        );
        const datalampBrightness = userArray.find(
          (e) => e.id == "Analog Output 01",
        );

        // setCamBien1(datCamBien1.data);
        // setCamBien2(datCamBien2.data);
        // setBright(brightData.data);
        // setOperationMode(operationModeData.data);
        // setLampBrightness(datalampBrightness.data);
      }
    });
  }, []);

  return (
    <>
      {/* transform: translate(-50%, -50%) */}
      <div
        className="flex -translate-x-1/2  -translate-y-1/2 flex-col  justify-between p-2 text-center "
        style={{
          position: "absolute",
          zIndex: "99999",
          backgroundColor: "white",
          width: "1080px",
          height: "700px",
          top: "50%",
          left: "50%",
          borderRadius: "8px",
        }}
      >
        <h3 className="font-medium">LỊCH TRÌNH CHIẾU SÁNG</h3>
        <div className="border p-2 text-left">
         <CardTimer start={"12:12:pm"} end={"12:11:pm"} option={true}></CardTimer>
        </div>
        <div className="w-full">
          <TimePikerOne
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            SetCheDo={SetCheDo}
            updateHenGio={updateHenGio}
          />
        </div>
        <div className="border">
          <Range />
        </div>
        <div className="m-1 flex flex-row-reverse">
          <div
            onClick={() => {
              changeDialog();
            }}
          >
            <ButtonOne title={"OK"} color={"green"}></ButtonOne>
          </div>
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
