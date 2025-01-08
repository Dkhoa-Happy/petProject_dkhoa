import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
