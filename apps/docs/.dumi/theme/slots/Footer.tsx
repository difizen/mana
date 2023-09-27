import { useSiteData } from 'dumi';
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  width: 100%;
  background-color: #f5f7fd;
  margin: 0;
  overflow: hidden;

  @media only screen and (max-width: 1280px) {
    width: 100%;
    box-sizing: border-box;
    padding-inline: 40px;
  }

  @media only screen and (max-width: 767px) {
    padding-inline: 0;
  }
`;

const FooterContentArea = styled.div`
  max-width: 1200px;
  padding: 50px 0 28px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const TextGroup = styled.div`
  padding: 8px;

  @media only screen and (max-width: 768px) {
    padding: 0 24px;
  }
`;

const Img = styled.img`
  width: 100%;
  max-width: 160px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #1d2129;
`;
const Item = styled.div`
  font-size: 14px;
  margin: 12px 0;

  a {
    display: inline-block;
    height: 17px;
    color: #4e5969;
  }

  a:hover {
    color: rgba(0, 96, 230, 1);
  }
`;
const ImgText = styled.div`
  font-size: 14px;
  line-height: 25px;
  padding: 0 0 12px;
  width: 240px;
  color: #4e5969;
`;
const ImageGroup = styled.div`
  display: flex;
  img:first-child {
    margin-right: 20px;
  }
`;
const ExtraInfo = styled.div`
  padding: 12px;
  font-size: 12px;
  color: #4e5969;
  border-top: 1px solid #eee;
  text-align: center;

  a:hover {
    color: rgba(0, 96, 230, 1);
  }
`;
type DatumType = {
  title: string;
  itemList: {
    name: string;
    link: string;
  }[];
};

const dataList = [
  {
    title: '资源',
    itemList: [
      {
        name: 'Difizen',
        link: 'https://github.com/difizen',
      },
      {
        name: 'mana',
        link: 'https://github.com/difizen/mana',
      },
      {
        name: 'libro',
        link: 'https://github.com/difizen/libro',
      },
    ],
  },
  {
    title: '社区',
    itemList: [
      {
        name: '提交反馈',
        link: 'https://github.com/difizen/mana/issues',
      },
      {
        name: '发布日志',
        link: 'https://github.com/difizen/mana/releases',
      },
    ],
  },
];

const Footer: React.FC = () => {
  const { themeConfig } = useSiteData();

  return (
    <FooterWrapper>
      <FooterContentArea>
        <TextGroup>Difizen | mana</TextGroup>
        {(themeConfig.links || []).map((datum: DatumType) => (
          <TextGroup key={datum.title}>
            <Title>{datum.title}</Title>
            {datum.itemList.map((item) => (
              <Item key={item.name}>
                <a href={item.link} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </Item>
            ))}
          </TextGroup>
        ))}
        <TextGroup>
          <ImgText>联系我们</ImgText>
          {themeConfig.groupQR && (
            <ImageGroup>
              <Img src={themeConfig.groupQR} />
            </ImageGroup>
          )}
        </TextGroup>
      </FooterContentArea>
      <ExtraInfo>{themeConfig.footer}</ExtraInfo>
    </FooterWrapper>
  );
};

export default Footer;
