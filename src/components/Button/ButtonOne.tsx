import styles from "./Button.module.css";
import Image from "next/image";

const ButtonOne = ({
  title,
  color,
  width,
  fuctionDrop
}: {
  title: string;
  color: string;
  width?: string;
  fuctionDrop?:any;
}) => {
  return (
    <div
      className={styles.buttoncss}
      style={{
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: width,
        height: width,
      }}
      onClick={fuctionDrop}
    >
      {title == 'NO' ?  <Image src="/close.png" alt="Image" width={50} height={50} /> : title == 'YES' ? <Image src="/check.png" alt="Image" width={16} height={16} /> : title}
     
    </div>
  );
};
export default ButtonOne;
