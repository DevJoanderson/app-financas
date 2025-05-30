import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 100px;
  margin: 6px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.04);
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 5px;
`;

export const Info = styled.div<{ color?: string }>`
  font-size: 1rem;
  font-weight: bold;
  color: ${props => props.color ?? '#000'};
`;
