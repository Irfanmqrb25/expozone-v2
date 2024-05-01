import Link from "next/link";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { IconType } from "react-icons";
import clsx from "clsx";

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
      <Card className={clsx("p-4 border-2 border-black shadow-card", color)}>
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
