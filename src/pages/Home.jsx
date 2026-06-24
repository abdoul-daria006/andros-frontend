import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Stats from "../components/Stats/Stats";
import Values from "../components/Values/Values";
import ValuesSection from "../components/ValuesSection/ValuesSection";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import ProductsPreview from "../components/ProductsPreview/ProductsPreview";
import ProjectsPreview from "../components/ProjectsPreview/ProjectsPreview";
import CTASection from "../components/CTASection/CTASection";
import Footer from "../components/Footer/Footer";


export default function Home() {
    return (
        <>
            <Hero />
            <Stats />
            <ValuesSection />
            <FeaturedProducts />
            <ProductsPreview />
            <ProjectsPreview />
            <CTASection />
        </>
    );
}