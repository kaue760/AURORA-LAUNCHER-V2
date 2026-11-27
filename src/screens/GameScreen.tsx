import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Monitoring from '../components/Monitoring/Monitoring';
import { MainContainer } from '../components/Provider/MainContainer';
import SheetServer from '../components/Sheet/SheetServer/SheetServer';

export const GameScreen = React.memo(() => {
  const detachedServerRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation<any>();

  const openUpdate = useCallback(() => {
    navigation.navigate('UpdateStartScreen');
  }, [navigation]);

  const openServers = useCallback(() => {
    detachedServerRef.current?.present();
  }, []);

  return (
    <MainContainer paddingHorizontal={0}>
      <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: 22, paddingTop: 12, paddingBottom: 18 }}>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: '#FFFFFF', fontSize: 29, fontWeight: '900', letterSpacing: 3 }}>AURORA</Text>
          <Text style={{ color: '#C58BFF', fontSize: 9, fontWeight: '800', letterSpacing: 5, marginTop: -2 }}>LAUNCHER</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ maxWidth: 560 }}>
            <Text style={{ color: '#D8B8FF', fontSize: 11, fontWeight: '800', letterSpacing: 3, marginBottom: 8 }}>SEU MUNDO. SUA HISTÓRIA.</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 34, lineHeight: 39, fontWeight: '900', textShadowColor: '#000000', textShadowRadius: 12 }}>VIVA O ROLEPLAY</Text>
            <Text style={{ color: '#E8E0F0', fontSize: 14, lineHeight: 21, marginTop: 8, maxWidth: 330 }}>Entre na cidade, encontre sua história e jogue com a comunidade Aurora.</Text>
          </View>

          <View style={{ marginTop: 24 }}>
            <Monitoring ref={detachedServerRef} />
          </View>

          <TouchableOpacity activeOpacity={0.88} onPress={openServers} style={{ alignSelf: 'flex-start', marginTop: 4, borderRadius: 30, overflow: 'hidden' }}>
            <LinearGradient colors={['#A84CFF', '#6720B7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ minWidth: 210, paddingHorizontal: 24, paddingVertical: 15, borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '900', letterSpacing: 1 }}>JOGAR AGORA  ›</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity activeOpacity={0.88} onPress={openUpdate} style={{ borderRadius: 28, overflow: 'hidden' }}>
            <LinearGradient colors={['#A84CFF', '#6720B7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ paddingHorizontal: 24, paddingVertical: 14, borderRadius: 28 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '900', letterSpacing: 1 }}>ATUALIZAR  ↻</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 2 }}>AURORA ROLEPLAY</Text>
            <Text style={{ color: '#C9B8D9', fontSize: 9, marginTop: 4 }}>Conecte-se à cidade</Text>
          </View>
        </View>
      </View>
      <SheetServer ref={detachedServerRef} bottomInset={60} />
    </MainContainer>
  );
});
