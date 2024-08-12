import { useEffect, useState } from "react";
import { DreamAnalysisCategories } from "../constants/dream-analysis-categories";
import { AnalysisResultProps } from "../types/navigation";
import { analyzeDreamApi } from "../api/requests/dreams.api";
import { Text, View } from "react-native";

const AnalysisResult = ({ route }: AnalysisResultProps) => {
    const { selectedCategory, timeFrame } = route.params;

    const [error, setError] = useState<string | null>(null);
    const [dreamAnalysis, setDreamAnalysis] = useState<string | null>(null);

    useEffect(() => {
        analyzeDreamApi({ timeFrame, selectedCategory }).then((data) => {
            console.log(data);
            setDreamAnalysis(data);
        }).catch((err) => {
            console.log(err);
            setError(err);
        });
    }, [timeFrame, selectedCategory]);

    if (!dreamAnalysis) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Text>{dreamAnalysis}</Text>
        </View>
    );

}


export default AnalysisResult;