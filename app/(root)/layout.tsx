import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ReactQueryProvider } from "@/app/clientWrapper";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <ReactQueryProvider>
        <Navbar />
        {children}
        <ScrollToTopButton />
      </ReactQueryProvider>
    </main>
  );
}
