import { getDatabase, ref, update } from "firebase/database";
import ButtonOne from "../Button/ButtonOne";

const CardTimer = ({
  start,
  end,
  option,

}: {
  start: string;
  end: string;
  option: number;
}) => {


  const canel = () => {
    const db = getDatabase();

    const updates: any = {};
    updates["/time" + "/times" + "/isTimer"] = 0;

    return update(ref(db), updates)
      .then(() => {
      })
      .catch((e) => {
      
      });
  };
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-2 w-50 flex flex-col justify-between">
        <table className="">
            <tr>  {option == 1 ? <th>MỞ ĐÈN</th> : <th>TẮT ĐÈN</th>}</tr>
          <tr className="flex  gap-8">    
            <td>{start}</td>
            <td>
              <b> {" -> "} </b>
            </td>
            <td>{end}</td>
          </tr>
        </table>
        {""}
        <ButtonOne title={"canel"} color={"#54EA54"} fuctionDrop={canel} />
      </div>
    </>
  );
};
export default CardTimer;
