"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Switch from "@/components/Switch/Switch";
import { database } from "@/configs/filebaseConfig";
import {
  get,
  push,
  ref,
  getDatabase,
  set,
  onValue,
  child,
  update,
} from "firebase/database";
import { collectionGroup } from "firebase/firestore";
import { use, useContext, useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IuserData {
  id: string;
  data: string;
  status: boolean;
}

const FileBase = () => {
  const [users, setUsers] = useState<IuserData[]>([]);
  const starCountRef = ref(database, "Monitor");
  const [camBien1, setCamBien1] = useState<string>("");
  const [camBien2, setCamBien2] = useState<string>("");
  const [bright, setBright] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const usersRef = ref(database, "Monitor");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(
            ([id, data]: any) => ({
              id,
              ...data,
            }),
          );
          // notify();
          setLoading(false);
          notify();

          setUsers(userArray);
          const datCamBien1 = userArray.find((e) => e.id == "CAMBIEN1");
          const datCamBien2 = userArray.find((e) => e.id == "cambien2");
          const brightData = userArray.find((e) => e.id == "Relay Output 1");
          setCamBien1(datCamBien1.data);
          setCamBien2(datCamBien2.data);
          setBright(brightData.data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const userArray = Object.entries(snapshot.val()).map(
          ([id, data]: any) => ({
            id,
            ...data,
          }),
        );

        console.log(userArray);
        setUsers(userArray);
        const datCamBien1 = userArray.find((e) => e.id == "CAMBIEN1");
        const datCamBien2 = userArray.find((e) => e.id == "cambien2");
        const brightData = userArray.find((e) => e.id == "Relay Output 1");
        setCamBien1(datCamBien1.data);
        setCamBien2(datCamBien2.data);
        setBright(brightData.data);
      }
    });
  }, []);

  const sendData = () => {
    const sl = [...users].length;
    const db = getDatabase();
    set(ref(db, "users/" + (sl + 1)), {
      chedo: 1,
      name: "cambien1",
      trangthaiden1: 1,
    });
  };

  const setAnble = () => {
    bright == "1" ? setBright("0") : setBright("1");
  };

  function writeNewPost() {
    const db = getDatabase();

    // A post entry.

    const data = users.find((el) => el.id == "Relay Output 1");
    const postData = { status: data?.status, data: 2 };

    // Get a key for a new Post.
    // const newPostKey = push(child(ref(db), "Monitor")).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates: any = {};
    updates["/Monitor/" + "Relay Output 1"] = postData;

    return update(ref(db), updates)
      .then(() => {
        console.log("update thanh cong");
        notify();
      })
      .catch((e) => console.log(e));
  }
  const customId = "custom-id-yes";
  const notify = () =>
    toast.success("Page loaded successfully!", {
      toastId: customId,
    });

  return (
    <div className="h-screen">
      <DefaultLayout>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Breadcrumb pageName="GIÁM SÁT" />
        {loading ? (
          <Loader />
        ) : (
          <div className="h-[100%ư bg-[#D9D9D9]">
            {/* <h1 className="text-centber">Độ rọi trong phòng</h1> */}
            <div className="flex justify-around">
              <div className="p-10">
                <div className="mb-4 flex  flex-col justify-center sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="text-gray-900 block text-sm font-black font-medium leading-6"
                  >
                    Giá trị cảm biến 1
                  </label>
                  <div className="mt-2">
                    <input
                      value={camBien1}
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
                <div className="flex flex-col  justify-center sm:col-span-3 ">
                  <label
                    htmlFor="first-name"
                    className="text-gray-900 block text-sm font-black font-medium leading-6"
                  >
                    Giá trị cảm biến 2
                  </label>
                  <div className="mt-2">
                    <input
                      value={camBien2}
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
              <div className="p-10">
                <label
                  htmlFor="first-name"
                  className="text-gray-900 block text-sm font-black font-medium leading-6"
                >
                  Trạng thái đèn
                </label>

                <div className="flex justify-between">
                  <div className="flex flex-col items-center justify-center text-center">
                    <label
                      htmlFor="first-name"
                      className="text-gray-900 block text-sm font-medium leading-6"
                    >
                      ON
                    </label>
                    {bright == "1" ? (
                      <Switch color={"bg-green-400"}></Switch>
                    ) : (
                      <Switch></Switch>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <label
                      htmlFor="first-name"
                      className="text-gray-900 block text-sm font-medium leading-6"
                    >
                      OFF
                    </label>

                    {bright == "0" ? (
                      <Switch color={"bg-rose-500"}></Switch>
                    ) : (
                      <Switch></Switch>
                    )}
                  </div>
                </div>

                {/* <div className="mt-10">
                  {" "}
                  <SwitcherOne setAbles={setAnble} />
                </div> */}
              </div>
              <div className="p-10">
                <label
                  htmlFor="first-name"
                  className=" text-gray-900 ta block text-sm font-black font-medium leading-6"
                >
                  Chế độ hoạt động
                </label>
                <div className="flex justify-between">
                  <div className="flex flex-col items-center justify-center text-center">
                    <label
                      htmlFor="first-name"
                      className="text-gray-900 block text-sm font-medium leading-6"
                    >
                      MANUAL
                    </label>
                    {bright == "1" ? (
                      <Switch color={"bg-green-400"}></Switch>
                    ) : (
                      <Switch></Switch>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <label
                      htmlFor="first-name"
                      className="text-gray-900 block text-sm font-medium leading-6"
                    >
                      AUTO
                    </label>

                    {bright == "0" ? (
                      <Switch color={"bg-rose-500"}></Switch>
                    ) : (
                      <Switch></Switch>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <div>
        {users.map((user: IuserData) => (
          <div key={user.id}>
            <ul>
              <li>{user.data}</li>
            </ul>
          </div>
        ))}
      </div> */}

        {/* cho nay them moi */}

        {/* <div>
        {users.map((user: IuserData) => (
          <div key={user.id}>
            <ul>
              <li>{user.name}</li>
            </ul>
          </div>
        ))}
      </div>
      <div>
        <label
          htmlFor="price"
          className="text-gray-900 block text-sm font-medium leading-6"
        >
          Price
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
          />
        </div>
      </div> */}

        {/* <button
          onClick={() => notify()}
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          submit
        </button> */}
      </DefaultLayout>
    </div>
  );
};

export default FileBase;
