import { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";


export const metadata: Metadata = appScreenMetadata("Dine favoritter");

export default function FavoritterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
