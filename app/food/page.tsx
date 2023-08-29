// import FoodImg from "./foodimg";
import FoodList from "./foodlist";
import Image from 'next/legacy/image';

export default function FoodSelect() {
  // import foods
  return <div className="flex w-full h-full justify-center items-center">
      <div className="absolute inset-0">
        <Image
            src="/assets/food-bg.png"
            alt="drawn background of the sky"
            layout="fill"
            className="w-full h-full inset-0 object-cover absolute -z-1"
            priority={true}
          />
    </div>
    <div className="bg-peach rounded-2xl w-2/3 h-3/4 mt-8 mr-8 ml-4 p-12 display flex flex-col justify-center items-center z-20">
        <FoodList />
    </div>
    {/* <div className="bg-melon w-1/2 h-3/4 mb-12 ml-8 mr-4 flex flex-column justify-center items-center">
      <div className="bg-licorice text-white h-1/2 w-1/2">
        <FoodImg />
      </div>
    </div> */}
  </div>;
}