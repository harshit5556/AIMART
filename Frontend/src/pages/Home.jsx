import React, { useEffect, useState } from 'react';
import Background from '../component/Background';
import Hero from '../component/Hero';
import Product from './Product';
import Ourpolicy from '../component/Ourpolicy';
import NewLetterBox from '../component/NewLetterBox';
import Footer from '../component/Footer';
const Home = () => {
  let heroData = [
    { text1: "Unleash Your Style", text2: "Up to 30% Off This Week Only!" },
  { text1: "New Season, New Looks", text2: "Shop the Latest Arrivals Today" },
  { text1: "Stand Out in Style", text2: "Exclusive Picks Just for You" },
  { text1: "Elevate Your Wardrobe", text2: "Trendy. Timeless. Totally You." },
  { text1: "Flash Sale is Live!", text2: "Get the Hottest Styles Before They're Gone!" }
  ];

  let [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === heroData.length - 1 ? 0 : prevCount + 1));
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='overflow-x-hidden relative- top-[90px]'>
    <div className="lg:h-[100vh] md:h-[50vh] sm:h-[30vh] w-[100vw] bg-gradient-to-l from-[#0f0f0f] to-[#0c2025] overflow-hidden relative">
      <Background heroCount={heroCount} />
      <Hero 
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        heroData={heroData[heroCount]}
      />
    </div>
    <Product/>
    <Ourpolicy/>
    <NewLetterBox/>
    <Footer/>
    </div>
  );
};

export default Home;
