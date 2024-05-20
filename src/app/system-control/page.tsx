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
import Switcher from "@/components/Switch/Switcher";

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
  const [isEnableAO, setIsEnableAO] = useState<boolean>(false);
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
          const isEnableAO01 = userArray.find(
            (e) => e.id == "Override Enable AO 01",
          );

          setPointAO(dataPointAO.data);
          setPointDO(dataPointDO.data);
          setEnabeAO(dataEnabeAO.data);
          isEnableDO1.data == 1 ? setIsEnable(true) : setIsEnable(false);
          isEnableAO01.data == 1 ? setIsEnableAO(true) : setIsEnableAO(false);
          setLoading(false);
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
          <div className="block justify-around sm:flex">
            <div className="flex flex-col">
              <div className="flex-column m-5  block items-center justify-center  bg-slate-200 p-3 sm:col-span-3 sm:flex">
                <label
                  htmlFor="first-name"
                  className="text-gray-900 block font-medium leading-6 text-black dark:text-white"
                >
                  Chọn chế độ :
                </label>
                <div className="flex-column ml-7 flex items-center gap-5 sm:ml-3">
                  <h5>MANUAL</h5>
                  <div>
                    <SwitcherFour />
                  </div>
                  <h5>AUTO</h5>
                </div>
              </div>
              <div className="flex-column m-5  block items-center  bg-slate-200 p-3 sm:col-span-3 sm:flex">
                <label
                  htmlFor="first-name"
                  className="text-gray-900 block  font-medium leading-6 text-black dark:text-white"
                >
                  Bật/ tắt đèn :
                </label>
                <div className="flex-column ml-30 flex items-center gap-5">
                  <SwitchOnOff />
                </div>
              </div>
              <div className="flex-column m-5  block items-center justify-start  bg-slate-200 p-3 sm:col-span-3 sm:flex">
                <label
                  htmlFor="first-name"
                  className="text-gray-900 block font-medium leading-6 text-black dark:text-white"
                >
                  Chế độ AO :
                </label>
                <div className="flex-column ml-17 flex items-center gap-5 ">
                  <h5>OFF</h5>
                  <div>
                    <Switcher />
                  </div>
                  <h5>ON</h5>
                </div>
              </div>
            </div>
            <div>
              <div className="m-5 flex  flex-col justify-center  bg-slate-200 p-3 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-gray-900  block font-medium leading-6 text-black dark:text-white"
                >
                  Tăng / giảm độ sáng (%)
                </label>
                <div className="mt-2 block items-center sm:flex ">
                  <label
                    htmlFor="first-name"
                    className="text-gray-900 block leading-6"
                  >
                    NHẬP GIÁ TRỊ (%):
                  </label>
                  <div className="mt-2 block items-center sm:flex">
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
                      className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="flex">
                      {isEditEnableAO ? (
                        <>
                          <Link
                            onClick={() => onSubmitEnter(1)}
                            href="#"
                            className="m-1 inline-flex w-2/3   items-center justify-center rounded-md bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 sm:ml-2 lg:px-8 xl:px-10"
                          >
                            Xác Nhận
                          </Link>
                          <Link
                            onClick={() => onSubmitCannel(1)}
                            href="#"
                            className="m-1 inline-flex w-1/3 items-center justify-center rounded-md bg-meta-8 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 sm:ml-2 lg:px-8 xl:px-12"
                          >
                            No
                          </Link>
                        </>
                      ) : (
                        <Link
                          onClick={() => onSubmitEdit(1)}
                          href="#"
                          className="mt-2 items-center  justify-center  gap-2.5 rounded-md bg-meta-6 px-5 py-2 text-center font-medium  text-white hover:bg-opacity-90 sm:m-2 sm:flex lg:px-8 xl:px-10"
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
              <div className="m-5 flex  flex-col justify-center bg-slate-200 p-3 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-gray-900  block font-medium leading-6 text-black dark:text-white"
                >
                  Nhập setpoint AO
                </label>
                <div className="mt-2 block items-center sm:flex ">
                  <label
                    htmlFor="first-name"
                    className="text-gray-900 block  leading-6"
                  >
                    NHẬP GIÁ TRỊ (%):
                  </label>
                  <div className="mt-2 block items-center sm:flex">
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
                      className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="flex">
                      {isEditPointAO ? (
                        <>
                          <Link
                            onClick={() => onSubmitEnter(2)}
                            href="#"
                            className="m-1 inline-flex w-2/3   items-center justify-center rounded-md bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 sm:ml-2 lg:px-8 xl:px-10"
                          >
                            Xác Nhận
                          </Link>
                          <Link
                            onClick={() => onSubmitCannel(2)}
                            href="#"
                            className="m-1 inline-flex w-1/3 items-center justify-center rounded-md bg-meta-8 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 sm:ml-2 lg:px-8 xl:px-12"
                          >
                            NO
                          </Link>
                        </>
                      ) : (
                        <Link
                          onClick={() => onSubmitEdit(2)}
                          href="#"
                          className="mt-2 items-center  justify-center  gap-2.5 rounded-md bg-meta-6 px-5 py-2 text-center font-medium  text-white hover:bg-opacity-90 sm:m-2 sm:flex lg:px-8 xl:px-10"
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
              <div className="m-5 flex  flex-col justify-center bg-slate-200 p-3 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-gray-900  block font-medium leading-6 text-black dark:text-white"
                >
                  Nhập setpoint DO
                </label>
                <div className="mt-2 block items-center sm:flex ">
                  <label
                    htmlFor="first-name"
                    className="text-gray-900 block  leading-6"
                  >
                    NHẬP GIÁ TRỊ (%):
                  </label>
                  <div className="mt-2 block items-center sm:flex">
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
                      className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="flex">
                      {isEditPointDO ? (
                        <>
                          <Link
                            onClick={() => onSubmitEnter(3)}
                            href="#"
                            className="m-1 inline-flex w-2/3   items-center justify-center rounded-md bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 sm:ml-2 lg:px-8 xl:px-10"
                          >
                            Xác Nhận
                          </Link>
                          <Link
                            onClick={() => onSubmitCannel(3)}
                            href="#"
                            className="m-1 inline-flex w-1/3 items-center justify-center rounded-md bg-meta-8 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 sm:ml-2 lg:px-8 xl:px-12"
                          >
                            NO
                          </Link>
                        </>
                      ) : (
                        <Link
                          onClick={() => onSubmitEdit(3)}
                          href="#"
                          className="mt-2 items-center  justify-center  gap-2.5 rounded-md bg-meta-6 px-5 py-2 text-center font-medium  text-white hover:bg-opacity-90 sm:m-2 sm:flex lg:px-8 xl:px-10"
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
