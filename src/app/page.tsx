import Image from "next/image";
import Header from './../components/sections/Header';
import Content from './../components/sections/Content';
import Info from "@/components/sections/Info";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Content />
      <Info />
      <Footer />
    </main>
  );
}
