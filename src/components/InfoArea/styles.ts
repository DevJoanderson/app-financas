import styled from 'styled-components';


export const Container = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px; // melhor controle
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;


export const MonthArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  input[type="month"] {
    padding: 5px;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;

    input[type='month'] {
      flex: 1;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const MonthArrow = styled.div`
  width: 40px;
  text-align: center;
  font-size: 25px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 20px;
  }
`;
export const MonthTitle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;


export const ResumeArea = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 40px;

   @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 0;
    gap: 10px;
    align-items: center;
    font-size: 14px;
  }
`;

export const FilterArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  justify-content: space-between;

  input,
  select {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    min-width: 150px;
    flex: 1;
  }

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    max-width: 150px;
  }

  button:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    input,
    select,
    button {
      width: 100%;
    }
  }
`;