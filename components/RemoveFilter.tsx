"use client";
import { useRouter } from "next/navigation";

interface RemoveFilter {
  title?: string;
  reset?: boolean;
}

const RemoveFilter: React.FC<RemoveFilter> = ({ title, reset }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-2">
      <div className="text-2xl font-medium">{title}</div>
      {reset && (
        <div
          className="px-2 py-1 border border-black rounded-sm cursor-pointer hover:bg-black hover:text-white"
          onClick={() => router.push("/products")}
        >
          Remove Filters
        </div>
      )}
    </div>
  );
};

export default RemoveFilter;
