import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AppStackParamList = {
    BottomBar: undefined;
};

export type ApplicationScreenProps = NativeStackScreenProps<AppStackParamList>;


export type BottomBarProps = NativeStackScreenProps<AppStackParamList, 'BottomBar'>;

