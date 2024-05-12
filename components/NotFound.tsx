import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface NotFoundProps {
  label: string;
  src: string;
  href: string;
  buttonLabel: string;
}

const NotFound = ({ label, src, href, buttonLabel }: NotFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-40">
      <Image src={src} alt="store not found" width={400} height={400} />
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold md:text-2xl">{label}</h1>
        <Link
          href={href}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
