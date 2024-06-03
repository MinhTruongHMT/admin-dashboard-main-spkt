"use client";
import { database } from "@/configs/filebaseConfig";
import { get, onValue, ref } from "firebase/database";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const [bright, setBright] = useState<string>("");

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

          const brightData = userArray.find((e) => e.id == "Relay Output 2");
          setBright(brightData.data);
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

        const brightData = userArray.find((e) => e.id == "Relay Output 2");
        setBright(brightData.data);
      }
    });
  }, []);
  return (
    <div className="pt-5 text-center">
      <h1 className="font-medium text-black">ĐỒ ÁN TỐT NGHIỆP</h1>
      <h3>
        <span className="font-medium text-black">TÊN ĐỀ TÀI:</span> Ứng dụng BMS
        trong điều khiển giám sát hệ thống chiếu sáng (BMS điều khiển LED
        Driver, DALI)
      </h3>

      <div className="flex  justify-end">
        <tbody>
          <tr>
            <td className="text-left font-medium text-black">GVHD</td>
            <td>TS. Lê Trọng Nghĩa</td>
          </tr>
          <tr>
            <td className="text-left font-medium text-black">
              Sinh viên thực hiện
            </td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>Tạ Hoàng Phú 20142152</td>
          </tr>
          <tr>
            <td></td>
            <td>Sơn Linh Vủ 20142612</td>
          </tr>
        </tbody>
      </div>
      {bright == "1" ? (
        <div style={{ display: "flex" }} className="justify-center">
          <Image
            src="/on.gif"
            alt="Image"
            width={900}
            height={200}
            style={{ width: "400px" }}
          />
        </div>
      ) : (
        <div style={{ display: "flex" }} className="justify-center">
          <Image
            src="/off.jpg"
            alt="Image"
            width={900}
            height={200}
            style={{ width: "400px" }}
          />
        </div>
      )}
    </div>
  );
}
