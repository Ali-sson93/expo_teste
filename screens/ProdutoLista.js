import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// ESTA LINHA É O SEGREDO: O endereço do "cérebro" do banco
import GestorDados from "./dados/GestorDados";
import ProdutoItem from "./ProdutoItem";
import { styles } from "./CommonStyles";

export default function ProdutoLista({ navigation }) {
  // Criamos uma instância do gestor
  const gestor = new GestorDados();
  const [produtos, setProdutos] = useState([]);
  const isFocused = useIsFocused();

  // Toda vez que a tela focar, buscamos os dados
  useEffect(() => {
    gestor.obterTodos().then((objs) => setProdutos(objs));
  }, [isFocused]);

  const myKeyExtractor = (item) => {
    // Se o item existir e tiver código, usa o código.
    // Se não, gera um número aleatório só para não quebrar a tela.
    return item && item.codigo
      ? item.codigo.toString()
      : Math.random().toString();
  };

  function excluirProduto(codigo) {
    gestor.remover(codigo).then(() => {
      gestor.obterTodos().then((objs) => setProdutos(objs));
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NovoProd")}
      >
        <Text style={styles.buttonTextBig}>Novo Produto</Text>
      </TouchableOpacity>

      <FlatList
        style={styles.scrollContainer}
        data={produtos}
        contentContainerStyle={styles.itemsContainer}
        keyExtractor={myKeyExtractor}
        renderItem={({ item }) => (
          <ProdutoItem
            onDelete={() => excluirProduto(item.codigo)}
            produto={item}
          />
        )}
      />
    </View>
  );
}
