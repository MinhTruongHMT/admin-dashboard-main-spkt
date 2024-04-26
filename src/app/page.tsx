import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserInfo from "@/components/UserInfo/UserInfo";


export const metadata: Metadata = {
  title:
    "TRANG CHỦ",
  description: "This is website for TA HOANG PHU",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        {/* <ECommerce /> */}
        <UserInfo/>
      </DefaultLayout>
    </>
  );
}
