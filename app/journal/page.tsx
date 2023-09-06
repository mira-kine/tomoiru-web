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
  </div>;
}