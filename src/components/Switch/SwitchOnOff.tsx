import { useState } from "react";
import styles from "./Button.module.css";
import { getDatabase, ref, update } from "firebase/database";

export default function SwitchOnOff({ color }: { color?: string }) {
  const [isSubmit, getIsSubmit] = useState<boolean>();
  const [ischeck, setIsCheck] = useState<boolean>(false);
  const onChange = () => {
    ischeck ? updateOverrideEnableDO2() : updateOverrideEnableDO1();
  };

  const updateOverrideEnableDO1 = () => {
    const db = getDatabase();
    const updates: any = {};
    updates["/control/" + "Override Enable DO1/data"] = 1;

    updates["/control/" + "Override Value DO1/data"] = 1;

    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        setIsCheck(true);
        // notify();
        // setIsEditPointAO(false);
      })
      .catch((e) => {
        console.log(e);
        // notifyError();
      });
  };

  const updateOverrideEnableDO2 = () => {
    const db = getDatabase();
    const updates: any = {};
    updates["/control/" + "Override Enable DO2/data"] = 0;

    updates["/control/" + "Override Value DO2/data"] = 0;

    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        setIsCheck(false);
        // notify();
        // setIsEditPointAO(false);
      })
      .catch((e) => {
        console.log(e);
        // notifyError();
      });
  };


  return (
    <div
      className={!ischeck ? styles.switch : styles.switchcheck}
      onClick={() => onChange()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-power "
        className={!ischeck ? styles.icon : styles.iconcheck}
        viewBox="0 0 16 16"
      >
        <path d="M7.5 1v7h1V1z" />
        <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
      </svg>
    </div>
  );
}
