import styled from 'styled-components';

export const MainContainer = styled.div`
   max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
