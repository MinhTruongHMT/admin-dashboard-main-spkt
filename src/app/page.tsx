import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserInfo from "@/components/UserInfo/UserInfo";
import { MyProvider } from "@/providers/MyProvider";


export const metadata: Metadata = {
  title: "TRANG CHỦ",
  description: "This is website for TA HOANG PHU",
};

export default function Home() {
  return (
    <>
      <MyProvider>
        <DefaultLayout>
          <UserInfo />
        </DefaultLayout>
      </MyProvider>
    </>
  );
}
