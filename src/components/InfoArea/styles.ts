import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 0 5px #ccc;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: column; /* Mantenha vertical se quiser ele empilhado */
    align-items: center;
    justify-content: center;
  }
`;


export const MonthArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;

  input[type="month"] {
    padding: 5px;
    font-size: 14px;
    height: 35px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;

    input[type="month"] {
      width: 100%;
    }
  }
`;


export const MonthArrow = styled.div`
  font-size: 22px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
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
