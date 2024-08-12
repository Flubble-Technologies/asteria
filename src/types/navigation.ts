import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DreamAnalysisCategories } from "../constants/dream-analysis-categories";
import { TimeFrame } from "../constants/time-frame";
import { IDream } from "./IDream";


// App Stack
export type AppStackParamList = {
    BottomBar: undefined;
    AsteriaChat: { dream: IDream | null, selectedCategory: DreamAnalysisCategories , timeFrame: TimeFrame  };
    UpdateProfile: undefined;
    AnalysisResult: { selectedCategory: DreamAnalysisCategories, timeFrame: TimeFrame };
};

export type ApplicationScreenProps = NativeStackScreenProps<AppStackParamList>;


export type BottomBarProps = NativeStackScreenProps<AppStackParamList, 'BottomBar'>;
export type AsteriaChatProps = NativeStackScreenProps<AppStackParamList, 'AsteriaChat'>;

export type AnalysisResultProps = NativeStackScreenProps<AppStackParamList, 'AnalysisResult'>;

export type UpdateProfileProps = NativeStackScreenProps<AppStackParamList, 'UpdateProfile'>;



// Auth Stack

export type AuthStackParamList = {
    SignIn: undefined;
    Onboard: undefined;
    Loading: undefined;
    SignUp: { email?: string, name?: string, surname?: string, appleId?: string };
};

export type AppStackProps = NativeStackScreenProps<AuthStackParamList>;

export type SignInProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

export type OnboardProps = NativeStackScreenProps<AuthStackParamList, 'Onboard'>;

export type LoadingProps = NativeStackScreenProps<AuthStackParamList, 'Loading'>;

export type SignUpProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;