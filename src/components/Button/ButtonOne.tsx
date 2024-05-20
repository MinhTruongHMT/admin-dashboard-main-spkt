import styles from "./Button.module.css";

const ButtonOne = ({
  title,
  color,
  width,
}: {
  title: string;
  color: string;
  width?: string;
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
    >
      {title}
    </div>
  );
};
export default ButtonOne;
