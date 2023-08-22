import FoodList from "./foodlist";

export default function FoodSelect() {
  // import foods
  return <div className="flex w-full h-full justify-center items-center">
    <div className="bg-peach rounded-2xl w-1/2 h-3/4 mb-12 mr-8 ml-4 p-12 display flex flex-col justify-center items-center">
        <FoodList />
    </div>
    <div className="bg-melon w-1/2 h-3/4 mb-12 ml-8 mr-4 flex flex-column justify-center items-center">
      <div className="bg-licorice text-white h-1/2 w-1/2">Buttons</div>
    </div>
  </div>;
}
