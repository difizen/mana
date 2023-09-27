import React from 'react';

import { Empty, Spin } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { Link } from 'dumi';
import styled from 'styled-components';

const Hit = styled.div`
  margin: 16px;

  .ant-typography {
    margin: 0;
    padding: 0;
  }
`;

const HitTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const HitDesc = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
`;

const BottomHint = styled.div`
  font-size: 12px;
  color: #9d9d9d;
`;

const HighlightText = styled.span`
  color: rgba(0, 96, 230, 1);
  font-weight: 500;
`;

const CenterHint = styled.div`
  display: flex;
  justify-content: center;
`;

interface ISearchHits {
  setVisible: (v: boolean) => void;
  hitsResult: ISearchResult[];
  loading: boolean;
}

interface IHighlightText {
  highlighted?: boolean;
  text: string;
}

interface ISearchResult {
  type: 'page' | 'title' | 'demo' | 'content';
  link: string;
  priority: number;
  highlightTitleTexts: IHighlightText[];
  highlightTexts: IHighlightText[];
}

const SearchHits: React.FC<ISearchHits> = ({ loading, hitsResult, setVisible }) => {
  return (
    <>
      {loading && !hitsResult?.length ? (
        <CenterHint>
          <Spin />
        </CenterHint>
      ) : null}
      {!loading || hitsResult?.length
        ? hitsResult?.slice(0, 30).map((hit) => {
            return (
              <Link to={hit.link} key={hit.link}>
                <Hit onClick={() => setVisible(false)}>
                  <Paragraph ellipsis={{ rows: 1 }}>
                    {hit.highlightTitleTexts.map((titleText, index) => {
                      return (
                        <HitTitle key={'hit-title-' + index}>
                          {titleText.highlighted ? (
                            <HighlightText>{titleText.text}</HighlightText>
                          ) : (
                            titleText.text
                          )}
                        </HitTitle>
                      );
                    })}
                  </Paragraph>

                  <Paragraph ellipsis={{ rows: 3 }}>
                    {hit.highlightTexts.map((text, index) => {
                      return (
                        <HitDesc key={'hit-text-' + index}>
                          {text.highlighted ? (
                            <HighlightText>{text.text}</HighlightText>
                          ) : (
                            text.text
                          )}
                        </HitDesc>
                      );
                    })}
                  </Paragraph>
                </Hit>
              </Link>
            );
          })
        : null}
      <BottomHint>
        <CenterHint>
          {!loading && !hitsResult?.length ? <Empty /> : '仅显示前 30 条记录'}
        </CenterHint>
      </BottomHint>
    </>
  );
};

export default SearchHits;
