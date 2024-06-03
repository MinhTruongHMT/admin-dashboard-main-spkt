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
        <div className="mb-1 flex  justify-center pl-8 pr-8">
          <div >
            <Image src="/Banner.png" alt="Image" width={900} height={150} style={{height:'100px',width:"auto"}} />
          </div>
        </div>
        <div className="flex h-screen gap-4" style={{maxHeight:'620px'}}>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden border border-stroke  dark:border-strokedark">
            
            <main>
              <div className="mx-auto max-w-screen-2xl ">
              
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
