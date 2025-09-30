import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MenuSheet from '../ui/MenuSheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
};

const IMG_MENU = require('../assets/menu.png');

export default function ChatScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { name = 'Contato', avatar = require('../assets/Perfilchat.jpg') } = (route.params as RootStackParamList['Chat']) || {};
  const [menuOpen, setMenuOpen] = useState(false);

  // Estado para as mensagens e para o texto do input
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Olá! Ainda Tenho interesse na sua peça. Podemos fechar nos 20?', sender: 'other', timestamp: '10:25' },
    { id: '2', text: 'Oi! Fica R$ 25,00. Ainda tem interesse? Podemos fechar?', sender: 'me', timestamp: '10:26' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const newMessage: Message = {
      id: String(Date.now()),
      text: inputText,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [newMessage, ...prev]);
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </Pressable>
          <Image source={avatar} style={styles.perfilImage} />
          <Text style={styles.title}>{name}</Text>
        </View>
        <Pressable onPress={() => setMenuOpen(true)}>
          <Image source={IMG_MENU} style={styles.menu} />
        </Pressable>
      </View>

      {/* LISTA DE MENSAGENS */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
            <View>
              <Text style={item.sender === 'me' ? styles.myMessageText : styles.otherMessageText}>
                {item.text}
              </Text>
              <Text style={[styles.timestamp, item.sender === 'me' ? styles.myTimestamp : styles.otherTimestamp]}>
                {item.timestamp}
              </Text>
            </View>
          </View>
        )}
        inverted 
        style={styles.chatList}
        contentContainerStyle={styles.chatListContent}
      />

      {/* INPUT DE MENSAGEM */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputContainer}>
          <Pressable style={styles.attachButton} onPress={() => { /* Lógica para anexar imagem aqui */ }}>
            <Text style={styles.attachButtonText}>+</Text>
          </Pressable>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#9ca3af"
          />
          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <MenuSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        goToMarketplace={() => navigation.navigate('Marketplace')}
        goToMatch={() => navigation.navigate('Match')}
        goToChat={() => navigation.navigate('ChatList')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backButton: { paddingRight: 10 },
  backButtonText: { fontSize: 24, fontWeight: '300', color: '#374151' },
  perfilImage: { width: 40, height: 40, borderRadius: 20 },
  title: { fontSize: 18, fontWeight: '800' },
  menu: { width: 28, height: 28, resizeMode: 'contain' },

  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    flexDirection: 'row',
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#3b82f6', // Azul
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: '#e5e7eb', // Cinza
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  myMessageText: {
    color: '#fff',
    fontSize: 15,
  },
  otherMessageText: {
    color: '#1f2937',
    fontSize: 15,
  },

  timestamp: {
    fontSize: 11,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  myTimestamp: {
    color: '#a5b4fc', // Azul claro
  },
  otherTimestamp: {
    color: '#9ca3af', // Cinza
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 10,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachButtonText: {
    fontSize: 24,
    color: '#6b7280',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
