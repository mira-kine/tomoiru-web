import React from 'react'
import Image from "next/legacy/image";
import dashboardImg from '../../public/assets/dashboard.png'
import authbg from '../../public/assets/auth_background.jpg'

export default function DashboardCarousel() {
  return (
    <>
    <div className="w-full max-w-5xl carousel rounded-box shadow-2xl">
  <div className="carousel w-full">
    <div id="slide1" className="carousel-item relative w-full">
          <Image
              src={dashboardImg}
              alt="drawn background of a japanese style living room"
              className="w-full"
              priority={true}
            />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle bg-white/50 text-white">❮</a> 
      <a href="#slide2" className="btn btn-circle bg-white/50 text-white">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
          <Image
              src={authbg}
              alt="drawn background of a japanese style living room"
              className="w-full"
              priority={true}
            />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle bg-white/50 text-white">❮</a> 
      <a href="#slide3" className="btn btn-circle bg-white/50 text-white">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
            <Image
              src={dashboardImg}
              alt="drawn background of a japanese style living room"
              className="w-full"
              priority={true}
            />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle bg-white/50 text-white">❮</a> 
      <a href="#slide4" className="btn btn-circle bg-white/50 text-white">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
        <Image
              src={authbg}
              alt="drawn background of a japanese style living room"
              className="w-full"
              priority={true}
            />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle bg-white/50 text-white">❮</a> 
      <a href="#slide1" className="btn btn-circle bg-white/50 text-white">❯</a>
    </div>
  </div>
</div>
  </div>
  </>
  )
}
