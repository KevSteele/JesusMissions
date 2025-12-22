import React from 'react';
import { Text, View, ScrollView, Pressable, useColorScheme } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { STEPS } from '@/constants/steps';

/**
 * Shared component for mirrored "Previous" and "Next" buttons
 */
function NavButton({
    label,
    iconName,
    onPress,
    isLeft = false,
    color
}: {
    label: string;
    iconName: any;
    onPress: () => void;
    isLeft?: boolean;
    color: string
}) {
    return (
        <Pressable
            onPress={onPress}
            hitSlop={20}
            style={{ flexDirection: 'row', alignItems: 'center' }}
        >
            {({ pressed }) => (
                <>
                    {isLeft && (
                        <Ionicons
                            name={iconName}
                            size={28}
                            color={color}
                            style={{ opacity: pressed ? 0.5 : 1, marginLeft: -8 }}
                        />
                    )}
                    <Text style={{
                        color: color,
                        opacity: pressed ? 0.5 : 1,
                        fontSize: 17,
                        marginHorizontal: 2,
                    }}>
                        {label}
                    </Text>
                    {!isLeft && (
                        <Ionicons
                            name={iconName}
                            size={28}
                            color={color}
                            style={{ opacity: pressed ? 0.5 : 1, marginRight: -8 }}
                        />
                    )}
                </>
            )}
        </Pressable>
    );
}

export default function StepDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const colorScheme = useColorScheme();

    const currentId = Number(id);
    const step = STEPS.find(s => s.id === currentId);

    // Calculate both Previous and Next steps
    const prevStep = STEPS.find(s => s.id === currentId - 1);
    const nextStep = STEPS.find(s => s.id === currentId + 1);

    const tintColor = colorScheme === 'dark' ? '#fff' : '#007AFF';

    if (!step) {
        return (
            <View className="flex-1 items-center justify-center bg-white dark:bg-zinc-900">
                <Text className="text-xl text-zinc-900 dark:text-white">Step not found</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: `Step ${step.id}`,
                    headerLeft: () => prevStep ? (
                        <NavButton
                            label={`Step ${prevStep.id}`}
                            iconName="chevron-back"
                            onPress={() => {
                                // This forces the "Back" animation visually
                                if (router.canGoBack()) {
                                    router.back();
                                } else {
                                    // Fallback if user deep-linked directly to a middle step
                                    router.replace(`/(tabs)/steps/${prevStep.id}`);
                                }
                            }}
                            isLeft={true}
                            color={tintColor}
                        />
                    ) : null,
                    headerRight: () => nextStep ? (
                        <NavButton
                            label={`Step ${nextStep.id}`}
                            iconName="chevron-forward"
                            onPress={() => router.push(`/(tabs)/steps/${nextStep.id}`)}
                            isLeft={false}
                            color={tintColor}
                        />
                    ) : null,
                }}
            />
            
            <View className="flex-1 bg-white dark:bg-zinc-900">
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="px-5 py-6"
                >
                    <View className="mb-4">
                        <Text className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                            {step.title}
                        </Text>

                        <Text className="text-base text-gray-600 dark:text-gray-300 mb-4">
                            {step.description}
                        </Text>
                    </View>

                    <Text className="text-base leading-7 text-zinc-900 dark:text-white">
                        {step.content}
                    </Text>
                </ScrollView>
            </View>
        </>
    );
}
