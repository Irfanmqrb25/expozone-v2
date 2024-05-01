import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full gap-10 py-7 md:px-40 md:py-10">
      <Link
        href="/featured"
        className="flex items-center justify-start gap-2 px-6 xl:px-0"
      >
        <Image
          src="/assets/brand-logo.svg"
          alt="brand logo"
          width={40}
          height={40}
          className="w-[30px] md:w-[40px]"
        />
        <span className="text-3xl font-semibold md:text-4xl">Expozone</span>
      </Link>
      <div className="flex items-center justify-evenly">
        <div className="hidden xl:block">
          <Image
            src="/assets/login.svg"
            alt="brand logo"
            width={500}
            height={500}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
