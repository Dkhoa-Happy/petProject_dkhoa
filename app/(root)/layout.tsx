import Navbar from "@/components/shared/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
      <ScrollToTopButton />
    </main>
  );
}
