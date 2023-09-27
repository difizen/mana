import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import useAnimate from '../hooks/useAnimate';
import { useWindowSize } from '../hooks/useWindowSize';

import { Title } from './Title';

const RoadmapWrapper = styled.div`
  position: relative;
  height: 460px;
  padding-top: 70px;
  .disabled-control-r-olling-btn {
    color: #eee;
    cursor: not-allowed;
  }

  .control-rolling-btn {
    position: absolute;
    z-index: 1;
    width: 50px;
    height: 50px;
    border: 0;
    border-radius: 50%;
    margin-top: 50px;
    background-color: #fff;
    box-shadow: 0 0 10px 5px #1b1b1b09;
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    padding-top: 32px;
    .control-rolling-btn {
      width: 40px;
      height: 40px;
    }
  }
`;

const Roadmap = styled.div`
  overflow: hidden;
  margin: 0 auto;
  transition: all 0.6s ease-out;
  z-index: 1;
  margin-top: -10px;

  @media only screen and (min-width: 1420px) {
    width: 1192px;
  }

  @media only screen and (max-width: 1420px) {
    width: 888px;
  }

  @media only screen and (max-width: 1140px) {
    width: 584px;
  }

  @media only screen and (max-width: 840px) {
    width: 280px;
  }
`;

const Roadline = styled.div`
  position: absolute;
  top: 143px;
  left: 50%;
  margin: 10px 0;
  transform: translateX(-50%);

  .next-btn {
    right: -100px;
    transition: all 0.5s;
  }

  .prev-btn {
    left: -100px;
    transition: all 0.5s;
  }

  @media only screen and (min-width: 1420px) {
    width: 1192px;
  }

  @media only screen and (max-width: 1420px) {
    width: 888px;
  }

  @media only screen and (max-width: 1140px) {
    width: 584px;
  }

  @media only screen and (max-width: 840px) {
    width: 280px;
  }

  @media only screen and (max-width: 768px) {
    top: 103px;
  }

  @media only screen and (max-width: 520px) {
    .next-btn {
      right: -60px;
    }

    .prev-btn {
      left: -60px;
    }
  }
  @media only screen and (max-width: 375px) {
    .next-btn {
      right: -45px;
    }

    .prev-btn {
      left: -45px;
    }
  }
`;

const RadmapRollWrapper = styled.div`
  z-index: 1;
  overflow: hidden;
  margin-left: 0;
  transition: all 0.3s;
  white-space: nowrap;
  height: 316px;
`;

const RoadmapCardWrapper = styled.div`
  display: inline-block;
`;

const RoadmapCard = styled.div`
  position: relative;
  vertical-align: top;
  display: inline-block;
  display: flex;
  flex-direction: column;
  width: 280px;
  /* height: 216px; */
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
  margin-right: 24px;
  background-image: linear-gradient(180deg, #fff 0%, rgb(255 255 255 / 50%) 100%);
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 3%);
  text-align: center;

  a {
    color: rgba(0, 96, 230, 1);
  }
`;

const CarouselRoadMap: React.FC<IProps> = (props) => {
  const {
    carouselData,
    titleInfo,
    content,
    extraContent,
    rollContent,
    cardStyle,
    buttonStyle,
    startFromBeginning,
  } = props;
  const [rollingWidth, setRollingWidth] = useState<number>(0);
  const { width: wWidth } = useWindowSize();

  const refs = useRef<Record<string, HTMLDivElement>>({});
  const roadmapRef = useRef<HTMLDivElement>(null);

  const animate = useAnimate({
    scrollHeight: 1650,
    beforeEffect: {
      opacity: 0,
      translate: 'translateY(30px)',
    },
    afterEffect: {
      opacity: 1,
      translate: ` translateY(0px)`,
    },
  });

  const marginRight = 24;
  const boxWidth = 280;

  const isDisabledPrevBtn = rollingWidth === 0;

  const roadWidth = useMemo(() => {
    let rWidth = 0;

    if (wWidth > 1420) {
      rWidth = 1192;
    } else if (wWidth <= 1420 && wWidth > 1140) {
      rWidth = 888;
    } else if (wWidth <= 1140 && wWidth > 840) {
      rWidth = 584;
    } else if (wWidth <= 840) {
      rWidth = 280;
    }

    return rWidth;
  }, [wWidth]);

  useEffect(() => {
    if (startFromBeginning) {
      return;
    }
    // should refactor
    const boxCount = (roadWidth + marginRight) / (boxWidth + marginRight);
    const totalCount = carouselData.length;

    const moveCount = totalCount - boxCount - 1;
    setRollingWidth(-moveCount * (boxWidth + marginRight));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselData.length]);

  /**
   * 处理 NextBtn 的禁用逻辑
   */
  const isDisabledNextBtn = useMemo(() => {
    const count = Math.ceil(roadWidth / (boxWidth + marginRight));

    return (
      carouselData.length * (boxWidth + marginRight) -
        count * (boxWidth + marginRight) +
        rollingWidth ===
      0
    );
  }, [rollingWidth, roadWidth, carouselData.length]);

  /**
   * 响应式调整 roadmap 结尾处展示逻辑
   */
  useEffect(() => {
    const isOutOfRange =
      Math.abs(rollingWidth) +
      roadWidth -
      (carouselData.length * (boxWidth + marginRight) - marginRight);

    if (isOutOfRange > 0) {
      setRollingWidth(rollingWidth + isOutOfRange);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roadWidth, carouselData.length]);

  return (
    <RoadmapWrapper>
      <Title marginTop={titleInfo.marginTop} marginBottom={40}>
        {titleInfo.title}
      </Title>
      <Roadline>
        {extraContent}
        <button
          type="button"
          disabled={isDisabledPrevBtn}
          style={buttonStyle}
          className={`control-rolling-btn prev-btn ${
            isDisabledPrevBtn ? 'disabled-control-rolling-btn' : ''
          }`}
          onClick={() => {
            if (rollingWidth >= 0) {
              return;
            }
            setRollingWidth(rollingWidth + (boxWidth + marginRight));
          }}
        >
          {'<'}
        </button>
        <button
          type="button"
          disabled={isDisabledNextBtn}
          style={buttonStyle}
          className={`control-rolling-btn next-btn ${
            isDisabledNextBtn ? 'disabled-control-rolling-btn' : ''
          }`}
          onClick={() => {
            setRollingWidth(rollingWidth - (boxWidth + marginRight));
          }}
        >
          {'>'}
        </button>
      </Roadline>
      <Roadmap
        ref={roadmapRef}
        style={{
          opacity: animate.opacity,
          transform: animate.translate,
        }}
      >
        <RadmapRollWrapper style={{ marginLeft: rollingWidth }}>
          {carouselData.map((data) => {
            return (
              <RoadmapCardWrapper key={data.id}>
                {rollContent?.map((item) => (
                  <>
                    <div style={item.style}>
                      {item.type === 'span' && <span style={item.span} />}
                      {data?.[item.key]}
                    </div>
                  </>
                ))}
                <RoadmapCard
                  style={cardStyle}
                  ref={(el) => el && (refs.current[data.id] = el)}
                  key={data.id}
                >
                  {content?.map((item) => (
                    <>
                      {item.type === 'default' && (
                        <div style={item.style}>{data[item.key]}</div>
                      )}
                      {item.type === 'img' && (
                        <div style={item.style}>
                          <img style={{ width: '100%' }} src={data.img} />
                          {data[item.key]}
                        </div>
                      )}
                      {item.type === 'link' &&
                        data?.version !== 'next' &&
                        data?.link && (
                          <div style={item.style}>
                            <a href={data.link} target="_blank" rel="noreferrer">
                              {'查看详情 >'}
                            </a>
                          </div>
                        )}
                      {item.type === 'list' && (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            height: '100%',
                          }}
                        >
                          {data.version !== 'next' ? (
                            data.descList.map((desc: string) => {
                              return (
                                <p style={item.p} key={desc}>
                                  {desc}
                                </p>
                              );
                            })
                          ) : (
                            <div className="goto-detail">
                              <h1
                                style={{
                                  fontSize: 70,
                                  color: '#dddddd',
                                  margin: '12px 0',
                                }}
                              >
                                ?
                              </h1>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ))}
                </RoadmapCard>
              </RoadmapCardWrapper>
            );
          })}
        </RadmapRollWrapper>
      </Roadmap>
    </RoadmapWrapper>
  );
};

export default CarouselRoadMap;

interface IProps {
  carouselData: Record<string, any>[];
  titleInfo: Record<string, any>;
  content: Record<string, any>[];
  extraContent?: any;
  rollContent?: Record<string, any>[];
  cardStyle?: Record<string, any>;
  buttonStyle?: Record<string, any>;
  startFromBeginning?: boolean;
}
