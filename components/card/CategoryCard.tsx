import Link from "next/link";
import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface CategoryCardProps {
  href: string;
  label: string;
  description: string;
  icon: IconType;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  href,
  label,
  description,
  icon: Icon,
  color,
}) => {
  return (
    <Link href={href}>
      <Card
        className={cn(
          "p-4 border-2 border-black my-shadow hover:shadow-none transition-all hover:translate-x-1 hover:translate-y-1",
          color
        )}
      >
        <div>
          <Icon className="text-2xl" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium">{label}</h1>
          <p className="">{description}</p>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
