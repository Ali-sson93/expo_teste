import React from "react";
import {
  Platform, // <-- Importamos a ferramenta que descobre o sistema
  UIManager, // <-- Importamos direto do React Native
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

// O "Pulo do Gato": Só ativa a animação se for Android E se o UIManager existir
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class AnimacaoLayoutScreen extends React.Component {
  state = { w: 200, h: 200 };

  _onPress = () => {
    LayoutAnimation.spring();
    this.setState({ w: this.state.w - 15, h: this.state.h - 15 });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[styles.box, { width: this.state.w, height: this.state.h }]}
        />
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Pressione para diminuir o quadrado
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "orange",
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
