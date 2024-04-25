import { useState } from "react";

export default function Switch({color}:{color?:string}) {
  const [isSubmit, getIsSubmit] = useState<boolean>();
  const onChang = () => {};
  return (
    <div
      className={`h-5 w-5 rounded-full ${color?color:'border-2'} `}
      onClick={() => onChang}
    ></div>
  );
}
