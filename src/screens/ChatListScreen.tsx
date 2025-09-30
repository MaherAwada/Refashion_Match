import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Pressable, FlatList, ImageSourcePropType } from 'react-native';
import MenuSheet from '../ui/MenuSheet';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

const IMG_LOGO = require('../assets/logo.png');
const IMG_MENU = require('../assets/menu.png');

// Dados de exemplo para as conversas
const CHATS = [
  {
    id: '1',
    name: 'Sara Costureira',
    lastMessage: 'Olá! Ainda tenho interesse na sua peça. Podemos fechar nos 20?',
    timestamp: '10:30',
    avatar: require('../assets/Perfilchat.jpg'), // MUDANÇA: Usando imagem existente para evitar erro
  },
  {
    id: '2',
    name: 'Ateliê da Maria',
    lastMessage: 'Sim, podemos fazer o ajuste.',
    timestamp: 'Ontem',
    avatar: require('../assets/rusty.png'), // Usando uma imagem existente como exemplo
  },
];

export default function ChatListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [menuOpen, setMenuOpen] = useState(false);

  const renderChatItem = ({ item }: { item: typeof CHATS[0] }) => (
    <Pressable style={styles.chatItem} onPress={() => navigation.navigate('Chat', { name: item.name, avatar: item.avatar })}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image source={IMG_LOGO} style={styles.logo} />
          <Text style={styles.title}>Conversas</Text>
          <Pressable onPress={() => setMenuOpen(true)}>
            <Image source={IMG_MENU} style={styles.menu} />
          </Pressable>
        </View>

        {/* LISTA DE CONVERSAS */}
        <FlatList
          data={CHATS}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        {/* MENU */}
        <MenuSheet
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          goToMarketplace={() => navigation.navigate('Marketplace')}
          goToMatch={() => navigation.navigate('Match')}
          goToChat={() => navigation.navigate('ChatList')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  logo: { width: 120, height: 42, resizeMode: 'contain' },
  title: { fontSize: 22, fontWeight: '800' },
  menu: { width: 28, height: 28, resizeMode: 'contain' },
  
  separator: { height: 1, backgroundColor: '#f3f4f6', marginLeft: 80 },
  chatItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 16, fontWeight: 'bold' },
  lastMessage: { fontSize: 14, color: '#6b7280' },
  timestamp: { fontSize: 12, color: '#6b7280' },
});