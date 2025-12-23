import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { View } from 'react-native';

interface VideoPlayerProps {
    videoId: string;
    autoPlay?: boolean;
    loop?: boolean;
}

export default function VideoPlayer({ videoId, autoPlay = false, loop = false }: VideoPlayerProps) {
    return (
        <View className="px-4">
            <View className="w-full aspect-[16/9] bg-background dark:bg-background-dark rounded-lg overflow-hidden">
                <YoutubePlayer
                    height={300}
                    play={autoPlay}
                    videoId={videoId}
                    onChangeState={() => { }}
                    initialPlayerParams={{
                        loop,
                        controls: true,
                    }}
                    />
            </View>
        </View>
    );
}
