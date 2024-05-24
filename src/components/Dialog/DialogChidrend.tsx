import ButtonOne from "../Button/ButtonOne";
import { useAppContext } from "@/providers/MyProvider";
import { useState } from "react";
import TimePikerOne from "../TimePiker/TimePiker";
import Range from "../Range/Range";

const DialogChirend = () => {
  const { setOnDialog } = useAppContext();
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const changeDialog = () => {
    setOnDialog(false);
  };
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
        <div className="border text-left p-2">
          <h4>INFO</h4>
          <table>
            <tr>
              <th>MỞ ĐÈN</th>
              <td>{timeStart}</td>
              <td> <b>-</b></td>
              <td>{timeEnd}</td>
            </tr>
            <tr>
              <th>TẮT ĐÈN</th>
              <td>05:12</td>
              <td> <b>-</b></td>
              <td>06:12 AM</td>
            </tr>
          </table>
        </div>
        <div className="w-full"><TimePikerOne setTimeStart={setTimeStart} setTimeEnd={setTimeEnd} /></div>
        <div className="border">
      <Range/>
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
