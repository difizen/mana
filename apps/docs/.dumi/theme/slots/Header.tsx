import { GithubOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { Link, useLocation, useNavData, useSiteData } from 'dumi';
import { Octokit } from 'octokit';
import React, { useEffect, useState } from 'react';

import SearchBar from '../componets/search-bar/index.js';
import useScroll from '../hooks/useScroll.js';
import './Header.less';

const octokit = new Octokit({});

const getRepoStars = async () => {
  try {
    const { data } = await octokit.rest.repos.get({
      owner: 'difizen',
      repo: 'mana',
    });
    const stars = data.stargazers_count;
    return stars;
  } catch (error) {
    return undefined;
  }
};

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
  const [stars, setStars] = useState<number | undefined>(undefined);
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    getRepoStars()
      .then((currentStars) => {
        return setStars(currentStars);
      })
      .catch(console.error);
  }, []);

  return (
    <nav
      className="difizen-dumi-header"
      style={{
        background: scroll > 70 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0)',
      }}
    >
      <div className="difizen-dumi-header-logo">
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
            to={themeConfig['link']}
          >
            <img className="difizen-dumi-header-logo-img" src={themeConfig.logo} />
            {themeConfig.name}
          </Link>
        )}
      </div>
      <NavBar />

      <div className="difizen-dumi-header-right">
        <SearchBar />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Space>
            {/* <Button
              type="text"
              onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light');
              }}
              icon={theme === 'light' ? <SunOutlined /> : <MoonOutlined />}
            ></Button> */}
            <Button
              type="link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/difizen/mana"
              className="difizen-dumi-header-right-github-btn"
              icon={<GithubOutlined />}
            >
              <div className="difizen-dumi-header-right-github-star">
                <span className="difizen-dumi-header-right-github-btn-hint">Stars</span>
                <div style={{ color: 'rgb(66 78 102 / 100%)' }}>{stars || 0}</div>
              </div>
            </Button>
          </Space>
        </div>
      </div>
    </nav>
  );
};

export default Header;
