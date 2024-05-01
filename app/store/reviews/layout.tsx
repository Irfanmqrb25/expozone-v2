import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--fredoka-font",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={fredoka.className}>
      <div className="min-h-screen">{children}</div>
    </div>
  );
}
