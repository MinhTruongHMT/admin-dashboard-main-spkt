"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Image from "next/image";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <div className="mb-1 flex flex justify-center pl-8 pr-8">
          {/* <div>
            <Image src="/Banner.png" alt="Image" width={900} height={200} />
          </div> */}
        </div>
        <div className="flex h-screen">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="text-title-md2 font-semibold text-black dark:text-white"></div>
                <h1 className="text-center text-title-md2 font-semibold text-black dark:text-white bg-[#D9D9D9] p-5 mb-3">
                  GIÁM SÁT, ĐIỀU KHIỂN HỆ THỐNG CHIẾU SÁNG
                </h1>
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
