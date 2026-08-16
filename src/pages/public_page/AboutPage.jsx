import React from 'react'
import AboutHero from '../../component/about/AboutHero';
import WhyChooseUs from '../../component/about/WhyChooseUs';
import ProcessTimeline from '../../component/about/ProcessTimeline';
import CoreValues from '../../component/about/CoreValues';
import TeamSection from '../../component/about/TeamSection';
import Testimonials from '../../component/about/Testimonials';

const AboutPage = () => {
  return (
    <div>
        <AboutHero />
        <WhyChooseUs  />
        <ProcessTimeline />
        <CoreValues/>
        <TeamSection />
        <Testimonials />
      
    </div>
  )
}

export default AboutPage;
