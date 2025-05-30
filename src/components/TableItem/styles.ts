import styled from 'styled-components';

export const TableLine = styled.tr`
  transition: background 0.2s;

  &:hover {
    background-color: #f8f8f8;
  }
`;

export const TableColumn = styled.td`
  padding: 8px 6px;
  font-size: 0.9rem;
`;

export const Category = styled.div<{ color: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #fff;
  background-color: ${props => props.color};
  text-transform: capitalize;
`;

export const Value = styled.div<{ color: string }>`
  font-weight: bold;
  color: ${props => props.color};
  font-size: 0.9rem;
`;
