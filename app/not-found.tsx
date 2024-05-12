import Link from "next/link";
import Image from "next/image";

import Container from "@/components/Container";
import MainNav from "@/components/navbar/MainNav";

import getStore from "@/actions/getStore";
import { getCurrentUser } from "@/data/get-user";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default async function NotFound() {
  const session = await getCurrentUser();
  const store = await getStore();
  return (
    <div>
      <MainNav session={session} store={store!} />
      <div className="py-40">
        <Container>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/assets/not-found.jpg"
              alt="image not found"
              width={400}
              height={400}
            />
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-semibold md:text-2xl">
                Halaman Tidak Ditemukan
              </h1>
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Kembali
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
