import styled from 'styled-components';

// CONTAINER GERAL DA SEÇÃO
export const Container = styled.div`
  background-color: #fff;
  padding: 4px 6px;
  border-radius: 10px;
  box-shadow: 0 0 4px #ccc;
  margin: 16px 0;
`;

// ÁREA DO MÊS E CONTROLE
export const MonthArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;

  input {
    margin-top: 8px;
    max-width: 160px;
  }
`;

export const MonthArrow = styled.div`
  font-size: 24px;
  cursor: pointer;
  padding: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

export const MonthTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  text-align: center;
`;

// RESUMO COM VALORES (Receita, Despesa, Balanço)
export const ResumeArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

// ÁREA OPCIONAL DE FILTROS (ex: inputs, selects)
export const FilterArea = styled.div`
  margin-top: 16px;

  input,
  select {
    padding: 8px;
    font-size: 14px;
    max-width: 200px;
  }
`;

// ÁREA DOS GRÁFICOS
// Exemplo: InfoArea/styles.ts

export const ChartsArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
  width: 100%;

  > div {
    flex: 1 1 45%;
    min-width: 280px;
    max-width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    > div {
      width: 100%;
    }
  }
`;
