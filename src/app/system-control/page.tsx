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
// interface IuserData {
//   pointAO: number;
//   pointDO: number;
//   enabeleAO: number;
// }

export default function Page() {
  const starCountRef = ref(database, "Monitor");

  const [pointAO, setPointAO] = useState<number>();
  const [pointDO, setPointDO] = useState<number>();
  const [enableAO, setEnabeAO] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any>([]);

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

          setUsers(userArray);
          console.log(userArray);
          const dataPointAO = userArray.find((e) => e.id == "pointAO");
          const dataPointDO = userArray.find((e) => e.id == "pointDO");
          const dataEnabeAO = userArray.find((e) => e.id == "enableAO");
          console.log(dataEnabeAO);
          setPointAO(dataPointAO.data);
          setPointDO(dataPointDO.data);
          setEnabeAO(dataEnabeAO.data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const userArray = Object.entries(snapshot.val()).map(
          ([id, data]: any) => ({
            id,
            ...data,
          }),
        );

        setUsers(userArray);
        setUsers(userArray);
        const data = userArray.find((e) => e.id == "control");
        setPointAO(data.pointAO);
        setPointDO(data.pointDO);
        setEnabeAO(data.enabeAO);
      }
    });
  }, []);

  const updateEnableAO = (value: number) => {
    setEnabeAO(value);
    const db = getDatabase();
    const data = users.find((el: any) => el.id == "enableAO");
    const postData = { data: value };
    const updates: any = {};
    updates["/control/" + "enableAO"] = postData;

    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        // notify();
      })
      .catch((e) => console.log(e));
  };
  const updatePointDO = (value: number) => {
    setPointDO(value);
    const db = getDatabase();
    const data = users.find((el: any) => el.id == "pointDO");
    const postData = { data: value };
    const updates: any = {};
    updates["/control/" + "pointDO"] = postData;

    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        // notify();
      })
      .catch((e) => console.log(e));
  };
  const updatePointAO = (value: number) => {
    setPointAO(value);

    const db = getDatabase();
    const data = users.find((el: any) => el.id == "pointAO");
    const postData = { data: value };
    const updates: any = {};
    updates["/control/" + "pointAO"] = postData;

    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        // notify();
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="ĐIỀU KHIỂN HỆ THỐNG" />

        <div className="flex">
          <div className="flex flex-col">
            <div>{/* <h1>BẬT ĐÈN</h1> */}</div>
            <div></div>
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
                  value={enableAO}
                  onInput={(e: any) => {
                    updateEnableAO(e.target.value);
                  }}
                  // onKeyDown={(e: any) => {
                  //   setEnabeAO(e.target.value);
                  //   updateEnableAO(e.target.value);
                  // }}
                  // onInput={(e: any) => {
                  //   updateEnableAO(e.target.value);
                  //   setEnabeAO(e.target.value);

                  // }}
                  type="number"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  value={pointAO}
                  onInput={(e: any) => {
                    updatePointAO(e.target.value);
                  }}
                  type="number"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  value={pointDO}
                  onInput={(e: any) => {
                    updatePointDO(e.target.value);
                  }}
                  type="number"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
