import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import SocialAuthButton from "../SocialAuthButton";

interface CardAuthProps {
  children: React.ReactNode;
  title: string;
  description: string;
  backButton: string;
  backButtonLink: string;
  showSocialAuth?: boolean;
}

const AuthCard = ({
  children,
  title,
  description,
  backButton,
  backButtonLink,
  showSocialAuth,
}: CardAuthProps) => {
  return (
    <Card className="flex border-none shadow-none flex-col w-full xl:w-[450px] py-5">
      <CardHeader>
        <CardTitle className="xl:text-center">{title}</CardTitle>
        <CardDescription className="xl:text-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocialAuth && (
        <>
          <CardContent>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background dark:bg-[#0e1111] px-2 text-muted-foreground">
                  Atau masuk dengan
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SocialAuthButton />
          </CardFooter>
        </>
      )}
      <CardFooter>
        <Link href={backButtonLink} className="w-full text-sm text-center">
          {backButton}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
