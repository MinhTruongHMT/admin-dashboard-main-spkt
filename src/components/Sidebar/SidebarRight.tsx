import { database } from "@/configs/filebaseConfig";
import { get, onValue, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import Clock from "react-live-clock";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
const SidebarRight = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const sidebar = useRef<any>(null);
  const [camBien1, setCamBien1] = useState<string>("");
  const [operationMode, setOperationMode] = useState<string>("");
  const [lampBrightness, setLampBrightness] = useState<string>("");
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
          setLoading(false);
          const datCamBien1 = userArray.find((e) => e.id == "CAMBIEN1");
          const brightData = userArray.find((e) => e.id == "Relay Output 2");
          const operationModeData = userArray.find(
            (e) => e.id == "Relay Output 1",
          );
          const datalampBrightness = userArray.find(
            (e) => e.id == "Analog Output 01",
          );

          setCamBien1(datCamBien1.data);
          setBright(brightData.data);
          setOperationMode(operationModeData.data);
          setLampBrightness(datalampBrightness.data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const userArray = Object.entries(snapshot.val()).map(
          ([id, data]: any) => ({
            id,
            ...data,
          }),
        );
        const datCamBien1 = userArray.find((e) => e.id == "CAMBIEN1");
        const brightData = userArray.find((e) => e.id == "Relay Output 2");
        const operationModeData = userArray.find(
          (e) => e.id == "Relay Output 1",
        );
        const datalampBrightness = userArray.find(
          (e) => e.id == "Analog Output 01",
        );

        setCamBien1(datCamBien1.data);
        setBright(brightData.data);
        setOperationMode(operationModeData.data);
        setLampBrightness(datalampBrightness.data);
      }
    });
  });

  return (
    <aside
      ref={sidebar}
      className={` absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col  overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {loading ? (
        <></>
      ) : (
        <div className="no-scrollbar flex h-full flex-col overflow-y-auto border border-stroke bg-slate-100 duration-300 ease-linear dark:border-strokedark">
          {/* <!-- Sidebar Menu --> */}
          <nav className=" px-4 py-4">
            {/* <!-- Menu Group --> */}
            <div>
              <h2
                style={{ borderRadius: "5px" }}
                className="mb-2 bg-black-2 p-2 text-center text-title-md2 font-semibold text-white dark:text-white"
              >
                GIÁM SÁT
              </h2>
              <ul className="mb-6 flex flex-col gap-3 ">
                <li>
                  <div
                    style={{
                      display: "grid",
                      boxShadow: "2px 3px gray",
                      padding: "8px",
                    }}
                    className="border   bg-white "
                  >
                    <Clock
                      className="font-medium text-black"
                      format={"HH:mm:ss"}
                      style={{ fontSize: "1.5em" }}
                      ticking={true}
                      onReady={() => {
                       
                      }}
                    />
                    <Clock
                      format={"LL"}
                      style={{ fontSize: "0.9em" }}
                      ticking={true}
                    />
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      display: "grid",
                      boxShadow: "2px 3px gray",
                      padding: "8px",
                    }}
                    className="border  bg-white "
                  >
                    <div className="mb-4 flex items-center justify-between border  bg-white p-2 sm:col-span-3 ">
                      <label
                        htmlFor="first-name"
                        className="text-gray-100 block w-1/2  leading-6 "
                      >
                        ĐÈN :
                      </label>
                      <div className=" flex w-1/2 flex-row-reverse items-center text-center">
                        <input
                          style={{
                            borderBottom: "3px solid gray",
                            borderRight: "2px solid gray",
                          }}
                          readOnly={false}
                          disabled={true}
                          value={bright == "1" ? "ON" : "OFF"}
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className={`block w-4/5 rounded-md border-0 ${bright == "1" ? 'bg-[#54EA54]' : 'bg-[#ff5252]'}  p-2 py-1.5 font-bold text-black shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                        />
                      </div>
                    </div>
                    <div className="mb-4 flex items-center justify-between border  bg-white p-2 sm:col-span-3 ">
                      <label
                        htmlFor="first-name"
                        className="text-gray-100 block w-1/2  leading-6 "
                      >
                        ĐỘ RỌI :
                      </label>
                      <div className=" flex w-1/2 flex-row-reverse items-center text-center">
                        <input
                          style={{
                            borderBottom: "3px solid gray",
                            borderRight: "2px solid gray",
                          }}
                          readOnly={false}
                          disabled={true}
                          value={camBien1 + " lx"}
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-4/5 rounded-md border-0 bg-[#54EA54]   p-2 py-1.5 font-bold text-black shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="mb-4 flex items-center justify-between border  bg-white p-2 sm:col-span-3 ">
                      <label
                        htmlFor="first-name"
                        className="text-gray-100 block w-1/2  leading-6 "
                      >
                        CHẾ ĐỘ :
                      </label>
                      <div className=" flex w-1/2 flex-row-reverse items-center text-center">
                        <input
                          style={{
                            borderBottom: "3px solid gray",
                            borderRight: "2px solid gray",
                          }}
                          readOnly={false}
                          disabled={true}
                          value={operationMode == "1" ? "AUTO" : "MAN"}
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className={`block w-4/5 rounded-md border-0  ${operationMode == '1' ? 'bg-[#54EA54]': 'bg-[#FFD700]'} p-2 py-1.5 font-bold text-black shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                        />
                      </div>
                    </div>
                    {bright == "1" ? (
                      <div className="mb-4 flex items-center justify-between border  bg-white p-2 sm:col-span-3 ">
                        <label
                          htmlFor="first-name"
                          className="text-gray-100 block w-1/2  leading-6 "
                        >
                          ĐỘ SÁNG :
                        </label>
                        <div className=" flex w-1/2 flex-row-reverse items-center text-center">
                          <input
                            style={{
                              borderBottom: "3px solid gray",
                              borderRight: "2px solid gray",
                            }}
                            readOnly={false}
                            disabled={true}
                            value={lampBrightness + " %"}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-4/5 rounded-md border-0   bg-[#54EA54] p-2 py-1.5 font-bold text-black shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </aside>
  );
};
export default SidebarRight;
