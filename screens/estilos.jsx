import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

// Criando o nosso próprio componente de texto já com o estilo embutido!
const StyledText = styled.Text`
  color: blue;
  font-size: 24px;
  margin-top: 50px;
  font-weight: bold;
`;

// A caixa principal que vai centralizar tudo na tela
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f0f8ff;
`;

function EstilosScreen() {
  return (
    <Container>
      <StyledText>Texto Azul com Styled Components!</StyledText>
    </Container>
  );
}

export default EstilosScreen;
