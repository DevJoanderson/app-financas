import { styled } from 'styled-components';

export const Container = styled.div`
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 16px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;

  input, select {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 6px;
    min-width: 100px;
    font-size: 14px;
  }

  button {
    background-color: #00c897;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 6px 10px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: #00b388;
    }
    @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;

    input, select, button {
      width: 100%;
    }
  }


  }
`;


  