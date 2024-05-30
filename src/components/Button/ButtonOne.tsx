import styles from "./Button.module.css";

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
      {title}
    </div>
  );
};
export default ButtonOne;
