import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";

export default function ArrastoScreen() {
  // 1. Criamos a variável que guarda a posição do objeto
  const pan = useRef(new Animated.ValueXY()).current;

  // 2. Configuramos o "Responder" (o vigia que observa o dedo no objeto)
  const panResponder = useRef(
    PanResponder.create({
      // Permite que o gesto comece
      onMoveShouldSetPanResponder: () => true,

      // Enquanto você arrasta, ele atualiza a posição do Animated.ValueXY
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),

      // Quando você solta o objeto
      onPanResponderRelease: () => {
        // Opção B ativada: O efeito mola que o faz voltar ao centro!
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Arraste o quadrado laranja!</Text>

      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers} // Aqui ligamos os sensores de toque no quadrado
      />
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
  titulo: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: "orange",
    borderRadius: 10,
    elevation: 5, // Sombra no Android
  },
});
