"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Button from "../Button/Button";
import CardOne from "../Card/Card";
import CardNoButton from "../Card/CardNoButton";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={` absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col  overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
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
              {/* <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className=" border  border-stroke bg-white hover:border-orange-500 hover:shadow-4 dark:border-strokedark"
              >
                <Link
                  href="/supervise"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  GIÁM SÁT
                </Link>
                <div
                  style={{
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <Link
                    style={{ boxShadow: "1px 3px rgb(238 117 137)" }}
                    href="#"
                    className="inline-flex w-[50px] items-center justify-center rounded-md bg-rose-500 text-center font-medium text-white target:font-normal hover:bg-opacity-90"
                  >
                    OFF
                  </Link>
                </div>
              </li> */}
              {/* <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className=" border border-stroke border-stroke bg-white hover:border-orange-500 hover:shadow-4 dark:border-strokedark"
              >
                <Link
                  href="/system-control"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300  ease-in-out  dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <img
                    className="h-[35px] w-[35px]"
                    src="./e-learning-svgrepo-com.svg"
                  />
                  ĐIỀU KHIỂN
                </Link>
                <div
                  style={{
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <Link
                    href="#"
                    className="inline-flex w-[50px] items-center justify-center rounded-md bg-primary text-center font-medium text-white hover:bg-opacity-90"
                  >
                    AUTO
                  </Link>
                </div>
              </li> */}
              {/* <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className=" border border-stroke border-stroke bg-white hover:border-orange-500 hover:shadow-4 dark:border-strokedark"
              >
                <Link
                  href="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out  dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <img
                    className="h-[35px] w-[35px]"
                    src="./achievement-svgrepo-com.svg"
                  ></img>
                  ABOUT
                </Link>
                <div
                  style={{
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <Link
                    href="#"
                    className="inline-flex w-[50px] items-center justify-center rounded-md bg-green-500 text-center font-medium text-white hover:bg-opacity-90"
                  >
                    ON
                  </Link>
                </div>
              </li> */}
              {/*😀😀😀*/}
              <li className=" border bg-white  hover:shadow-4 dark:border-strokedark">
                <Button
                  title={"BẬT / TẮT ĐÈN"}
                  colorLeft={"#54EA54"}
                  colorRight={"#ff5252"}
                  nameButtonLeft={"ON"}
                  nameButtonRight={"OFF"}
                ></Button>
              </li>
              <li className="border bg-white  hover:shadow-4 dark:border-strokedark">
                <Button
                  title={"CHẾ ĐỘ"}
                  colorLeft={"#54EA54"}
                  colorRight={"#54EA54"}
                  nameButtonLeft={"AUTO"}
                  nameButtonRight={"MAN"}
                ></Button>
              </li>
              <li>
                <CardOne></CardOne>
              </li>
              <li>
                <CardNoButton title="Độ rọi mong muốn:"></CardNoButton>
              </li>
              <li>
                <CardNoButton title="Tắt đèn khi sáng vượt giá trị:"></CardNoButton>
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
                  <div className={styles.buttoncss}>
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
            </ul>
          </div>

          {/* <!-- Others Group --> */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
