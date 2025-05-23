
import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  min-width: 100px;
  margin: 10px;
  
  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    text-align: center;
  }
`;

export const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #888;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Info = styled.div< {color?: string }>`
text-align: center;
font-weight: bold;
color: #000;
color: ${props => props.color ?? '#000'};

@media (max-width: 768px) {
  font-size: 14px;
}
`;