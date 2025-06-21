import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '.';
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
