import { useEffect, useState } from "react";
import styles from "./Button.module.css";
import { get, getDatabase, onValue, ref, update } from "firebase/database";
import { database } from "@/configs/filebaseConfig";
import { toast } from "react-toastify";

export default function SwitchOnOff({ color }: { color?: string }) {
  const [ischeck, setIsCheck] = useState<boolean>(false);
  const customId = "custom-id-yes";

  const onChange = () => {
    ischeck ? updateOverrideEnableDO2(0) : updateOverrideEnableDO2(1);
  };

  const notify = () =>
    toast.success("Update successfully!", {
      toastId: customId,
    });

  const notifyError = () =>
    toast.error("Update Error!", {
      toastId: customId,
    });
 
  const updateOverrideEnableDO2 = (value:number) => {
    const db = getDatabase();
    const updates: any = {};
    updates["/control/" + "Override Enable DO2/data"] = value;

    updates["/control/" + "Override Value DO2/data"] = value;

    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        notify();
        setIsCheck(!ischeck)
        // notify();
        // setIsEditPointAO(false);
      })
      .catch((e) => {
        notifyError();
        console.log(e);
        // notifyError();
      });
  };


  useEffect(() => {
    const usersRef = ref(database, "control");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(
            ([id, data]: any) => ({
              id,
              ...data,
            }),
          );
 
          const isEnableDO1 = userArray.find(
            (e) => e.id == "Override Enable DO2",
          );

          isEnableDO1.data == 1 ? setIsCheck(true) : setIsCheck(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
      onValue(usersRef, (snapshot) => {
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(
            ([id, data]: any) => ({
              id,
              ...data,
            }),
          );
  
          const isEnableDO1 = userArray.find((e) => e.id == "Override Enable DO2");
          isEnableDO1.data == 1 ? setIsCheck(true) : setIsCheck(false);
        }
      });
  }, []);

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
        // class="bi bi-power "
        className={!ischeck ? styles.icon : styles.iconcheck}
        viewBox="0 0 16 16"
      >
        <path d="M7.5 1v7h1V1z" />
        <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
      </svg>
    </div>
  );
}
