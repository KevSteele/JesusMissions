// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import AudioPlayer from './AudioPlayer';
// import VideoPlayer from './VideoPlayer';

// interface MediaPlayerProps {
//     audioUrl?: string;
//     videoId?: string;
//     title: string;
//     artist?: string;
//     onPlaybackChange?: (isPlaying: boolean) => void;
// }

// export default function MediaPlayer({
//     audioUrl,
//     videoId,
//     title,
//     artist,
//     onPlaybackChange
// }: MediaPlayerProps) {
//     // Prefer video if both are available
//     const useVideo = videoId && videoId.length > 0;
    
//     return (
//         <View style={styles.container}>
//             {useVideo ? (
//                 <VideoPlayer 
//                     videoId={videoId} 
//                     autoPlay={false} 
//                     loop={false}
//                 />
//             ) : audioUrl ? (
//                 <AudioPlayer
//                     audioUrl={audioUrl}
//                     title={title}
//                     artist={artist}
//                     onPlaybackChange={onPlaybackChange}
//                 />
//             ) : null}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         marginVertical: 10,
//     },
// });
