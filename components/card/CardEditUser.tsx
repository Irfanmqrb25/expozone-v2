import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface CardEditUserProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const CardEditUser = ({ children, title, description }: CardEditUserProps) => {
  return (
    <Card>
      <CardHeader className="text-center md:text-start">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardEditUser;
