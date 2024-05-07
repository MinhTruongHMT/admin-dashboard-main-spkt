import { database } from "@/configs/filebaseConfig";
import { get, getDatabase, onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Switcher = () => {
  const [isEnableAO, setIsEnableAO] = useState<boolean>();
  const customId = "custom-id-yes";

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
            (e) => e.id == "Override Enable AO 01",
          );

          isEnableDO1.data == 1 ? setIsEnableAO(true) : setIsEnableAO(false);
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

        const isEnableDO1 = userArray.find(
          (e) => e.id == "Override Enable AO 01",
        );
        isEnableDO1.data == 1 ? setIsEnableAO(true) : setIsEnableAO(false);
      }
    });
  }, []);

  const notify = () =>
    toast.success("Update successfully!", {
      toastId: customId,
    });

  const notifyError = () =>
    toast.error("Update Error!", {
      toastId: customId,
    });

  const updateOverrideEnableAO01 = (enable: number) => {
    const db = getDatabase();
    const enableData = { data: enable };

    const updates: any = {};
    updates["/control/" + "Override Enable AO 01"] = enableData;

    return update(ref(db), updates)
      .then(() => {
        notify();
        // setIsEditPointAO(false);
      })
      .catch((e) => {
        console.log(e);
        notifyError();
      });
  };
  return (
    <div>
      <label
        htmlFor="toggle5"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle5"
            className="sr-only"
            onChange={() => {
              setIsEnableAO(!isEnableAO);
              isEnableAO
                ? updateOverrideEnableAO01(0)
                : updateOverrideEnableAO01(1);
            }}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-6"></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              isEnableAO == true ? "!right-1 !translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default Switcher;
