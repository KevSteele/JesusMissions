import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { FontAwesome } from '@expo/vector-icons';

interface AudioPlayerProps {
    audioUrl: string;
    title: string;
    artist?: string;
    onPlaybackChange?: (isPlaying: boolean) => void;
}

export default function AudioPlayer({
    audioUrl,
    title,
    artist,
    onPlaybackChange,
}: AudioPlayerProps) {
    const player = useAudioPlayer(audioUrl);
    const status = useAudioPlayerStatus(player);

    const [isLoading, setIsLoading] = useState(false);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [scrubValue, setScrubValue] = useState(0);

    useEffect(() => {
        onPlaybackChange?.(status.playing);
    }, [status.playing, onPlaybackChange]);

    useEffect(() => {
        if (!isScrubbing && status.currentTime && status.duration) {
            setScrubValue(status.currentTime);
        }
    }, [status.currentTime, isScrubbing, status.duration]);

    const handlePlayPause = useCallback(async () => {
        try {
            setIsLoading(true);
            if (status.playing) {
                player.pause();
            } else {
                await player.play();
            }
        } catch (error) {
            console.error('Error toggling playback:', error);
        } finally {
            setIsLoading(false);
        }
    }, [status.playing, player]);

    const handleSeekForward = useCallback(() => {
        if (status.currentTime && status.duration) {
            const newTime = Math.min(status.currentTime + 15, status.duration);
            player.seekTo(newTime);
        }
    }, [status.currentTime, status.duration, player]);

    const handleSeekBackward = useCallback(() => {
        if (status.currentTime) {
            const newTime = Math.max(status.currentTime - 15, 0);
            player.seekTo(newTime);
        }
    }, [status.currentTime, player]);

    const handleScrubStart = useCallback(() => setIsScrubbing(true), []);
    const handleScrubChange = useCallback((v: number) => setScrubValue(v), []);
    const handleScrubComplete = useCallback(
        (v: number) => {
            setIsScrubbing(false);
            player.seekTo(v);
            setScrubValue(v);
        },
        [player]
    );

    const formatTime = (seconds: number | undefined): string => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentTime = isScrubbing ? scrubValue : (status.currentTime || 0);
    const duration = status.duration || 0;
    const remainingTime = duration > 0 ? duration - currentTime : 0;

    return (
        <View
            className="bg-background dark:bg-background-dark rounded-2xl p-5 my-2 shadow"
            style={{ elevation: 3 }} // Android shadow
        >
            {/* Track Info */}
            <View className="items-center mb-5">
                <Text className="text-lg font-semibold text-center text-primary dark:text-primary-dark mb-1" numberOfLines={2}>
                    {title}
                </Text>
                {artist ? (
                    <Text className="text-sm text-muted dark:text-muted-dark text-center" numberOfLines={1}>
                        {artist}
                    </Text>
                ) : null}
            </View>

            {/* Progress Bar */}
            <View className="flex-row items-center mb-5">
                <Text className="text-xs text-muted dark:text-muted-dark font-medium min-w-[35px] text-center">
                    {formatTime(currentTime)}
                </Text>

                <Slider
                    style={{ flex: 1, height: 40, marginHorizontal: 10 }}
                    minimumValue={0}
                    maximumValue={duration || 1}
                    value={currentTime}
                    onSlidingStart={handleScrubStart}
                    onValueChange={handleScrubChange}
                    onSlidingComplete={handleScrubComplete}
                    minimumTrackTintColor="#007AFF"
                    maximumTrackTintColor="#E0E0E0"
                    thumbTintColor="#007AFF"
                    disabled={!duration}
                />

                <Text className="text-xs text-muted dark:text-muted-dark font-medium min-w-[35px] text-center">
                    {formatTime(remainingTime)}
                </Text>
            </View>

            {/* Controls */}
            <View className="flex-row justify-center items-center">
                <TouchableOpacity
                    className="items-center justify-center p-4 mx-5"
                    onPress={handleSeekBackward}
                    disabled={!status.currentTime}
                >
                    <FontAwesome
                        name="rotate-left"
                        size={24}
                        color={status.currentTime ? '#007AFF' : '#C0C0C0'}
                    />
                    <Text
                        className="text-[10px] font-semibold mt-0.5"
                        style={{ color: status.currentTime ? '#007AFF' : '#C0C0C0' }}
                    >
                        15s
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`w-20 h-20 rounded-full items-center justify-center shadow ${isLoading ? 'bg-gray-400' : 'bg-blue-600'
                        }`}
                    style={{ elevation: 8 }}
                    onPress={handlePlayPause}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#FFFFFF" />
                    ) : (
                        <FontAwesome
                            name={status.playing ? 'pause' : 'play'}
                            size={32}
                            color="#FFFFFF"
                            style={!status.playing ? { marginLeft: 4 } : undefined}
                        />
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    className="items-center justify-center p-4 mx-5"
                    onPress={handleSeekForward}
                    disabled={!status.duration}
                >
                    <FontAwesome
                        name="rotate-right"
                        size={24}
                        color={status.duration ? '#007AFF' : '#C0C0C0'}
                    />
                    <Text
                        className="text-[10px] font-semibold mt-0.5"
                        style={{ color: status.duration ? '#007AFF' : '#C0C0C0' }}
                    >
                        15s
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Loading State */}
            {isLoading ? (
                <View className="flex-row items-center justify-center mt-2 pt-2 border-t border-border dark:border-border-dark">
                    <ActivityIndicator size="small" color="#007AFF" />
                    <Text className="ml-2 text-sm text-muted dark:text-muted-dark">Loading audio...</Text>
                </View>
            ) : null}
        </View>
    );
}
