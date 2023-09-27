import { Link, useLocation, useNavData, useSiteData } from 'dumi';
import React from 'react';
import styled from 'styled-components';

import useScroll from '../hooks/useScroll';

import SearchBar from './SearchBar';

const HeaderNavBar = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 100;
  width: 100%;
  height: 60px;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;

  .ant-menu-overflow {
    background-color: transparent;
    width: 100%;

    .ant-menu-overflow-item {
      display: flex;
      align-items: center;
      height: 60px;
    }
  }
`;

const HeaderLogo = styled.div`
  a {
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: 22,
    alignItems: 'center',
    display: 'inline-flex',
    marginRight: 32,
    color: '#30363f',
  }
`;

const Logo = styled.img`
  height: 60px;
  margin-left: 24px;
  margin-right: 8px;
`;

const RightArea = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
`;

const GitHubLogo = styled.img`
  width: 24px;
  margin-right: 12px;
  vertical-align: middle;
`;

const GitHubBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 3px 5px 3px 3px;
  border-radius: 4px;
  margin-right: 14px;
  background-color: #edf4ff;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 8%);
  font-size: 12px;
  line-height: normal;
`;

const GitHubBtnHint = styled.span`
  padding: 3px 5px;
  border-radius: 4px;
  margin-right: 5px;
  background-image: linear-gradient(119deg, #5b7eaf 0%, #294d81 100%);
  color: #fff;
  opacity: 0.8;
`;

const NavBar: React.FC = () => {
  const nav = useNavData();
  const { pathname } = useLocation();
  const activeKey = `/${pathname.split('/')?.[1]}`;
  return (
    <div>
      {nav.map((it) => (
        <Link
          to={it.link}
          key={`${it.title}-${it.link}`}
          style={{
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              textDecoration: 'none',
              color:
                activeKey === it.link ? 'rgb(22, 119, 255)' : 'rgba(0, 0, 0, 0.88)',
              margin: '0 16px',
            }}
          >
            {it.title}
          </span>
        </Link>
      ))}
    </div>
  );
};

const Header: React.FC = () => {
  const scroll = useScroll();
  const { themeConfig } = useSiteData();

  return (
    <HeaderNavBar
      style={{
        transition: 'background .3s ease-out',
        background: scroll > 70 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0)',
      }}
    >
      <HeaderLogo>
        {themeConfig.logo && (
          <Link
            style={{
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 22,
              alignItems: 'center',
              display: 'inline-flex',
              marginRight: 32,
              color: '#30363f',
            }}
            to={themeConfig.link}
          >
            <Logo src={themeConfig.logo} />
            {themeConfig.name}
          </Link>
        )}
      </HeaderLogo>
      <NavBar />

      <RightArea>
        <SearchBar />
        {/* TODO 目前fork和stars是写死的，等后续采用接口 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a
            href="https://github.com/difizen/mana"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <GitHubBtn>
              <GitHubBtnHint>Forks</GitHubBtnHint>
              <div style={{ color: 'rgb(66 78 102 / 100%)' }}>
                {themeConfig.githubInfo?.forks || 0}
              </div>
            </GitHubBtn>
          </a>
          <a
            href="https://github.com/difizen/mana"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <GitHubBtn>
              <GitHubBtnHint>Stars</GitHubBtnHint>
              <div style={{ color: 'rgb(66 78 102 / 100%)' }}>
                {themeConfig.githubInfo?.stars || 0}
              </div>
            </GitHubBtn>
          </a>
          <a target="_blank" href={themeConfig.githubInfo?.url} rel="noreferrer">
            <GitHubLogo src="https://mdn.alipayobjects.com/huamei_usjdcg/afts/img/A*Ybx5RKAUMbUAAAAAAAAAAAAADo6HAQ/original" />
          </a>
        </div>
      </RightArea>
    </HeaderNavBar>
  );
};

export default Header;
