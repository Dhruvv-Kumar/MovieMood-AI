import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import BackgroundVideo from "../components/home/BackgroundVideo";
import FloatingGradient from "../components/home/FloatingGradient";

const LandingPage = () => {
  return (
    <Layout>
      <BackgroundVideo />
      <FloatingGradient />
      <Hero />
    </Layout>
  );
};

export default LandingPage;