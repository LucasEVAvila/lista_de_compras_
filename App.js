import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  FlatList, KeyboardAvoidingView, Platform, Keyboard, Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [item, setItem] = useState('');
  const [categoria, setCategoria] = useState('Geral');
  const [lista, setLista] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const dadosSalvos = await AsyncStorage.getItem('@estoque_app');
      if (dadosSalvos) setLista(JSON.parse(dadosSalvos));
    }
    carregarDados();
  }, []);

  useEffect(() => {
    async function salvarDados() {
      await AsyncStorage.setItem('@estoque_app', JSON.stringify(lista));
    }
    salvarDados();
  }, [lista]);

  const adicionarItem = () => {
    if (item.trim() === '') return;
    const novoObjeto = {
      id: Date.now().toString(),
      label: item,
      tag: categoria,
      finalizado: false
    };
    setLista([...lista, novoObjeto]);
    setItem('');
    Keyboard.dismiss();
  };

  const inverterStatus = (id) => {
    setLista(lista.map(i => i.id === id ? { ...i, finalizado: !i.finalizado } : i));
  };

  const removerDaLista = (id) => {
    setLista(lista.filter(i => i.id !== id));
  };

  const resetarTudo = () => {
    Alert.alert("Esvaziar Carrinho", "Tem certeza que deseja apagar todos os registros?", [
      { text: "Manter", style: "cancel" },
      { text: "Apagar", onPress: () => setLista([]), style: "destructive" }
    ]);
  };

  const contagemConcluidos = lista.filter(i => i.finalizado).length;

  return (
    <View style={styles.container}>
      {/* Header Customizado */}
      <View style={styles.topo}>
        <View>
          <Text style={styles.saudacao}>Meu Checkout</Text>
          <Text style={styles.subtitulo}>{lista.length} itens no total</Text>
        </View>
        <TouchableOpacity onPress={resetarTudo} style={styles.botaoLixeira}>
          <Ionicons name="receipt-outline" size={26} color="#2D3436" />
        </TouchableOpacity>
      </View>

      {/* Painel de Resumo */}
      <View style={styles.cardResumo}>
        <Text style={styles.textoResumo}>Concluídos: {contagemConcluidos}</Text>
        <Text style={styles.textoResumo}>Faltando: {lista.length - contagemConcluidos}</Text>
      </View>

      <FlatList
        data={lista}
        contentContainerStyle={{ paddingBottom: 150 }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.cardItem, item.finalizado && styles.cardFinalizado]}>
            <TouchableOpacity onPress={() => inverterStatus(item.id)} style={styles.itemConteudo}>
              <View style={[styles.checkCircle, item.finalizado && styles.checkCircleAtivo]}>
                {item.finalizado && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <View>
                <Text style={[styles.nomeItem, item.finalizado && styles.nomeItemRiscado]}>
                  {item.label}
                </Text>
                <Text style={styles.tagItem}>{item.tag}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => removerDaLista(item.id)}>
              <Ionicons name="trash-outline" size={20} color="#E74C3C" />
            </TouchableOpacity>
          </View>
        )}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.containerInput}
      >
        <View style={styles.areaInputPrincipal}>
          <TextInput
            style={styles.inputTxt}
            placeholder="O que vamos comprar hoje?"
            placeholderTextColor="#95a5a6"
            value={item}
            onChangeText={setItem}
          />
          <View style={styles.areaPicker}>
            <Picker
              selectedValue={categoria}
              onValueChange={(val) => setCategoria(val)}
              style={styles.pickerEstilo}
            >
              <Picker.Item label="🛒 Geral" value="Geral" />
              <Picker.Item label="🍎 Alimento" value="Alimento" />
              <Picker.Item label="🧼 Limpeza" value="Limpeza" />
              <Picker.Item label="🥤 Bebida" value="Bebida" />
            </Picker>
          </View>
        </View>
        
        <TouchableOpacity style={styles.botaoAdd} onPress={adicionarItem}>
          <Text style={styles.textoBotao}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  topo: { 
    paddingTop: 60, 
    paddingHorizontal: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 10
  },
  saudacao: { fontSize: 26, fontWeight: '800', color: '#2D3436' },
  subtitulo: { fontSize: 14, color: '#636E72' },
  cardResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2D3436',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20
  },
  textoResumo: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  cardItem: { 
    backgroundColor: '#FFF', 
    padding: 18, 
    borderRadius: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginHorizontal: 20, 
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3
  },
  cardFinalizado: { backgroundColor: '#F1F2F6', opacity: 0.7 },
  itemConteudo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  checkCircle: { 
    width: 24, 
    height: 24, 
    borderRadius: 12, 
    borderWidth: 2, 
    borderColor: '#00B894', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  checkCircleAtivo: { backgroundColor: '#00B894' },
  nomeItem: { fontSize: 16, marginLeft: 15, fontWeight: '600', color: '#2D3436' },
  nomeItemRiscado: { textDecorationLine: 'line-through', color: '#B2BEC3' },
  tagItem: { fontSize: 11, marginLeft: 15, color: '#00B894', fontWeight: 'bold', textTransform: 'uppercase' },
  containerInput: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    padding: 20, 
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  areaInputPrincipal: { flex: 1 },
  inputTxt: { 
    height: 45, 
    backgroundColor: '#F1F2F6', 
    borderRadius: 10, 
    paddingHorizontal: 15,
    marginBottom: 5 
  },
  areaPicker: { height: 40, justifyContent: 'center' },
  pickerEstilo: { width: '100%', color: '#636E72' },
  botaoAdd: { 
    backgroundColor: '#00B894', 
    width: 60, 
    height: 60, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 15,
    elevation: 5
  },
  textoBotao: { color: 'white', fontSize: 30, fontWeight: 'bold' }
});