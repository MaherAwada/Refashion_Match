import React, { useState } from 'react';
import { Pressable, View, Text, Modal, FlatList, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
};

export default function FilterDropdown({ label, value, options, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable style={styles.trigger} onPress={() => setOpen(true)}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </Pressable>

      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>{label}</Text>
          <FlatList
            data={options}
            keyExtractor={(i) => i}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            renderItem={({ item }) => (
              <Pressable
                style={styles.option}
                onPress={() => { onChange(item); setOpen(false); }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fff' },
  label: { fontSize: 12, color: '#6b7280' },
  value: { fontSize: 14, fontWeight: '600' },
  backdrop: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.25)' },
  sheet: { position: 'absolute', left: 16, right: 16, top: 120, backgroundColor: '#fff', borderRadius: 14, padding: 14, elevation: 8 },
  sheetTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  sep: { height: 1, backgroundColor: '#f3f4f6' },
  option: { paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8 },
  optionText: { fontSize: 16 }
});
