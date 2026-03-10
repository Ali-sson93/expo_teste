import React, { useRef } from "react";
import { Animated, View, Button, StyleSheet } from "react-native";

export default function AnimacaoFadeScreen() {
  // 1. Criamos a referência da animação começando em 0 (invisível)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 2. Função para aparecer (Fade In)
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Vai para opacidade total
      duration: 5000, // Em 1 segundo
      useNativeDriver: true,
    }).start();
  };

  // 3. Função para sumir (Fade Out)
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Volta para invisível
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* A View que vai sofrer a animação */}
      <Animated.View
        style={[
          styles.fadingContainer,
          { opacity: fadeAnim }, // Aqui a mágica acontece
        ]}
      >
        <Animated.Text style={styles.fadingText}>
          Fading View! Caralho😜
        </Animated.Text>
      </Animated.View>

      {/* Área dos Botões */}
      <View style={styles.buttonRow}>
        <Button title="Fade In" onPress={fadeIn} color="green" />
        <View style={{ width: 20 }} />
        <Button title="Fade Out" onPress={fadeOut} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "blue",
    borderRadius: 10,
    marginBottom: 30,
  },
  fadingText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  buttonRow: {
    flexDirection: "row",
  },
});
