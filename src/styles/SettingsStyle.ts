import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { scale } from '../helpers/demensions';

export const styles = StyleSheet.create({
  setting: { paddingHorizontal: verticalScale(5) },
  settingWrapper: { display: 'flex', flex: 1, backgroundColor: '#100B18', marginBottom: verticalScale(15) },
  loading: { backgroundColor: '#000000e8', zIndex: 100, width: '100%', height: '100%', justifyContent: 'center', position: 'absolute' },
  body: { paddingHorizontal: verticalScale(5) },
  title: { color: '#fff', fontSize: scale(24), fontWeight: 'bold', marginBottom: verticalScale(15) },
  switch: { marginTop: verticalScale(20), paddingBottom: verticalScale(5), marginBottom: verticalScale(5), borderBottomWidth: 1, borderBottomColor: 'rgba(179, 77, 255, .3)' },
  range: { marginVertical: verticalScale(15) },
  button: { marginTop: verticalScale(15) },
  version: { textAlign: 'center', color: '#A99BB8' },
});