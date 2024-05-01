import CategoryCard from "@/components/card/CategoryCard";
import SearchProduct from "@/components/input/SearchProduct";
import { categories } from "@/lib/data";

const DiscoverPage = () => {
  return (
    <div className="w-full space-y-5 lg:px-40">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold text-center">EXPOZONE</h1>
        <SearchProduct className="w-full h-10 border-2 border-black" />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {categories.map((category) => (
          <CategoryCard
            key={category.label}
            href={category.href}
            label={category.label}
            description={category.description}
            icon={category.icon}
            color={category.color}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
