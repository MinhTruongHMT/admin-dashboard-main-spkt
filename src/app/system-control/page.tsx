import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Page() {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="ĐIỀU KHIỂN HỆ THỐNG" />
        <div>System Control</div>
      </DefaultLayout>
    </>
  );
}
