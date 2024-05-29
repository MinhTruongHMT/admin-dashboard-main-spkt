"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Buttonc from "../Button/Button";
import CardOne from "../Card/Card";
import CardNoButton from "../Card/CardNoButton";
import styles from "./Sidebar.module.css";
import { get, getDatabase, onValue, ref, update } from "firebase/database";
import { toast } from "react-toastify";
import { database } from "@/configs/filebaseConfig";
import { useAppContext } from "@/providers/MyProvider";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const customId = "custom-id-yes";
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuto, setIsAuto] = useState<boolean>();
  const [isOn, setIsOn] = useState<boolean>();
  const { setOnDialog } = useAppContext();

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }: MouseEvent) => {
  //     if (!sidebar.current || !trigger.current) return;
  //     if (
  //       !sidebarOpen ||
  //       sidebar.current.contains(target) ||
  //       trigger.current.contains(target)
  //     )
  //       return;
  //     setSidebarOpen(false);
  //   };
  //   document.addEventListener("click", clickHandler);
  //   return () => document.removeEventListener("click", clickHandler);
  // });

  // close if the esc key is pressed
  // useEffect(() => {
  //   const keyHandler = ({ key }: KeyboardEvent) => {
  //     if (!sidebarOpen || key !== "Escape") return;
  //     setSidebarOpen(false);
  //   };
  //   document.addEventListener("keydown", keyHandler);
  //   return () => document.removeEventListener("keydown", keyHandler);
  // });

  // useEffect(() => {
  //   localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
  //   if (sidebarExpanded) {
  //     document.querySelector("body")?.classList.add("sidebar-expanded");
  //   } else {
  //     document.querySelector("body")?.classList.remove("sidebar-expanded");
  //   }
  // }, [sidebarExpanded]);

  const updateOverrideEnableDO2 = (value: number) => {
    const db = getDatabase();
    const updates: any = {};
    updates["/control/" + "Override Enable DO2/data"] = value;

    updates["/control/" + "Override Value DO2/data"] = value;
    updates['/time' + '/times' + '/isTimer'] = 0;


    return update(ref(db), updates)
      .then(() => {
        if (value == 1) {
          setIsOn(true);
        } else {
          setIsOn(false);
        }
        notify();
      })
      .catch((e) => {
        notifyError();
        console.log(e);
      });
  };

  const updateOverrideEnableDO1 = (value: number) => {
    const db = getDatabase();
    const enableData = { data: value };
    const valueData = { data: value };

    const updates: any = {};
    updates["/control/" + "Override Enable DO1"] = enableData;

    updates["/control/" + "Override Value DO1"] = valueData;

    return update(ref(db), updates)
      .then(() => {
        notify();
        if (value == 1) {
          setIsAuto(true);
        } else {
          setIsAuto(false);
        }
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
            (e) => e.id == "Override Enable DO1",
          );
          const isEnableDO2 = userArray.find(
            (e) => e.id == "Override Enable DO2",
          );

          isEnableDO1.data == 1 ? setIsAuto(true) : setIsAuto(false);
          isEnableDO2.data == 1 ? setIsOn(true) : setIsOn(false);
          setLoading(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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
          (e) => e.id == "Override Enable DO1",
        );

        const isEnableDO2 = userArray.find(
          (e) => e.id == "Override Enable DO2",
        );

        isEnableDO1.data == 1 ? setIsAuto(true) : setIsAuto(false);
        isEnableDO2.data == 1 ? setIsOn(true) : setIsOn(false);
      }
    });
  }, []);

  return (
    <aside
      ref={sidebar}
      className={` absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col  overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {loading ? (
        <></>
      ) : (
        <div className="no-scrollbar flex h-full flex-col overflow-y-auto border border-stroke bg-slate-100 duration-300 ease-linear dark:border-strokedark">
          {/* <!-- Sidebar Menu --> */}
          <nav className=" px-4 py-4">
            {/* <!-- Menu Group --> */}
            <div>
              <h2
                style={{ borderRadius: "5px" }}
                className="mb-2 bg-black-2 p-2 text-center text-title-md2 font-semibold text-white dark:text-white"
              >
                ĐIỀU KHIỂN
              </h2>
              <ul className="mb-6 flex flex-col gap-3 border p-2">
                {/*😀😀😀*/}
                <li className=" border bg-white  hover:shadow-4 dark:border-strokedark">
                  <Buttonc
                    title={"BẬT / TẮT ĐÈN"}
                    colorLeft={"#54EA54"}
                    colorRight={"#ff5252"}
                    nameButtonLeft={"ON"}
                    nameButtonRight={"OFF"}
                    functionDrop={updateOverrideEnableDO2}
                    isOn={isOn}
                  ></Buttonc>
                </li>
                <li className="border bg-white  hover:shadow-4 dark:border-strokedark">
                  <Buttonc
                    title={"CHẾ ĐỘ"}
                    colorLeft={"#54EA54"}
                    colorRight={"#54EA54"}
                    nameButtonLeft={"AUTO"}
                    nameButtonRight={"MAN"}
                    functionDrop={updateOverrideEnableDO1}
                    isOn={isAuto}
                  ></Buttonc>
                </li>
                {!isAuto ? (
                  <></>
                ) : (
                  <>
                    <li>
                      <CardOne
                        functionDrop={updateOverrideEnableAO01}
                      ></CardOne>
                    </li>
                    <li>
                      <CardNoButton
                        title="Độ rọi mong muốn:"
                        id={2}
                      ></CardNoButton>
                    </li>
                    <li>
                      <CardNoButton
                        title="Tắt đèn khi sáng vượt giá trị:"
                        id={3}
                      ></CardNoButton>
                    </li>
                    <li>
                      <div
                        style={{
                          boxShadow: "2px 3px gray",
                          paddingLeft: "8px",
                          alignItems: "center",
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                        className="flex justify-between border bg-white "
                      >
                        <div>
                          <label
                            style={{
                              color: "black",
                              fontWeight: "500",
                              textAlign: "left",
                            }}
                          >
                            Cài đặt lịch trình
                          </label>
                        </div>
                        <div className={styles.buttoncss} onClick={()=>{setOnDialog(true)}}>
                          <Image
                            src={"calendar.svg"}
                            alt={"calendar"}
                            width={20}
                            height={20}
                            className={styles.image}
                            color="#ffff"
                          />
                        </div>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
