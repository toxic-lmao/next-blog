import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MetaPress | About",
  description: "About MetaPress",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
