import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { StyleSheet, View } from 'react-native';

interface VideoPlayerProps {
    videoId: string;
    autoPlay?: boolean;
    loop?: boolean;
}

export default function VideoPlayer({ videoId, autoPlay = false, loop = false }: VideoPlayerProps) {
    return (
        <View style={styles.contentContainer}>
            <YoutubePlayer
                height={300}
                play={autoPlay}
                videoId={videoId}
                onChangeState={() => { }}
                initialPlayerParams={{
                    loop: loop,
                    controls: true,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        width: '100%',
        aspectRatio: 16 / 9, // 16:9 aspect ratio for responsive video
    },
});
