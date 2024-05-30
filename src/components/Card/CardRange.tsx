import ButtonOne from "../Button/ButtonOne";

const CardRange = ({
  start,
  end,
  option,
}: {
  start: string;
  end: string;
  option: boolean;
}) => {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-2">
        <table className="">
            <tr> <th>CHỈNH ĐỘ SÁNG</th></tr>
          <tr>    
            <td>{start}</td>
            <td>
              <b> {" -> "} </b>
            </td>
            <td>{end}</td>
          </tr>
        </table>
        <ButtonOne title={"canel"} color={"#54EA54"} />
      </div>
    </>
  );
};
export default CardRange;
