import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Produto } from "../models/Produto";
import GestorDados from "../DataBase/GestorDados";
import ProdutoItem from "../components/ProdutoItem";

export default function PersistenciaScreen() {
  const [listaProdutos, setListaProdutos] = useState([]);

  // Variáveis para guardar o que você digitar no teclado
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const isFocused = useIsFocused();

  const atualizarLista = async () => {
    const dados = await GestorDados.obterTodos();
    setListaProdutos(dados);
  };

  useEffect(() => {
    if (isFocused) {
      atualizarLista();
    }
  }, [isFocused]);

  // Função para salvar o que foi digitado
  const salvarDigitado = async () => {
    if (!codigo || !nome || !quantidade) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    // Cria o produto com os dados das caixas de texto
    let novoProduto = new Produto(parseInt(codigo), nome, parseInt(quantidade));
    await GestorDados.adicionar(novoProduto);

    Alert.alert("Sucesso", "Produto cadastrado no estoque!");

    // Limpa os campos depois de salvar
    setCodigo("");
    setNome("");
    setQuantidade("");

    atualizarLista();
  };

  // Função que passaremos para o ProdutoItem poder se apagar
  const apagarItem = async (codigoItem) => {
    await GestorDados.remover(codigoItem);
    atualizarLista();
  };

  const myKeyExtractor = (item) => item.codigo.toString();

  return (
    <View style={styles.container}>
      {/* Área do Formulário de Digitação */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Código (Ex: 3)"
          keyboardType="numeric"
          value={codigo}
          onChangeText={setCodigo}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome (Ex: Saca de Trigo)"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade (Ex: 80)"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />

        <TouchableOpacity style={styles.button} onPress={salvarDigitado}>
          <Text style={styles.buttonTextBig}>Salvar</Text>
        </TouchableOpacity>
      </View>

      {/* Área da Lista */}
      <View style={styles.itemsContainer}>
        <FlatList
          style={styles.scrollContainer}
          data={listaProdutos}
          keyExtractor={myKeyExtractor}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              O armazém está vazio.
            </Text>
          }
          renderItem={({ item }) => (
            <ProdutoItem
              produto={item}
              onDelete={() => apagarItem(item.codigo)} // Passando a função de apagar
            />
          )}
        />
      </View>
    </View>
  );
}

// OS ESTILOS EXATOS DA ESTÁCIO QUE VOCÊ ENVIOU
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", marginTop: 10, width: "100%" },
  scrollContainer: { width: "90%" },
  itemsContainer: {
    marginTop: 10,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    marginLeft: "5%",
    width: "90%",
    padding: 20,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    paddingBottom: 10,
    marginTop: 10,
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "stretch",
    borderWidth: 1,
    borderColor: "#ccc",
  }, // Adicionei uma bordinha leve para você enxergar a caixa na Web
  button: {
    marginTop: 10,
    marginBottom: 10,
    height: 60,
    backgroundColor: "blue",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: "#ccc",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  buttonTextBig: { color: "#fff", fontWeight: "bold", fontSize: 24 },
  textItem: { fontSize: 20 },
  deleteButton: {
    marginLeft: 10,
    height: 40,
    width: 40,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    fontSize: 12,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: "#ccc",
    alignItems: "center",
  },
});
