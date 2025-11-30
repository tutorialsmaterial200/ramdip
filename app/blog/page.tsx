import Header from "@/components/Header";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <Blog />
      </div>
      <Footer />
    </main>
  );
}
