import ChatBox from "./chatbox";
import sakurabg from '../../public/assets/sakura-bg.png'
import Image from "next/legacy/image";


export default function Chat() {
  return (
    <div className="flex justify-center align-start w-full h-full">
      <div className="absolute inset-0">
        <Image
          src={sakurabg}
          alt="drawn background of blue background with pink hearts"
          layout="fill"
          className="w-full h-full inset-0 object-cover absolute -z-1"
          priority={true}
        />
      </div>
      <ChatBox />
    </div>
  );
}
