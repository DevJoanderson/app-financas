import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 8px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  button {
    padding: 8px;
    font-size: 0.9rem;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    background-color: #154c9c;
    color: white;

    &:last-child {
      background-color: #aaa;
    }
  }
`;
