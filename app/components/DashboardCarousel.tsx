import React from 'react'
import Image from "next/legacy/image";
import dashboardImg from '../../public/assets/dashboard.png'
import computer from '../../public/assets/computer.png'
import kitchen from '../../public/assets/kitchen.png'

export default function DashboardCarousel() {
  return (
    <>
    <div className="w-full laptop:w-5/6 desktop:w-full max-w-5xl carousel rounded-box shadow-2xl">
    <div className="w-full laptop:w-5/6 desktop:w-full max-w-5xl carousel rounded-box shadow-2xl">
  <div className="carousel w-full">
    <div id="livingroom" className="carousel-item relative w-full">
          <Image
              src={dashboardImg}
              alt="drawn background of a japanese style living room"
              className="w-full"
              priority={true}
            />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle glass bg-white/50 text-white">❮</a> 
      <a href="#slide2" className="btn btn-circle glass bg-white/50 text-white">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
          <Image
              src={computer}
              alt="drawn background of a japanese style living room"
              className="w-full"
              priority={true}
            />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#livingroom" className="btn btn-circle glass bg-licorice/50 text-white">❮</a> 
      <a href="#slide3" className="btn btn-circle glass bg-licorice/50 text-white">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
            <Image
              src={kitchen}
              alt="drawn background of a japanese style living room"
              className="w-full"
              priority={true}
            />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle glass bg-white/50 text-white">❮</a> 
      <a href="#livingroom" className="btn btn-circle glass bg-white/50 text-white">❯</a>
    </div>
  </div> 
</div>
  </div>
  </>
  )
}
