import Image from 'next/legacy/image';
import sakurabg from '../../public/assets/sakura-bg.png'
import FoodButtons from './FoodButtons';

export default function FoodSelect() {
  return (
  <div className="flex relative w-full min-h-dvh justify-center items-center">
      <div className="absolute inset-0">
        <Image
            src={sakurabg}
            alt="drawn background of the sky"
            layout="fill"
            className="w-full h-full inset-0 object-cover absolute -z-1"
            priority={true}
          />
    </div>
    <FoodButtons />
</div>
  );
}