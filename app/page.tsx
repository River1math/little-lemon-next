import Link from "next/link";
//import Image from "next/image"
export default function HomePage() {
  return (
    <>
      <header className="home-header h-64 md:h-96 bg-[url('/lemon.png')] bg-no-repeat bg-cover bg-center">
      </header>

      <main className="flex flex-col items-center bg-amber-100">
        <h1 className="font-bold text-4xl my-5">Little Lemon</h1>
        <p className="font medium:500 text-xl font-sans">Chicago · Mediterranean</p>

        <Link href="/booking">
          <button className="my-4 text-base cursor-pointer mx-8 border px-6 py-2 text-white rounded-full hover: bg-amber-700 focus:ring-2">Reserve a table</button>
        </Link>
      </main>
    </>
  );
}
