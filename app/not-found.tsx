import Link from "next/link";
import Image from "next/image";

import Container from "@/components/Container";
import MainNav from "@/components/navbar/MainNav";

import getStore from "@/actions/getStore";
import { getCurrentUser } from "@/data/get-user";

export default async function NotFound() {
  const session = await getCurrentUser();
  const store = await getStore();
  return (
    <div>
      <MainNav session={session} store={store!} />
      <div className="py-40">
        <Container>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/assets/not-found.jpg"
              alt=""
              width={400}
              height={400}
            />
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-3xl font-semibold">Page Not Found</h1>
              <Link href="/" className="px-2 py-1 text-white bg-black rounded">
                Go Back
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
