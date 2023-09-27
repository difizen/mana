import { Helmet, useLocation, useSiteData } from 'dumi';
import DefaultLayout from 'dumi/theme-default/layouts/DocLayout';
import React from 'react';

import Banner from '../componets/Banner';
import { Roadmap } from '../componets/Roadmap';
import TechCard from '../componets/TechCard';
import Footer from '../slots/Footer';
import Header from '../slots/Header';

const HomeLayout: React.FC = () => {
  const { themeConfig } = useSiteData();

  return (
    <div>
      <Helmet>
        <title>{themeConfig.name}</title>
      </Helmet>
      <Header />
      <Banner />
      <TechCard />
      <Roadmap />
      <Footer />
    </div>
  );
};

const DocLayout = () => {
  const { pathname } = useLocation();

  return <>{pathname === '/' ? <HomeLayout /> : <DefaultLayout />}</>;
};

export default DocLayout;
