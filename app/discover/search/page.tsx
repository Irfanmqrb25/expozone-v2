import { getCurrentUser } from "@/data/get-user";
import SearchPageClient from "./client";

const SearchPage = async () => {
  const session = await getCurrentUser();
  return (
    <div className="h-full">
      <SearchPageClient session={session!} />
    </div>
  );
};

export default SearchPage;
