import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../ui/ProductCard';
import FilterDropdown from '../ui/FilterDropdown';
import MenuSheet from '../ui/MenuSheet';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

const IMG_RUSTY = require('../assets/rusty.png');
const IMG_LOGO  = require('../assets/logo.png');
const IMG_MENU  = require('../assets/menu.png');

const STORAGE_KEY = '@refashion_filters_v1';

export default function MarketplaceScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [menuOpen, setMenuOpen] = useState(false);

  const [priceSort, setPriceSort] = useState<'Todos'|'Menor'|'Maior'>('Todos');
  const [category, setCategory]   = useState<'Todas'|'Jaquetas'|'Camisas'>('Todas');
  const [location, setLocation]   = useState<'Todas'|'SP'|'RJ'|'BH'|'POA'|'SSA'|'CTBA'>('Todas');

  useEffect(() => { (async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    if (s) { const v = JSON.parse(s); setPriceSort(v.priceSort ?? 'Todos'); setCategory(v.category ?? 'Todas'); setLocation(v.location ?? 'Todas'); }
  })(); }, []);
  useEffect(() => { AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ priceSort, category, location })); }, [priceSort, category, location]);

  const PRODUCTS = useMemo(() => [
    { id: '1', title: 'Rusty Chic', price: 100, location: 'SP',  image: IMG_RUSTY },
    { id: '2', title: 'Rusty Chic', price: 90,  location: 'RJ',  image: IMG_RUSTY },
    { id: '3', title: 'Rusty Chic', price: 120, location: 'SP',  image: IMG_RUSTY },
    { id: '4', title: 'Rusty Chic', price: 100, location: 'BH',  image: IMG_RUSTY },
    { id: '5', title: 'Rusty Chic', price: 80,  location: 'POA', image: IMG_RUSTY },
    { id: '6', title: 'Rusty Chic', price: 110, location: 'SSA', image: IMG_RUSTY },
    { id: '7', title: 'Rusty Chic', price: 95,  location: 'SP',  image: IMG_RUSTY },
    { id: '8', title: 'Rusty Chic', price: 100, location: 'CTBA',image: IMG_RUSTY },
  ], []);

  const filtered = useMemo(() => {
    let data = PRODUCTS.slice();
    if (category !== 'Todas') data = data.filter(p => (category === 'Jaquetas' ? true : true)); // por enquanto sem categorias reais
    if (location !== 'Todas') data = data.filter(p => p.location === location);
    if (priceSort === 'Menor') data.sort((a,b) => a.price - b.price);
    if (priceSort === 'Maior') data.sort((a,b) => b.price - a.price);
    return data;
  }, [PRODUCTS, priceSort, category, location]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Image source={IMG_LOGO} style={styles.logo} />
          <Text style={styles.title}>Marketplace</Text>
          <Pressable onPress={() => setMenuOpen(true)}>
            <Image source={IMG_MENU} style={styles.menu} />
          </Pressable>
        </View>

        {/* FILTROS */}
        <View style={styles.filters}>
          <FilterDropdown label="Preço" value={priceSort} onChange={(v) => setPriceSort(v as any)} options={['Todos','Menor','Maior']} />
          <FilterDropdown label="Categoria" value={category} onChange={(v) => setCategory(v as any)} options={['Todas','Jaquetas','Camisas']} />
          <FilterDropdown label="Local" value={location} onChange={(v) => setLocation(v as any)} options={['Todas','SP','RJ','BH','POA','SSA','CTBA']} />
        </View>

        {/* LISTA */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard title={item.title} price={item.price} image={item.image} location={item.location} />
          )}
        />

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
  container: { flex: 1, paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, marginBottom: 8 },
  logo: { width: 120, height: 42, resizeMode: 'contain' },
  title: { fontSize: 22, fontWeight: '800' },
  menu: { width: 28, height: 28, resizeMode: 'contain' },
  filters: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginBottom: 8 },
  row: { gap: 12 },
  listContent: { paddingBottom: 24, gap: 12 }
});
