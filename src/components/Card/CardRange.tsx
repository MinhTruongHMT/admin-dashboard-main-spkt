import { getDatabase, ref, update } from "firebase/database";
import ButtonOne from "../Button/ButtonOne";

const CardRange = ({
  start,
  end,
  data,
}: {
  start: string;
  end: string;
  data: string;
}) => {

  const canel = () => {
    const db = getDatabase();

    const updates: any = {};
    updates["/time" + "/range" + "/isTimer"] = 0;

    return update(ref(db), updates)
      .then(() => {
      })
      .catch((e) => {
      
      });
  };
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white p-2 shadow-default dark:border-strokedark dark:bg-boxdark w-50">
        <table className="">
          <tr>
            <th>CHỈNH ĐỘ SÁNG</th>
          </tr>
          <tr className="flex justify-between">
            <td>{start}</td>
            <td>
              <b>{"->"}</b>
            </td>
            <td>{end}</td>
          </tr>
          <tr>{data} %</tr>
        </table>
        <ButtonOne title={"canel"} color={"#54EA54"} fuctionDrop={canel} />
      </div>
    </>
  );
};
export default CardRange;
