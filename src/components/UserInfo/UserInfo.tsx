import Image from "next/image";

export default function UserInfo() {
  return (
    <div className="text-center pt-5">
      <h1 className="font-medium text-black">ĐỒ ÁN TỐT NGHIỆP</h1>
      <h3>
        <span className="font-medium text-black">TÊN ĐỀ TÀI:</span> Ứng dụng BMS trong điều khiển giám sát hệ thống chiếu sáng
        (BMS điều khiển LED Driver, DALI)
      </h3>

      <div className="flex justify-center">
       
          {/* <tbody>
            <tr>
              <td  className="font-medium text-black text-left">GVHD</td>
              <td>TS. Lê Trọng Nghĩa</td>
            </tr>
            <tr>
              <td  className="font-medium text-black text-left">Sinh viên thực hiện</td>
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
          </tbody> */}
           <div style={{display:'flex'}}>
            <Image src="/school.jpg" alt="Image" width={900} height={200} style={{width:'500px'}} />
          </div>
       
      </div>
    </div>
  );
}
