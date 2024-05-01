import { IconType } from "react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

interface EmptyMessageProps {
  title: string;
  description: string;
  icon: IconType;
  href?: string;
  labelHref?: string;
  needAction?: boolean;
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({
  title,
  description,
  icon: Icon,
  href,
  labelHref,
  needAction,
}) => {
  return (
    <div className="w-full h-full text-center">
      <Card className="flex flex-col items-center w-full gap-10 border-0 shadow-none">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          {needAction && (
            <Link
              href={href || ""}
              className="inline-flex items-center justify-center w-full px-3 ml-0 text-sm font-medium transition-colors border-2 border-black rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-9"
            >
              {labelHref}
            </Link>
          )}
        </CardHeader>
        <CardContent>
          <Icon className="w-40 h-40 text-gray-400" />
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyMessage;
