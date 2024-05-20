import { getDatabase, update, ref } from "firebase/database";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import ButtonOne from "../Button/ButtonOne";

const CardNoButton = ({ title }: { title?: string }) => {
  const [isEditEnableAO, setIsEditEnableAO] = useState<boolean>(false);
  const [enableAO, setEnabeAO] = useState<string>();
  const [isEditPointAO, setIsEditPointAO] = useState<boolean>(false);
  const [isEditPointDO, setIsEditPointDO] = useState<boolean>(false);
  const [pointAO, setPointAO] = useState<string>();
  const [pointDO, setPointDO] = useState<string>();
  const [textTampEnbleAO, setTextTampEnableAO] = useState<string>();
  const [textTampPostAO, setTextTampPostAO] = useState<string>();
  const [textTampPostDO, setTextTampPostDO] = useState<string>();
  const customId = "custom-id-yes";

  const updateEnableAO = (value: string) => {
    const db = getDatabase();
    const postData = { data: value };
    const updates: any = {};
    updates["/control/" + "enableAO"] = postData;

    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        notify();
        setIsEditEnableAO(false);
      })
      .catch((e) => {
        notifyError();
        console.log(e);
      });
  };
  const updatePointDO = (value: string) => {
    const db = getDatabase();
    const postData = { data: value };
    const updates: any = {};
    updates["/control/" + "pointDO"] = postData;

    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        notify();
        setIsEditPointDO(false);
      })
      .catch((e) => {
        notifyError();
        console.log(e);
      });
  };
  const updatePointAO = (value: string) => {
    // setPointAO(value);

    const db = getDatabase();
    const postData = { data: value };
    const updates: any = {};
    updates["/control/" + "pointAO"] = postData;

    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        notify();
        setIsEditPointAO(false);
      })
      .catch((e) => {
        console.log(e);
        notifyError();
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
      case 2:
        pointAO ? updatePointAO(pointAO) : null;
        break;
      case 3:
        pointDO ? updatePointDO(pointDO) : null;
        break;
    }
  };

  const onSubmitEdit = (id: number) => {
    switch (id) {
      case 1:
        setTextTampEnableAO(enableAO);
        setIsEditEnableAO(true);
        break;
      case 2:
        setTextTampPostAO(pointAO);
        setIsEditPointAO(true);
        break;
      case 3:
        setTextTampPostDO(pointDO);
        setIsEditPointDO(true);
        break;
    }
  };

  const onSubmitCannel = (id: number) => {
    switch (id) {
      case 1:
        setEnabeAO(textTampEnbleAO);
        setIsEditEnableAO(false);
        break;
      case 2:
        setPointAO(textTampPostAO);
        setIsEditPointAO(false);
        break;
      case 3:
        setPointDO(textTampPostDO);
        setIsEditPointDO(false);
        break;
    }
  };

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
        {title}
      </span>

      <div style={{ display: "grid", justifyContent: "space-between" }}>
        <div className=" flex  flex-col justify-center  sm:col-span-3">
          <div className=" block items-center sm:flex ">
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
              className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-1/2  rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
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
                      width="32px"
                    ></ButtonOne>
                  </div>
                  <div
                    onClick={() => onSubmitCannel(1)}
                    className="flex w-full flex-row-reverse"
                  >
                    <ButtonOne
                      title={"NO"}
                      color={"#ff5252"}
                      width="32px"
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
export default CardNoButton;
