import { Navbar } from "@/components/perfume/Navbar";
import { ViewRouter } from "@/components/perfume/ViewRouter";
import { Footer } from "@/components/perfume/Footer";
import { NoiseOverlay } from "@/components/perfume/NoiseOverlay";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <NoiseOverlay />
      <Navbar />
      <main className="flex-1">
        <ViewRouter />
      </main>
      <Footer />
    </div>
  );
}
