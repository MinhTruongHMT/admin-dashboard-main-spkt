import ButtonOne from "../Button/ButtonOne";
import { useAppContext } from "@/providers/MyProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

const DialogChirend = () => {
  const { setOnDialog } = useAppContext();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const changeDialog = () => {
    setOnDialog(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* transform: translate(-50%, -50%) */}
      <div
        className="flex -translate-x-1/2  -translate-y-1/2 flex-col  justify-between p-2 text-center "
        style={{
          position: "absolute",
          zIndex: "99999",
          backgroundColor: "white",
          width: "900px",
          height: "500px",
          top: "50%",
          left: "50%",
          borderRadius: "8px",
        }}
      >
        <h3 className="font-medium">LỊCH TRÌNH CHIẾU SÁNG</h3>
        <div className="w-[10%]">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Select Country
          </label>

          <div className="relative z-20 bg-white dark:bg-form-input">
            {/* <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                    fill="#637381"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                    fill="#637381"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                    fill="#637381"
                  ></path>
                </g>
              </svg>
            </span> */}

            <select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                changeTextColor();
              }}
              className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-2 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                isOptionSelected ? "text-black dark:text-white" : ""
              }`}
            >
              {/* <option
                value=""
                disabled
                className="text-body dark:text-bodydark"
              >
                Select Country
              </option>
              <option value="USA" className="text-body dark:text-bodydark">
                USA
              </option>
              <option value="UK" className="text-body dark:text-bodydark">
                UK
              </option>
              <option value="Canada" className="text-body dark:text-bodydark">
                Canada
              </option> */}
              
              <option value="00:00" className="text-body dark:text-bodydark">
                00:00
              </option>
              <option value="01:00" className="text-body dark:text-bodydark">
                01:00
              </option>
              <option value="02:00" className="text-body dark:text-bodydark">
                02:00
              </option>
              <option value="03:00" className="text-body dark:text-bodydark">
                03:00
              </option>
              <option value="04:00" className="text-body dark:text-bodydark">
                04:00
              </option>
              <option value="05:00" className="text-body dark:text-bodydark">
                05:00
              </option>
              <option value="06:00" className="text-body dark:text-bodydark">
                06:00
              </option>
              <option value="07:00" className="text-body dark:text-bodydark">
                07:00
              </option>
              <option value="08:00" className="text-body dark:text-bodydark">
                08:00
              </option>
              <option value="09:00" className="text-body dark:text-bodydark">
                09:00
              </option>
              <option value="10:00" className="text-body dark:text-bodydark">
                10:00
              </option>
              <option value="11:00" className="text-body dark:text-bodydark">
                11:00
              </option>
              <option value="12:00" className="text-body dark:text-bodydark">
                12:00
              </option>
              <option value="13:00" className="text-body dark:text-bodydark">
                13:00
              </option>
              <option value="14:00" className="text-body dark:text-bodydark">
                14:00
              </option>
              <option value="15:00" className="text-body dark:text-bodydark">
                15:00
              </option>
              <option value="16:00" className="text-body dark:text-bodydark">
                16:00
              </option>
              <option value="17:00" className="text-body dark:text-bodydark">
                17:00
              </option>
              <option value="18:00" className="text-body dark:text-bodydark">
                18:00
              </option>
              <option value="19:00" className="text-body dark:text-bodydark">
                19:00
              </option>
              <option value="20:00" className="text-body dark:text-bodydark">
                20:00
              </option>
              <option value="21:00" className="text-body dark:text-bodydark">
                21:00
              </option>
              <option value="22:00" className="text-body dark:text-bodydark">
                22:00
              </option>
              <option value="23:00" className="text-body dark:text-bodydark">
                23:00
              </option>
            </select>

            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill="#637381"
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>
        <div className="m-1 flex flex-row-reverse">
          <div
            onClick={() => {
              changeDialog();
            }}
          >
            <ButtonOne title={"OK"} color={"green"}></ButtonOne>
          </div>
          <div
            onClick={() => {
              changeDialog();
            }}
          >
            <ButtonOne title={"Cannel"} color={"Yellow"}></ButtonOne>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default DialogChirend;
