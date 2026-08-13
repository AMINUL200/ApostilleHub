import React from "react";
import HomeHeroSection from "../../component/home/HomeHeroSection";
import HomeTrustBarSection from "../../component/home/HomeTrustBarSection";
import HomeOurServicesSection from "../../component/home/HomeOurServicesSection";
import HomeHowItWorksSection from "../../component/home/HomeHowItWorksSection";
import HomeWhyChooseUsSection from "../../component/home/HomeWhyChooseUsSection";
import HomePopularDocuments from "../../component/home/HomePopularDocuments";
import HomeCountriesWeSupport from "../../component/home/HomeCountriesWeSupport";
import HomePricingSection from "../../component/home/HomePricingSection";
import HomeCustomerReviews from "../../component/home/HomeCustomerReviews";
import HomeFAQSection from "../../component/home/HomeFAQSection";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HomeHeroSection/>
      <HomeTrustBarSection/>
      <HomeOurServicesSection/>
      <HomeHowItWorksSection/>
      <HomeWhyChooseUsSection/>
      <HomePopularDocuments/>
      <HomeCountriesWeSupport/>
      <HomePricingSection/>
      <HomeCustomerReviews/>
      <HomeFAQSection/>
    </div>
  );
};

export default LandingPage;
