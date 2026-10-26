"use client";

import Navbar from "./components/Navbar";
import GsapSwipeSlider from "./components/GsapSwipeSlider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full h-screen overflow-hidden">
        <GsapSwipeSlider />
      </main>
    </>
  );
}

// import { notFound } from "next/navigation";

// export default function Home() {
//   notFound();
// }
