import { Link, useSiteData } from 'dumi';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 548px;
  background-color: #ffffff;
  background-image: url('https://mdn.alipayobjects.com/huamei_usjdcg/afts/img/A*D4cjRIorZ9oAAAAAAAAAAAAADo6HAQ/original');
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto 548px;

  @media only screen and (min-width: 1450px) {
    background-size: 100% 100%;
  }

  @media only screen and (max-width: 768px) {
    height: 636px;
    background-size: auto 636px;
  }
`;

const MainArea = styled.div`
  position: relative;
  display: flex;
  max-width: 1200px;
  height: 548px;
  align-items: center;
  margin: 0 auto;
  padding-inline: 40px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    height: 636px;
    padding-inline: 12px;
  }
`;

const TextContent = styled.div`
  @media only screen and (max-width: 768px) {
    padding-top: 90px;
    text-align: center;
  }
`;

const Title = styled.div`
  margin: 0px 0 10px;
  color: #181818;
  font-size: 54px;
  font-weight: 700;
  letter-spacing: 0;
  text-align: justify;

  @media only screen and (max-width: 768px) {
    margin: 10px 0 10px;
    text-align: center;
  }
`;

const Detail = styled.div`
  padding: 0;
  color: rgb(66 78 102 / 100%);
  font-size: 14px;
  letter-spacing: 0;
  line-height: 28px;
  white-space: pre-wrap;

  p {
    margin: 0;
  }

  @media only screen and (max-width: 768px) {
    font-size: 13px;
    padding: 0 20px;
  }
`;

const BtnArea = styled.div`
  display: flex;
  margin: 20px 0;
  justify-content: center;
`;

const CoverImg = styled.img`
  display: inline-block;
  width: 670px;
  opacity: 0;

  @media only screen and (max-width: 920px) {
    width: 100%;
  }

  @media only screen and (max-width: 768px) {
    /* height: 90%; */
  }
`;

const Hero = styled.div`
  position: relative;
  margin: -96px auto -160px;
  max-width: 1392px;
  height: 932px;
  padding-top: 220px;
  text-align: center;
  box-sizing: border-box;
`;

const HeroTitle = styled.h1`
  margin: 0 0 32px;
  display: inline-block;
  font-family:
    Alibaba-PuHuiTi,
    Gill Sans,
    Gill Sans MT,
    Calibri,
    Trebuchet MS,
    sans-serif;
  color: #83cdf8;
  font-size: 180px;
  line-height: 1;

  span {
    color: transparent;
    text-shadow: 0 10px 20px rgba(22, 119, 255, 0.15);
    background: linear-gradient(30deg, #90d5ff 30%, #65a5ff);
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

const HeroDesc = styled.p`
  margin: 32px;
  color: #4f5866;
  font-size: 20px;
  line-height: 1.6;
`;

const HeroBtns = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;

  ::first-child {
    color: '#fff',
    background-color: '#1677ff',
  }

  :not(:first-child) {
    margin-inline-start: 48px;
    color: #1677ff;
    border: 1px solid #1677ff;
  }

  a {
    display: inline-block;
    height: 52px;
    font-size: 18px;
    line-height: 52px;
    text-decoration: none;
    min-width: 168px;
    border-radius: 26px;
    box-sizing: border-box;
    transition: opacity 0.2s;
  }
`;

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
    <BannerWrapper>
      <MainArea>
        {themeConfig.banner.coverImage ? (
          <>
            <TextContent
              style={{
                transition: 'all .7s ease-out',
                opacity: animate.imgOpacity,
                transform: animate.imgTranslate,
              }}
            >
              <Title>{themeConfig.banner.title}</Title>
              <Detail>
                <p>{themeConfig.banner.desc}</p>
              </Detail>
              <BtnArea>
                {bottons.map((it: { link: string; name: string }) => {
                  return (
                    <Link
                      style={{
                        margin: '0 8px',
                        textDecoration: 'none',
                        border: '1px dashed #d9d9d9',
                        backgroundColor: '#fff',
                        padding: '4px 15px',
                        color: 'rgba(0, 0, 0, 0.88)',
                      }}
                      to={it.link}
                      key={`${it.name}-${it.link}`}
                    >
                      {it.name}{' '}
                    </Link>
                  );
                })}
              </BtnArea>
            </TextContent>
            <div>
              <CoverImg
                style={{
                  transition: 'all 1s ease-out',
                  opacity: animate.imgOpacity,
                  transform: animate.imgTranslate,
                }}
                src="https://mdn.alipayobjects.com/huamei_usjdcg/afts/img/A*BQWiQbC8LkMAAAAAAAAAAAAADo6HAQ/original"
              />
            </div>
          </>
        ) : (
          <Hero>
            <HeroTitle>
              <span>{themeConfig.banner.title}</span>
            </HeroTitle>
            <HeroDesc>{themeConfig.banner.desc}</HeroDesc>
            <HeroBtns>
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
            </HeroBtns>
          </Hero>
        )}
      </MainArea>
    </BannerWrapper>
  );
};

export default Banner;
