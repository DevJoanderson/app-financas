import styled from "styled-components";

// Wrapper continua como está (mantemos para desktop)
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto; /* Adiciona rolagem horizontal se o conteúdo for maior que o container */
  overflow-y: hidden;
  background-color: transparent;

  -webkit-overflow-scrolling: touch; // Para suavizar scroll no iOS

  @media (max-width: 768px) {
    overflow-x: auto;
    overflow-x: hidden;
    box-shadow: none;
    background-color: transparent;
  }
`;

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
  margin-top: 20px;
  transition: opacity 0.3s ease-in-out;

  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

export const TableHeadColumn = styled.th<{ width?: number }>`
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  padding: 10px 0;
  text-align: left;

  @media (max-width: 700px) {
    padding: 8px 5px;
    font-size: 0.8em;
  }

  @media (max-width: 503px) {
    padding: 5px 3px;
    font-size: 0.75em;
  }
`;

// Adiciona os novos estilos para mobile
export const TableMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 8px 5px;
    font-size: 0.8em;
    gap: 10px;
    margin-top: 20px;
    opacity: 1;
  }

  @media (max-width: 503px) {
    padding: 5px 3px;
    font-size: 0.75em;
  }
`;

export const Card = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #ccc;
  display: flex;
  flex-direction: column;
  gap: 5px;
  word-break: break-word; // para evitar overflow com textos longos
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  span:first-child {
    font-weight: bold;
    color: #888;
  }

  span:last-child {
    font-weight: bold;
    color: #000;
  }
`;
