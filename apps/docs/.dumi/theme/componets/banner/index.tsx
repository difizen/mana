import { Link, useSiteData } from 'dumi';
import React, { useEffect, useState } from 'react';
import './index.less';

const Banner: React.FC = () => {
  const [animate, setAnimate] = useState({
    imgOpacity: 0,
    imgTranslate: 'none',
  });
  const { themeConfig } = useSiteData();

  useEffect(() => {
    setAnimate({
      imgOpacity: 1,
      imgTranslate: ` translateY(-14px)`,
    });
  }, []);

  if (!themeConfig.banner) {
    return null;
  }

  const bottons = themeConfig.banner.botton || [];

  return (
    <div className="difizen-dumi-banner">
      <div className="difizen-dumi-banner-main">
        <div className="difizen-dumi-hero">
          <h1 className="difizen-dumi-hero-title">
            <span>{themeConfig.banner.title}</span>
          </h1>
          <p className="difizen-dumi-hero-desc">{themeConfig.banner.desc}</p>
          <div className="difizen-dumi-hero-actions">
            {bottons.map(({ name, link }, index) => {
              const style =
                index === 0
                  ? {
                      color: '#fff',
                      backgroundColor: '#1677ff',
                    }
                  : {};
              return /^(\w+:)\/\/|^(mailto|tel):/.test(link) ? (
                <a
                  style={style}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  key={name}
                >
                  {name}
                </a>
              ) : (
                <Link style={style} key={name} to={link}>
                  {name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
