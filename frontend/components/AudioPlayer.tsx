import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, useColorScheme } from 'react-native';
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
    const colorScheme = useColorScheme();
    const player = useAudioPlayer(audioUrl);
    const status = useAudioPlayerStatus(player);

    const [isLoading, setIsLoading] = useState(false);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [scrubValue, setScrubValue] = useState(0);
    const isFirstMountRef = useRef(true);

    useEffect(() => {
        onPlaybackChange?.(status.playing);
    }, [status.playing, onPlaybackChange]);

    useEffect(() => {
        if (!isScrubbing && status.currentTime && status.duration) {
            setScrubValue(status.currentTime);
        }
    }, [status.currentTime, isScrubbing, status.duration]);


    useEffect(() => {
        if (isFirstMountRef.current) {
            isFirstMountRef.current = false;
            return;
        }

        const autoPlay = async () => {
            try {
                await player.play();
            } catch (error) {
                console.error('Error auto-playing episode:', error);
            }
        };

        autoPlay();
    }, [audioUrl, player]);

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
            className="bg-white dark:bg-zinc-900 rounded-2xl p-3 border border-zinc-200 dark:border-zinc-700"
        >
            {/* Track Info */}
            <View className="items-center mb-1">
                <Text className="text-lg font-semibold text-center text-zinc-900 dark:text-white mb-1" numberOfLines={2}>
                    {title}
                </Text>
            </View>

            {/* Progress Bar */}
            <View className="flex-row items-center mb-1">
                <Text className="text-xs text-gray-500 dark:text-gray-300 font-medium min-w-[35px] text-center">
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
                    minimumTrackTintColor="#52525b" // zinc-600
                    maximumTrackTintColor="#e4e4e7" // zinc-200
                    thumbTintColor="#71717a" // zinc-500
                    disabled={!duration}
                />

                <Text className="text-xs text-gray-500 dark:text-gray-300 font-medium min-w-[35px] text-center">
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
                        color={
                            colorScheme === 'dark'
                                ? (status.currentTime ? '#fff' : '#d4d4d8')
                                : (status.currentTime ? '#52525b' : '#d4d4d8')
                        }
                    />
                    <Text
                        className="text-[10px] font-semibold mt-0.5"
                        style={{ color: status.currentTime ? '#52525b' : '#d4d4d8' }}
                    >
                        15s
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`w-20 h-20 rounded-full items-center justify-center ${isLoading ? 'bg-zinc-400' : 'bg-zinc-600'}`}
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
                        color={
                            colorScheme === 'dark'
                                ? (status.duration ? '#fff' : '#d4d4d8')
                                : (status.duration ? '#52525b' : '#d4d4d8')
                        }
                    />
                    <Text
                        className="text-[10px] font-semibold mt-0.5"
                        style={{ color: status.duration ? '#52525b' : '#d4d4d8' }}
                    >
                        15s
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
