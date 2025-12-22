import React from 'react';
import { Stack } from 'expo-router';

export default function StepsLayout() {
    return (
        <Stack
            screenOptions={{
                // This ensures standard slide animations on iOS and 
                // material-style fades/slides on Android.
                animation: 'default', 
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    title: 'Seven Steps to Missions'
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    headerShown: true,
                    // If you notice the "Next" button animation feels like 
                    // a jump rather than a slide, you can explicitly set:
                    // animation: 'slide_from_right',
                }}
            />
        </Stack>
    );
}
