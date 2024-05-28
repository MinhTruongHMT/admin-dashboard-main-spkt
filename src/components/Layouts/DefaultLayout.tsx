"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Image from "next/image";
import SidebarRight from "../Sidebar/SidebarRight";
import Dialog from "@/components/Dialog/Dialog";
import { useAppContext} from "@/providers/MyProvider"
import DialogChirend from "../Dialog/DialogChidrend";


export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {isOnDialog} =  useAppContext();

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {isOnDialog ? (
        <>
          <>
            <Dialog />
            <DialogChirend />
          </>
        </>
      ) : (
        <></>
      )}
      <div className="flex flex-col gap-2 overflow-hidden">
        <div className="mb-1 flex flex justify-center pl-8 pr-8">
          {/* <div>
            <Image src="/Banner.png" alt="Image" width={900} height={200} />
          </div> */}
        </div>
        <div className="flex h-screen gap-4">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden border border-stroke bg-slate-100 dark:border-strokedark">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="text-title-md2 font-semibold text-black dark:text-white"></div>
                <h1 className="mb-3 bg-slate-200 p-5 text-center text-title-md2 font-semibold text-black dark:text-white">
                  GIÁM SÁT, ĐIỀU KHIỂN HỆ THỐNG CHIẾU SÁNG
                </h1>
                {children}
              </div>
            </main>
          </div>
          <SidebarRight
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
      </div>
    </div>
  );
}
