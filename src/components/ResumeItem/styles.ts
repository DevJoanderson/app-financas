
import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #888;
  margin-bottom: 5px;
`;

export const Info = styled.div< {color?: string }>`
text-align: center;
font-weight: bold;
color: #000;
color: ${props => props.color ?? '#000'};
`;