import Image from "next/image";
import Link from "next/link";

interface NotFoundProps {
  label: string;
  src: string;
  href: string;
  buttonLabel: string;
}

const NotFound = ({ label, src, href, buttonLabel }: NotFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-40">
      <Image src={src} alt="" width={400} height={400} />
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-3xl font-semibold">{label}</h1>
        <Link href={href} className="px-2 py-1 text-white bg-black rounded">
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
