import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// Importando as telas da pasta screens
import ProdutoForm from "./screens/ProdutoForm";
import ProdutoLista from "./screens/ProdutoLista";
import GestorDados from "./screens/dados/GestorDados";
new GestorDados().apagarTudo();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaProd">
        <Stack.Screen
          name="ListaProd"
          options={{ title: "Listagem de Produtos" }}
          component={ProdutoLista}
        />
        <Stack.Screen
          name="NovoProd"
          options={{ title: "Novo Produto" }}
          component={ProdutoForm}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
