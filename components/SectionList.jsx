import React from "react";
import { StyleSheet, Text, View, SectionList, StatusBar } from "react-native";

const DADOS = [
  {
    titulo: "Eletrônicos",
    data: ["TV", "Caixa de Som", "Toca-discos Retrô"],
  },
  {
    titulo: "Vestuário",
    data: ["Camisas", "Camisetas", "Casacos"],
  },
  {
    titulo: "Livros",
    data: ["Ficção", "Suspense", "Policiais"],
  },
];

const Item = ({ titulo }) => (
  <View style={styles.item}>
    <Text style={styles.titulo}>{titulo}</Text>
  </View>
);

const App = () => (
  <View style={styles.container}>
    <SectionList
      sections={DADOS}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item titulo={item} />}
      renderSectionHeader={({ section: { titulo } }) => (
        <Text style={styles.header}>{titulo}</Text>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#fffccc",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
  },
});

export default App;
