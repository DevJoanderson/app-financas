import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export function ChartContainer({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
 display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px #ccc;

  & > div {
    flex: 1;
    min-width: 280px;
    max-width: 500px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    & > div {
      width: 100%;
      max-width: none;
    }
  }
`;