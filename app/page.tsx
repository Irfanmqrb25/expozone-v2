import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/navbar/Header";

import clsx from "clsx";
import {
  VscDebugBreakpointDataUnverified,
  VscDebugBreakpointLogUnverified,
} from "react-icons/vsc";
import { getCurrentUser } from "@/data/get-user";

const patrickHand = Patrick_Hand({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--patrick-hand",
});

const LandingPage = async () => {
  const session = await getCurrentUser();
  return (
    <div className="flex flex-col">
      <Header session={session!} />
      <div className="flex flex-col w-full mt-16 border-b-2 border-black lg:flex-row lg:mt-0">
        <div className="flex flex-col items-center border-b-2 xl:border-b-0 lg:border-r-2 border-black justify-center mx-auto space-y-6 lg:space-y-4 bg-[#FF6D28] w-full lg:w-1/2 h-[500px] text-center">
          <h2 className="mx-auto text-3xl font-medium md:font-semibold md:text-5xl w-[90%] md:w-[55%]">
            JUAL & BELI PRODUK DIGITAL DI EXPOZONE
          </h2>
          <p
            className={clsx(
              "text-xl md:text-2xl w-4/5 md:w-2/3 text-white mx-auto tracking-wider",
              patrickHand.className
            )}
          >
            Solusi Paling baik Untuk Memulai Bisnis dan Jual Beli Produk Digital
            Anda
          </p>
          <Link
            href="/featured"
            className={clsx(
              "bg-black text-white py-2 px-5 rounded-sm w-1/2 lg:w-auto tracking-wider text-lg border-2 border-white ease-in-out duration-300 shadow-button",
              patrickHand.className
            )}
          >
            Mulai Sekarang
          </Link>
        </div>
        <div className="bg-[#FCE700] w-full lg:w-1/2 h-[500px] flex justify-center my-auto relative">
          <Image
            src="/assets/landing-page/blob.svg"
            loading="lazy"
            alt="landing page blob"
            width={500}
            height={500}
          />
          <Image
            src="/assets/landing-page/person.svg"
            loading="lazy"
            alt="landing page image"
            width={250}
            height={250}
            className="absolute top-10"
          />
        </div>
      </div>
      <div
        className={clsx(
          "flex flex-col justify-center items-center py-10",
          patrickHand.className
        )}
      >
        <p className="text-2xl tracking-wider md:text-3xl">
          MULAI PERJALANAN ANDA!
        </p>
        <p className="flex px-3 text-lg text-center md:text-xl text-neutral-400">
          Raih Masa Depan yang Menguntungkan: Buat Toko Anda Sekarang, Raih
          Keuntungan Yang Besar! Biarkan Kesuksesan Mengikuti Setiap Langkah
          Anda.
        </p>
      </div>
      <div className="flex flex-col w-full border-black lg:flex-row border-y-2">
        <div className="flex flex-col items-center border-b-2 xl:border-b-0 lg:border-r-2 border-black justify-center bg-[#006E7F] w-full lg:w-1/2 h-[500px]">
          <div className="relative w-4/5 overflow-hidden md:w-2/3 h-2/3 md:h-4/5 xl:h-[90%] aspect-square">
            <Image
              alt="become a new seller"
              src="/assets/landing-page/become-seller.svg"
              fill
              loading="lazy"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="bg-[#323232] w-full lg:w-1/2 h-[500px]">
          <div className="flex flex-col gap-5 px-5 pt-16 text-white md:px-10">
            <p className="text-3xl font-medium tracking-wider md:text-4xl">
              MENJADI PENJUAL
            </p>
            <div className="flex flex-col gap-7">
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointDataUnverified className="text-lg" />
                <p className={clsx("md:text-lg", patrickHand.className)}>
                  Langkah Cerdas, Imbalan Besar: Menjadi Penjual yang Percaya
                  Diri! Mulailah dari Kecil dan Hingga Tumbuh Besar.
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointDataUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Cicipi Terlebih Dahulu: Minimalkan Risiko, Maksimalkan
                  Keuntungan. Memulai Perjalanan Berjualan Anda!
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointDataUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Menangkan Hati, Menangkan Penjualan: Ciptakan Produk yang Tak
                  Tertahankan yang Menarik Pelanggan!
                </p>
              </div>
              <div className="flex-row items-center hidden gap-2 md:flex">
                <VscDebugBreakpointDataUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Tingkatkan Potensi Penjualan Anda: Berfikir, Bertindak dan
                  Berani! Tingkatkan Daya Tarik Produk Anda hingga Penjualan
                  Meningkat!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "flex justify-center mx-auto text-2xl md:text-3xl py-10 tracking-wider w-4/5 md:w-3/4 text-center",
          patrickHand.className
        )}
      >
        Mulailah Petualangan Penjualan yang Penuh Tantangan, dan Saksikan
        Kesuksesan Luar Biasa Terwujud. Ambil Langkah Pertama Sekarang dan
        Lihatlah Mimpi Anda Menghasilkan Keberhasilan Luar Biasa!
      </div>
      <div className="flex flex-col w-full border-black lg:flex-row border-y-2">
        <div className="flex flex-col items-center justify-center border-b-2 xl:border-b-0 lg:border-r-2 border-black bg-[#F5C6EC] w-full lg:w-1/2 h-[500px]">
          <div className="relative w-4/5 overflow-hidden md:w-2/3 h-2/3 md:h-4/5 xl:h-[90%] aspect-square">
            <Image
              alt="product categories"
              src="/assets/landing-page/category-product.svg"
              fill
              loading="lazy"
              className="object-cover"
            />
          </div>
        </div>
        <div className="bg-[#AA77FF] w-full lg:w-1/2 h-[500px]">
          <div className="flex flex-col gap-5 px-5 pt-16 text-white md:px-10">
            <p className="text-3xl font-medium tracking-wider md:text-4xl">
              KATEGORI PRODUK
            </p>
            <p
              className={clsx(
                "text-lg md:text-xl font-medium tracking-wider",
                patrickHand.className
              )}
            >
              Jual dan beli produk digital berdasarkan kategori yang ada.
            </p>
            <div className="flex flex-col gap-2 tracking-wider">
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("md:text-lg", patrickHand.className)}>
                  Templat Web dan Aplikasi
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Font dan Tipografi
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Video dan Animasi
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Musik dan Audio
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Model dan Aset Gambar
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  E-Book dan Tulisan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "flex flex-col gap-5 justify-center mx-auto py-10 tracking-wider w-4/5 text-center",
          patrickHand.className
        )}
      >
        <p className="text-5xl tracking-wider md:text-6xl">1,450,290 +</p>
        <p className="text-2xl tracking-wider md:text-3xl">
          Expozone, Tempat Jual Beli Produk Digital. Gabung Sekarang!
        </p>
      </div>
      <div className="flex flex-col items-center gap-5 py-20 md:py-28 bg-[#23A094] text-white border-black border-y-2">
        <div className="flex flex-col items-center justify-center text-xl font-semibold tracking-wider md:text-4xl">
          <p>Bagikan produk Anda!</p>
          <p>Untuk semua orang di luar sana.</p>
        </div>
        <Link
          href="/login"
          className={clsx(
            "px-5 py-2 bg-black border border-white rounded-sm tracking-wider hover:scale-105 duration-100 ease-in-out",
            patrickHand.className
          )}
        >
          Mulai Berjualan
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
