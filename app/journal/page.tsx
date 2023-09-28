import Image from 'next/legacy/image';
import journalbg from '../../public/assets/journal-bg.png'

export default function Journal() {
  return <div className="flex w-full h-full justify-center items-center">
      <div className="absolute inset-0">
        <Image
            src={journalbg}
            alt="drawn background of the sky"
            layout="fill"
            className="w-full h-full inset-0 object-cover absolute -z-1"
            priority={true}
          />
    </div>
    <div className="bg-white/40 rounded-xl flex justify-center items-center z-40 w-3/4 h-1/2 text-black font-script text-5xl">
      Coming soon!
    </div>
  </div>;
}