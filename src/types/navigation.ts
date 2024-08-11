import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AppStackParamList = {
    BottomBar: undefined;
    AsteriaChat: { id: number, color: string, initialX: number, initialY: number, date: string, dreamTitle: string, dreamDescription: string, type: string } | { title: string, timeFrame: string, results: string };
};

export type ApplicationScreenProps = NativeStackScreenProps<AppStackParamList>;


export type BottomBarProps = NativeStackScreenProps<AppStackParamList, 'BottomBar'>;
export type AsteriaChatProps = NativeStackScreenProps<AppStackParamList, 'AsteriaChat'>;

