import ButtonOne from "../Button/ButtonOne";

const CardTimer = ({
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
            <tr>  {option ? <th>MỞ ĐÈN</th> : <th>TẮT ĐÈN</th>}</tr>
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
export default CardTimer;
