import styled from "styled-components";

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px 16px;
`;

export const Header = styled.div`
  background-color: #154c9c;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const HeaderText = styled.h1`
  margin: 0;
  padding-top: 20px;
  font-size: 1.8rem;
`;

export const Body = styled.div`
  margin-bottom: 30px;
`;

export const ResumeArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  margin: 10px 0;
`;
