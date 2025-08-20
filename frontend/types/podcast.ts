export interface PodcastEpisode {
    id: string;
    title: string;
    description: string;
    audioUrl: string;
    publishedDate: string;
    duration: string;
    episodeNumber: number;
    season: number;
    creator: string;
    youtubeVideoId?: string;
}