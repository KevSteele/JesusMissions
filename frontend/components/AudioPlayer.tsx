import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
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
    onPlaybackChange
}: AudioPlayerProps) {
    const player = useAudioPlayer(audioUrl);
    const status = useAudioPlayerStatus(player);
    
    const [isLoading, setIsLoading] = useState(false);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [scrubValue, setScrubValue] = useState(0);

    // Track playback state changes
    useEffect(() => {
        onPlaybackChange?.(status.playing);
    }, [status.playing, onPlaybackChange]);

    // Update scrub value when not scrubbing
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

    const handleScrubStart = useCallback(() => {
        setIsScrubbing(true);
    }, []);

    const handleScrubChange = useCallback((value: number) => {
        setScrubValue(value);
    }, []);

    const handleScrubComplete = useCallback((value: number) => {
        setIsScrubbing(false);
        player.seekTo(value);
        setScrubValue(value);
    }, [player]);

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
        <View style={styles.container}>
            {/* Track Info */}
            <View style={styles.trackInfo}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                {artist && (
                    <Text style={styles.artist} numberOfLines={1}>
                        {artist}
                    </Text>
                )}
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <Text style={styles.timeText}>
                    {formatTime(currentTime)}
                </Text>
                
                <Slider
                    style={styles.progressSlider}
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
                
                <Text style={styles.timeText}>
                    {formatTime(remainingTime)}
                </Text>
            </View>

            {/* Controls */}
            <View style={styles.controlsContainer}>
                <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={handleSeekBackward}
                    disabled={!status.currentTime}
                >
                    <FontAwesome 
                        name="rotate-left" 
                        size={24} 
                        color={status.currentTime ? "#007AFF" : "#C0C0C0"} 
                    />
                    <Text style={[styles.seekLabel, { color: status.currentTime ? "#007AFF" : "#C0C0C0" }]}>
                        15s
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.playPauseButton, isLoading && styles.loadingButton]}
                    onPress={handlePlayPause}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#FFFFFF" />
                    ) : (
                        <FontAwesome 
                            name={status.playing ? "pause" : "play"} 
                            size={32} 
                            color="#FFFFFF"
                            style={!status.playing ? { marginLeft: 4 } : undefined}
                        />
                    )}
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={handleSeekForward}
                    disabled={!status.duration}
                >
                    <FontAwesome 
                        name="rotate-right" 
                        size={24} 
                        color={status.duration ? "#007AFF" : "#C0C0C0"} 
                    />
                    <Text style={[styles.seekLabel, { color: status.duration ? "#007AFF" : "#C0C0C0" }]}>
                        15s
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Loading State */}
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="small" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading audio...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    trackInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#333',
        marginBottom: 4,
    },
    artist: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    timeText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
        minWidth: 35,
        textAlign: 'center',
    },
    progressSlider: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginHorizontal: 20,
    },
    seekLabel: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: 2,
    },
    playPauseButton: {
        backgroundColor: '#007AFF',
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#007AFF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    loadingButton: {
        backgroundColor: '#B0B0B0',
    },
    loadingOverlay: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    loadingText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#666',
    },
});
