import { useState, useRef, useEffect } from "react"; // Importe useEffect
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import FokusButton from "../components/FokusButton"; // Certifique-se de que os caminhos estão corretos
import ActionButton from "../components/ActionButton"; // Certifique-se de que os caminhos estão corretos
import { IconPause, IconPlay } from "../components/icons"; // Certifique-se de que os caminhos estão corretos

const pomodoro = [
  {
    id: 1,
    display: "Foco",
    time: 25, // Estes são minutos
    image: require('./Imagens/foco.png') // Caminho relativo, certifique-se que está correto
  },
  {
    id: 2,
    display: "Pausa Curta",
    time: 5,  // Estes são minutos
    image: require('./Imagens/descanso_curto.png') // Caminho relativo, certifique-se que está correto
  },
  {
    id: 3,
    display: "Pausa Longa",
    time: 15, // Estes são minutos
    image: require('./Imagens/descanso_longo.png') // Caminho relativo, certifique-se que está correto
  }
];

// Função auxiliar para formatar segundos em MM:SS
const formatTime = (totalSeconds) => {
  const minutesPart = Math.floor(totalSeconds / 60);
  const secondsPart = totalSeconds % 60;

  const formattedMinutes = String(minutesPart).padStart(2, '0');
  const formattedSeconds = String(secondsPart).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

export default function Index() {
  const [timerType, setTimerType] = useState(pomodoro[0]); // Começa com Foco (25 minutos)
  const [timerRunning, setTimerRunning] = useState(false);
  // Estado para o tempo restante em segundos
  const [timeLeft, setTimeLeft] = useState(pomodoro[0].time * 60);

  // useRef agora dentro do componente
  const timerRef = useRef(null);

  // useEffect para resetar o tempo quando o tipo de timer muda
  useEffect(() => {
    // Para garantir que o tempo é atualizado para o novo tipo de timer
    setTimeLeft(timerType.time * 60);
    clear(); // Limpa qualquer timer anterior ao mudar o tipo
  }, [timerType]); // Dependência: executa quando timerType muda

  // useEffect para gerenciar o setInterval
  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) { // Quando chega a 0 ou menos, limpa o timer
            clearInterval(timerRef.current);
            timerRef.current = null;
            setTimerRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!timerRunning && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Função de limpeza para quando o componente for desmontado ou o efeito reexecutado
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timerRunning, timeLeft]); // Dependências: executa quando timerRunning ou timeLeft muda

  // Função para limpar o timer
  const clear = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimerRunning(false); // Garante que o estado de execução seja false
  };

  // Função para alternar entre iniciar e pausar o timer
  const toggleTimer = () => {
    setTimerRunning((prev) => !prev); // Inverte o estado de timerRunning
  };

  // Função para alternar entre os tipos de timer
  const toggleTimerType = (newTimerType) => {
    setTimerType(newTimerType);
    // setTimeLeft é atualizado pelo useEffect quando timerType muda
    // clear já é chamado pelo useEffect também
  };

  return (
    <View style={styles.container}>
      <Image source={timerType.image} style={styles.image} /> {/* Adicione um estilo para a imagem */}
      <View style={styles.actions}>
        <View style={styles.context}>
          {pomodoro.map((item) => (
            <ActionButton
              key={item.id}
              active={timerType.id === item.id}
              onPress={() => toggleTimerType(item)}
              display={item.display}
            />
          ))}
        </View>
        <Text style={styles.timer}>
          {formatTime(timeLeft)} {/* Usa o estado timeLeft aqui */}
        </Text>
        <FokusButton
          onPress={toggleTimer}
          title={timerRunning ? "Pausar" : "Começar"}
          icon={timerRunning ? <IconPause/> : <IconPlay />}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Projeto desenvolvido por: Vinicius Rodrigues Camargo
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#021123',
    gap: 40,
  },
  image: {
    width: 200, // Exemplo de tamanho, ajuste conforme necessário
    height: 200,
    resizeMode: 'contain',
  },
  actions:{
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#14448080',
    width: '80%',
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#144480',
    gap: 32
  },
  context:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timer:{
    fontSize: 54,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    width: '80%',
  },
  footerText: {
    textAlign: 'center',
    color: '#98A0A8',
    fontSize: 12.5
  }
});