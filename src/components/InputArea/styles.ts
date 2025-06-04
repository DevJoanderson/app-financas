
import {styled} from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
  margin-top: 5px;
  padding: 20px;

  input,
  select {
    flex: 1;
    min-width: 150px;
    padding: 8px;
    font-size: 16px;
    border-radius: 5px;
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: #0056b3;
    }
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
