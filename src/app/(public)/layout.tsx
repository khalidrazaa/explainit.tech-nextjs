import type { Metadata } from "next";
import Navbar from "../../components/Navbar";


export const metadata: Metadata = {
  title: "Home",
  description: "Demystifying Tech with Explainit.Tech",
};

export default function PublicLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <>
        <Navbar/>
        <main className="max--w-6xl mx-auto px-4 py-6">
        {children}
        </main>
    </>
  );
}
