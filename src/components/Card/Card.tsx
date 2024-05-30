"use client";
import Link from "next/link";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { get, getDatabase, onValue, ref, update } from "firebase/database";
import { toast } from "react-toastify";
import ButtonOne from "../Button/ButtonOne";
import { database } from "@/configs/filebaseConfig";

const CardOne = ({ functionDrop }: { functionDrop: (value: number) => {}}) => {
  const [textTampEnbleAO, setTextTampEnableAO] = useState<string>();
  const [isEnableAO, setIsEnableAO] = useState<boolean>(false);
  const [enableAO, setEnabeAO] = useState<string>();
  const [isEditEnableAO, setIsEditEnableAO] = useState<boolean>(false);
  const customId = "custom-id-yes";

  const updateEnableAO = (value: string) => {
    const db = getDatabase();
    const postData = { data: value };
    const updates: any = {};
    updates["/control/" + "enableAO"] = postData;

    return update(ref(db), updates)
      .then(() => {
       
        notify();
        setIsEditEnableAO(false);
      })
      .catch((e) => {
        notifyError();
        console.log(e);
      });
  };

  const notify = () =>
    toast.success("Update successfully!", {
      toastId: customId,
    });

  const notifyError = () =>
    toast.error("Update Error!", {
      toastId: customId,
    });

  const onSubmitEnter = (id: number) => {
    switch (id) {
      case 1:
        enableAO ? updateEnableAO(enableAO) : null;
        break;
    }
  };

  const onSubmitEdit = (id: number) => {
    switch (id) {
      case 1:
        setTextTampEnableAO(enableAO);
        setIsEditEnableAO(true);
        break;
    }
  };

  const onSubmitCannel = (id: number) => {
    switch (id) {
      case 1:
        setEnabeAO(textTampEnbleAO);
        setIsEditEnableAO(false);
        break;
    }
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
            (e) => e.id == "Override Enable AO 01",
          );

          const enableAO = userArray.find((e) => e.id == "enableAO");

          setEnabeAO(enableAO.data);

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

        const enableAO = userArray.find((e) => e.id == "enableAO");

        setEnabeAO(enableAO.data);
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "grid",
        boxShadow: "2px 3px gray",
        paddingLeft: "8px",
      }}
      className="border bg-white "
    >
      <span style={{ color: "black", fontWeight: "500", textAlign: "left" }}>
        Điều chỉnh % độ sáng:
      </span>

      <div className="flex flex-col">
        <Button
          colorLeft={"#54EA54"}
          colorRight={"#ff5252"}
          nameButtonLeft={"ON"}
          nameButtonRight={"OFF"}
          functionDrop={functionDrop}
          isOn={isEnableAO}
        ></Button>
        <div className=" flex  flex-col justify-center  sm:col-span-3">
          <div className="flex items-center justify-between ">
            <div className="w-1/2">
              <input
                disabled={!isEditEnableAO}
                value={enableAO}
                onInput={(e: any) => {
                  // updateEnableAO(e.target.value);
                  setEnabeAO(e.target.value);
                }}
                type="number"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full  rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex w-1/2 flex-row-reverse">
              {isEditEnableAO ? (
                <div style={{ display: "flex" }} className="flex-row">
                  <div
                    onClick={() => onSubmitEnter(1)}
                    className="flex w-full flex-row-reverse"
                  >
                    <ButtonOne
                      title={"YES"}
                      color={"#54EA54"}
                      width="45px"
                    ></ButtonOne>
                  </div>
                  <div
                    onClick={() => onSubmitCannel(1)}
                    className="flex w-full flex-row-reverse"
                  >
                    <ButtonOne
                      title={"NO"}
                      color={"#ff5252"}
                      width="45px"
                    ></ButtonOne>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => onSubmitEdit(1)}
                  className="flex w-full flex-row-reverse"
                >
                  <ButtonOne title={"EDIT"} color={"#366EE3"}></ButtonOne>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
