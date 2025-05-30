import styled from "styled-components";

// WRAPPER DA TABELA: Permite scroll horizontal em telas pequenas
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: transparent;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    box-shadow: none; 
  }
`;

// TABELA VISUALIZADA NO DESKTOP
export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 6px;
  border-radius: 10px;
  box-shadow: 0 0 4px rgba(0,0,0,0.05);
  margin-top: 4px;
  transition: all 0.3s ease;

  th, td {
    transition: all 0.2s ease;
  }

  @media (max-width: 768px) {
    min-width: 600px; 
  }
`;

// COLUNAS DO CABEÇALHO (Desktop)
export const TableHeadColumn = styled.th<{ width?: number }>`
  width: ${({ width }) => width ? `${width}px` : "auto"};
  padding: 6px 4px;
  text-align: left;
  font-size: 0.85rem;
  color: #555;

  @media (max-width: 700px) {
    padding: 6px 4px;
    font-size: 0.85rem;
  }

  @media (max-width: 503px) {
    padding: 4px 2px;
    font-size: 0.75rem;
  }
`;

// VERSÃO MOBILE DA TABELA: Card para cada item
export const TableMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 16px;
    font-size: 0.85rem;
  }

  @media (max-width: 503px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.72rem;
    padding: 0 4px;
  }
`;

// CARD INDIVIDUAL (usado no mobile)
export const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 120px;
  text-align: center;

  h3 {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
  }

  span {
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

// LINHA DENTRO DO CARD (ex: Data | 25/05/2025)
export const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  min-width: 120px;
  flex: 1;

  span:first-child {
    font-weight: 500;
    color: #888;
  }

  span:last-child {
    font-weight: 600;
    color: #111;
  }
`;
