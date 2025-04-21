
import {styled} from 'styled-components'

export const Container = styled.div`
 display: flex;
 gap: 16px;
 background-color: #fff;
 box-shadow: 0px 0px 5px #ccc;
 border-radius: 10px;
 margin-top: 20px;
 padding: 20px;


 input, select {
  
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
    margin-left: 5px;
    &:hover {
      background-color: #0056b3;
    }
  }

 `;
