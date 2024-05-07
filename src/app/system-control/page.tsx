"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { database } from "@/configs/filebaseConfig";
import { useEffect, useState } from "react";
import {
  get,
  push,
  ref,
  getDatabase,
  set,
  onValue,
  child,
  update,
} from "firebase/database";
import Link from "next/link";
import Loader from "@/components/common/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SwitcherFour from "@/components/Switchers/SwitcherFour";
import SwitchOnOff from "@/components/Switch/SwitchOnOff";

// interface IuserData {
//   pointAO: number;
//   pointDO: number;
//   enabeleAO: number;
// }

export default function Page() {
  const [textTampEnbleAO, setTextTampEnableAO] = useState<string>();
  const [textTampPostAO, setTextTampPostAO] = useState<string>();
  const [textTampPostDO, setTextTampPostDO] = useState<string>();

  const [pointAO, setPointAO] = useState<string>();
  const [pointDO, setPointDO] = useState<string>();
  const [enableAO, setEnabeAO] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditEnableAO, setIsEditEnableAO] = useState<boolean>(false);
  const [isEditPointAO, setIsEditPointAO] = useState<boolean>(false);
  const [isEditPointDO, setIsEditPointDO] = useState<boolean>(false);
  const [isEnable, setIsEnable] = useState<boolean>(false);
  const [isEnableBright, setisEnableBright] = useState<boolean>(false);

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
          // notify();
          setLoading(false);
          // notify();

          const dataPointAO = userArray.find((e) => e.id == "pointAO");
          const dataPointDO = userArray.find((e) => e.id == "pointDO");
          const dataEnabeAO = userArray.find((e) => e.id == "enableAO");
          const isEnableDO1 = userArray.find(
            (e) => e.id == "Override Enable DO1",
          );
          const isValueDO1 = userArray.find(
            (e) => e.id == "Override Value DO1",
          );

          setPointAO(dataPointAO.data);
          setPointDO(dataPointDO.data);
          setEnabeAO(dataEnabeAO.data);
          isEnableDO1.data == 1 ? setIsEnable(true) : setIsEnable(false);
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

        const dataPointAO = userArray.find((e) => e.id == "pointAO");
        const dataPointDO = userArray.find((e) => e.id == "pointDO");
        const dataEnabeAO = userArray.find((e) => e.id == "enableAO");
        const isEnableDO1 = userArray.find(
          (e) => e.id == "Override Enable DO1",
        );
        const isValueDO1 = userArray.find((e) => e.id == "Override Value DO1");

        setPointAO(dataPointAO.data);
        setPointDO(dataPointDO.data);
        setEnabeAO(dataEnabeAO.data);
        isEnableDO1.data == 1 ? setIsEnable(true) : setIsEnable(false);
      }
    });
  }, []);

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

  const updateOverrideEnableDO1 = (enable: number, value: number) => {
    const db = getDatabase();
    const enableData = { data: enable };
    const valueData = { data: value };

    const updates: any = {};
    updates["/control/" + "Override Enable DO1"] = enableData;

    updates["/control/" + "Override Value DO1"] = valueData;

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

  const notify = () =>
    toast.success("Update successfully!", {
      toastId: customId,
    });

  const notifyError = () =>
    toast.error("Update Error!", {
      toastId: customId,
    });

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="ĐIỀU KHIỂN HỆ THỐNG" />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {loading ? (
          <Loader />
        ) : (
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex-column m-5  flex items-center justify-center sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-gray-900 block text-sm text-xl font-black font-medium leading-6"
                >
                  Chọn chế độ :
                </label>
                <div className="flex-column ml-3 flex items-center gap-5">
                  <h5>MANUAL</h5>
                  <div>
                    <SwitcherFour
                      onChangeRegime={updateOverrideEnableDO1}
                      isEnable={isEnable}
                    />
                  </div>
                  <h5>AUTO</h5>
                </div>
              </div>
              <div className="flex-column m-5  flex items-center  sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-gray-900 block text-sm text-xl font-black font-medium leading-6"
                >
                  Bật/ tắt đèn
                </label>
                <div className="flex-column ml-3 flex items-center gap-5">
                  <SwitchOnOff />
                </div>
              </div>
            </div>
            <div>
              <div className="m-5 flex  flex-col justify-center  sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-gray-900 block text-sm text-xl font-black font-medium leading-6"
                >
                  Tăng / giảm độ sáng (%)
                </label>
                <div className="mt-2 flex items-center">
                  <label
                    htmlFor="first-name"
                    className="text-gray-900 block text-sm text-xl font-black font-medium leading-6"
                  >
                    NHẬP GIÁ TRỊ (%):
                  </label>
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
                    className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {isEditEnableAO ? (
                    <>
                      <Link
                        onClick={() => onSubmitEnter(1)}
                        href="#"
                        className="ml-2 inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                      >
                        Xác Nhận
                      </Link>
                      <Link
                        onClick={() => onSubmitCannel(1)}
                        href="#"
                        className="ml-2 inline-flex items-center justify-center rounded-md bg-meta-8 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-12"
                      >
                        Đóng
                      </Link>
                    </>
                  ) : (
                    <Link
                      onClick={() => onSubmitEdit(1)}
                      href="#"
                      className="ml-2 inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-6 px-5 py-2  text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      {/* <span>
                      <img src="setting-40.svg" alt="" />
                    </span> */}
                      EDIT
                    </Link>
                  )}
                </div>
              </div>
              <div className="m-5 flex  flex-col justify-center sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-gray-900 block text-sm text-xl font-black font-medium leading-6"
                >
                  Nhập setpoint AO
                </label>
                <div className="mt-2 flex items-center">
                  <label
                    htmlFor="first-name"
                    className="text-gray-900 block text-sm text-xl font-black font-medium leading-6"
                  >
                    NHẬP GIÁ TRỊ (%):
                  </label>
                  <input
                    disabled={!isEditPointAO}
                    value={pointAO}
                    onInput={(e: any) => {
                      // updatePointAO(e.target.value);
                      setPointAO(e.target.value);
                    }}
                    type="number"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {isEditPointAO ? (
                    <>
                      <Link
                        onClick={() => onSubmitEnter(2)}
                        href="#"
                        className="ml-2 inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                      >
                        Xác Nhận
                      </Link>
                      <Link
                        onClick={() => onSubmitCannel(2)}
                        href="#"
                        className="ml-2 inline-flex items-center justify-center rounded-md bg-meta-8 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-12"
                      >
                        Đóng
                      </Link>
                    </>
                  ) : (
                    <Link
                      onClick={() => onSubmitEdit(2)}
                      href="#"
                      className="ml-2 inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-6 px-5 py-2  text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      {/* <span>
                      <img src="setting-40.svg" alt="" />
                    </span> */}
                      EDIT
                    </Link>
                  )}
                </div>
              </div>
              <div className="m-5 flex  flex-col justify-center sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-gray-900 block text-sm text-xl font-black font-medium leading-6"
                >
                  Nhập setpoint DO
                </label>
                <div className="mt-2 flex items-center">
                  <label
                    htmlFor="first-name"
                    className="text-gray-900 block text-sm text-xl font-black font-medium leading-6"
                  >
                    NHẬP GIÁ TRỊ (%):
                  </label>
                  <input
                    disabled={!isEditPointDO}
                    value={pointDO}
                    onInput={(e: any) => {
                      // updatePointDO(e.target.value);
                      setPointDO(e.target.value);
                    }}
                    type="number"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {isEditPointDO ? (
                    <>
                      <Link
                        onClick={() => onSubmitEnter(3)}
                        href="#"
                        className="ml-2 inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                      >
                        Xác Nhận
                      </Link>
                      <Link
                        onClick={() => onSubmitCannel(3)}
                        href="#"
                        className="ml-2 inline-flex items-center justify-center rounded-md bg-meta-8 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-12"
                      >
                        Đóng
                      </Link>
                    </>
                  ) : (
                    <Link
                      onClick={() => onSubmitEdit(3)}
                      href="#"
                      className="ml-2 inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-6 px-5 py-2  text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      {/* <span>
                      <img src="setting-40.svg" alt="" />
                    </span> */}
                      EDIT
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </DefaultLayout>
    </>
  );
}
function notify() {
  throw new Error("Function not implemented.");
}
