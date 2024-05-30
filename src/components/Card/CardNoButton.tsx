import { getDatabase, update, ref, get, onValue } from "firebase/database";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonOne from "../Button/ButtonOne";
import { database } from "@/configs/filebaseConfig";

const CardNoButton = ({ title, id }: { title?: string; id: number }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>();

  const [isEditPointAO, setIsEditPointAO] = useState<boolean>(false);
  const [isEditPointDO, setIsEditPointDO] = useState<boolean>(false);
  const [pointAO, setPointAO] = useState<string>();
  const [pointDO, setPointDO] = useState<string>();
  const [textTamp, setTextTamp] = useState<string>();

  const customId = "custom-id-yes";

  const updatePointDO = (value: string) => {
    const db = getDatabase();
    const postData = { data: value };
    const updates: any = {};
    updates["/control/" + "pointDO"] = postData;

    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        notify();
        setIsEdit(false);
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
        setIsEdit(false);
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
      case 2:
        value ? updatePointAO(value) : null;
        break;
      case 3:
        value ? updatePointDO(value) : null;
        break;
    }
  };

  const onSubmitEdit = () => {
    setTextTamp(value);
    setIsEdit(true);
  };

  const onSubmitCannel = () => {
    setValue(textTamp);
    setIsEdit(false);
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

          if (id == 2) {
            const dataPointAO = userArray.find((e) => e.id == "pointAO");
            setValue(dataPointAO.data);
          } else if (id == 3) {
            const dataPointDO = userArray.find((e) => e.id == "pointDO");

            setValue(dataPointDO.data);
          }
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

        if (id == 2) {
          const dataPointAO = userArray.find((e) => e.id == "pointAO");
          setValue(dataPointAO.data);
        } else if (id == 3) {
          const dataPointDO = userArray.find((e) => e.id == "pointDO");

          setValue(dataPointDO.data);
        }
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
        {title}
      </span>

      <div style={{ display: "grid", justifyContent: "space-between" }}>
        <div className=" flex  flex-col justify-center  sm:col-span-3">
          <div className=" block items-center sm:flex ">
            <input
              disabled={!isEdit}
              value={value}
              onInput={(e: any) => {
                // updateEnableAO(e.target.value);
                setValue(e.target.value);
              }}
              type="number"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-1/2  rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="flex w-1/2 flex-row-reverse">
              {isEdit ? (
                <div style={{ display: "flex" }} className="flex-row">
                  <div
                    onClick={() => onSubmitEnter(id)}
                    className="flex w-full flex-row-reverse"
                  >
                    <ButtonOne
                      title={"YES"}
                      color={"#54EA54"}
                      width="45px"
                    ></ButtonOne>
                  </div>
                  <div
                    onClick={() => onSubmitCannel()}
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
                  onClick={() => onSubmitEdit()}
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
