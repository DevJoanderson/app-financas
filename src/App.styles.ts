import styled from 'styled-components';

export const Container = styled.div`
  max-width: 980px;
  margin: auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Header = styled.div`
  background-color: rgb(18, 64, 148);
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: auto;
    padding: 20px 10px;
  }
`;

export const HeaderText = styled.h1`
  margin: 0;
  padding: 0;
  color: white;
  padding-top: 30px;
  font-size: 2rem;

  @media (max-width: 768px) {
    padding-top: 10px;
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const Body = styled.div`
  margin: auto;
  max-width: 980px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 480px) {
    padding: 0 5px;
    margin-bottom: 30px;
  }
`;
export const ResumeArea = styled.div`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

