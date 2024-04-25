import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Page() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Độ rọi trong phòng" />
      <div>GIÁM SÁT</div>
      <div>
        {/* <h1 className="text-center">Độ rọi trong phòng</h1> */}
        <div className="flex justify-around">
          <div>
            <div className="flex flex-col items-center justify-center sm:col-span-3">
              <label
                htmlFor="first-name"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Giá trị cảm biến 1
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* <button
                type="button"
                className="text-gray-900 ring-gray-300 hover:bg-gray-50 mt-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset"
              >
                Change
              </button> */}
            </div>
            <div className="flex flex-col items-center justify-center sm:col-span-3">
              <label
                htmlFor="first-name"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Giá trị cảm biến 2
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block rounded-md  border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* <button
                type="button"
                className="text-gray-900 ring-gray-300 hover:bg-gray-50 mt-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset"
              >
                Change
              </button> */}
            </div>
          </div>
          <div>
            <label
              htmlFor="first-name"
              className="text-gray-900 block text-sm font-medium leading-6"
            >
              Trạng thái đèn
            </label>
          </div>
          <div>
            <label
              htmlFor="first-name"
              className="text-gray-900 block text-sm font-medium leading-6"
            >
              Chế độ hoạt động
            </label>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
