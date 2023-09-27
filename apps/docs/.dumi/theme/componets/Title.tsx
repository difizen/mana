import type { ReactElement } from 'react';
import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.h1`
  margin-top: 80px;
  margin-bottom: 40px;
  font-size: 36px;
  line-height: 50px;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  font-size: 24px;
`;

export const Title: React.FC = ({
  marginTop,
  marginBottom,
  children,
}: {
  children: ReactElement | string;
  marginTop?: number;
  marginBottom?: number;
}) => {
  return <TitleWrapper style={{ marginTop, marginBottom }}>{children}</TitleWrapper>;
};
