"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Switch from "@/components/Switch/Switch";

export default function page() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chế độ hoạt động" />
      <div>GIÁM SÁT</div>
      <div>
        <Switch></Switch>
        <h1 className="text-center">Tăng/giảm độ sáng (%)</h1>
        <div className="flex flex-col justify-center items-center sm:col-span-3">
          <label
            htmlFor="first-name"
            className="text-gray-900 block text-sm font-medium leading-6"
          >
            NHẬP GIÁ TRỊ (%):
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block p-2  rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button>Submit</button>
        </div>
      </div>
    </DefaultLayout>
  );
}
