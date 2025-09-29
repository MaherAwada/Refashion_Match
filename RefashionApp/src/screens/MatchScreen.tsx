import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import MenuSheet from '../ui/MenuSheet';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

const IMG_LOGO = require('../assets/logo.png');
const IMG_MENU = require('../assets/menu.png');
const IMG_ITEM = require('../assets/rusty.png'); // troque se quiser

export default function MatchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image source={IMG_LOGO} style={styles.logo} />
          <Text style={styles.title}>Match Page</Text>
          <Pressable onPress={() => setMenuOpen(true)}>
            <Image source={IMG_MENU} style={styles.menu} />
          </Pressable>
        </View>

        {/* IMAGEM */}
        <View style={styles.card}>
          <Image source={IMG_ITEM} style={styles.image} />
          {/* se quiser a linha divisória central depois, a gente põe */}
        </View>

        <Text style={styles.question}>Gostou dessa transformação?</Text>

        <View style={styles.actions}>
          <Pressable style={[styles.cta, styles.like]}>
            <Text style={styles.ctaIcon}>❤</Text>
            <Text style={styles.ctaTextWhite}>Curtir</Text>
          </Pressable>

          <Pressable style={[styles.cta, styles.discard]}>
            <Text style={styles.ctaIcon}>✕</Text>
            <Text style={styles.ctaTextDark}>Descartar</Text>
          </Pressable>
        </View>

        {/* MENU */}
        <MenuSheet
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          goToMarketplace={() => navigation.navigate('Marketplace')}
          goToMatch={() => navigation.navigate('Match')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 16, gap: 12 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  logo: { width: 120, height: 42, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: '800' },
  menu: { width: 28, height: 28, resizeMode: 'contain' },

  card: { height: 260, borderRadius: 24, overflow: 'hidden', backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },

  question: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginTop: 8 },

  actions: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 8, gap: 14 },
  cta: { width: 140, height: 140, borderRadius: 70, alignItems: 'center', justifyContent: 'center', gap: 6 },
  like: { backgroundColor: '#ef4444' },
  discard: { backgroundColor: '#d1d5db' },
  ctaIcon: { fontSize: 28, fontWeight: '800' },
  ctaTextWhite: { color: '#fff', fontSize: 16, fontWeight: '800' },
  ctaTextDark: { color: '#111827', fontSize: 16, fontWeight: '800' }
});
