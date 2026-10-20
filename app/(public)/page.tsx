import Navbar from "@/componentS/landing/Navbar";
import Hero from "@/componentS/landing/Hero";
import MarketSection from "@/componentS/landing/MarketSection";
import Features from "@/componentS/landing/Features";
import DashboardPreview from "@/componentS/landing/DashboardPreview";
import Statistics from "@/componentS/landing/Statistics";
import Testimonials from "@/componentS/landing/Testimonials";
import Pricing from "@/componentS/landing/Pricing";
import FAQ from "@/componentS/landing/FAQ";
import CTA from "@/componentS/landing/CTA";
import Footer from "@/componentS/landing/Footer";

export default function LandingPage() {
    return (
        <main className="bg-white dark:bg-[#08111F]">
            <Navbar />
            <Hero />
            <MarketSection />
            <Features />
            <DashboardPreview />
            <Statistics />
            <Testimonials />
            <Pricing />
            <FAQ />
            <CTA />
            <Footer />
        </main>
    );
}