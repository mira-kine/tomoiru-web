import React from 'react';
import Link from 'next/link';

export default function HomeButton() {
  // add animation character later, after checking accessibility guidelines
  return (
    <>
      <Link
        href="/signin"
        className="flex justify-center items-center before:absolute before:z-2 before:top-0 before:"
      >
        {/* <div className="button__wrapper"> */}
        <span className="button__text">Sign In</span>
        {/* </div> */}
      </Link>
      <Link href="/signup" className="button button--yellow">
        {/* <div className="button__wrapper"> */}
        <span className="button__text">Sign Up</span>
        {/* </div> */}
      </Link>
    </>
  );
}
