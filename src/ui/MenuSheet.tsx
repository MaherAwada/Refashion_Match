import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  open: boolean;
  onClose: () => void;
  goToMarketplace: () => void;
  goToMatch: () => void;
  goToChat: () => void;
};

export default function MenuSheet({ open, onClose, goToMarketplace, goToMatch, goToChat }: Props) {
  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.panel}>
        <Text style={styles.title}>Menu</Text>

        <Pressable style={styles.item} onPress={() => { goToMarketplace(); onClose(); }}>
          <Text style={styles.itemText}>Marketplace</Text>
        </Pressable>

        <Pressable style={styles.item} onPress={() => { goToMatch(); onClose(); }}>
          <Text style={styles.itemText}>Match Page</Text>
        </Pressable>

        <Pressable style={styles.item} onPress={() => { goToChat(); onClose(); }}>
          <Text style={styles.itemText}>Chat</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.25)' },
  panel: { position: 'absolute', top: 0, bottom: 0, left: 0, width: 260, backgroundColor: '#fff', paddingTop: 48, paddingHorizontal: 16, elevation: 12 },
  title: { fontSize: 18, fontWeight: '800', marginBottom: 16 },
  item: { paddingVertical: 14 },
  itemText: { fontSize: 16, fontWeight: '600' }
});
