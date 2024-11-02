import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="(tabs)/index" options={{ title: "Tabs" }} />
        {/* add other screens as needed */}
        </Stack>
    );
}
