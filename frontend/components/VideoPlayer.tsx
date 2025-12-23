import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { View } from 'react-native';

interface VideoPlayerProps {
    videoId: string;
    loop?: boolean;
}

export default function VideoPlayer({ videoId, loop = false }: VideoPlayerProps) {
    return (
        <View className="px-4">
            <View className="w-full aspect-[16/9] bg-background dark:bg-background-dark rounded-lg overflow-hidden">
                <YoutubePlayer
                    height={300}
                    videoId={videoId}
                    initialPlayerParams={{
                        loop,
                        controls: true,
                    }}
                />
            </View>
        </View>
    );
}
