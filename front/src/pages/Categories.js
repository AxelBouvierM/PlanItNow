import styled from 'styled-components';
import React from 'react';
import montaña2 from '../images/montaña2.jpg'


const Background = styled.div`
  border: 1px solid #000; 
  background-image: url(${montaña2});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

function Categories() {
  return (
    <Background>
      <h1>PAGINA CATEGORIAS</h1>
    </Background>
  )
}

export default Categories;