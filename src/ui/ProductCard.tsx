import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageSourcePropType } from 'react-native';

type Props = { title: string; price: number; image: ImageSourcePropType; location: string; };

export default function ProductCard({ title, price, image, location }: Props) {
  return (
    <Pressable style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.price}>{`R$ ${price}`}</Text>
      <Text style={styles.location}>{location}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 10, borderWidth: 1, borderColor: '#e5e7eb' },
  imageWrap: { height: 150, borderRadius: 12, overflow: 'hidden', backgroundColor: '#f3f4f6', marginBottom: 8 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  title: { fontSize: 14, fontWeight: '700' },
  price: { fontSize: 13, fontWeight: '600', color: '#111827' },
  location: { fontSize: 12, color: '#6b7280' }
});
