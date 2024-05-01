import { NavigationProp, ParamListBase } from '@react-navigation/native';

declare global {
 namespace ReactNavigation {
   interface RootParamList extends ParamListBase {}
  }
}

export function useNavigation<
  T extends NavigationProp
>(): T;
