import { getCurrentUser } from "@/data/get-user";
import SearchPageClient from "./client";

const SearchPage = async () => {
  const session = await getCurrentUser();
  return <SearchPageClient session={session!} />;
};

export default SearchPage;
