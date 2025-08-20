import { XMLParser } from 'fast-xml-parser';
import axios from 'axios';

const RSS_FEED_URL = 'https://api.riverside.fm/hosting/R476AzR6.rss';

const parserOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseAttributeValue: true,
    trimValues: true,
};

const parser = new XMLParser(parserOptions);

export const fetchPodcastEpisodes = async () => {
    try {
        const response = await axios.get(RSS_FEED_URL);
        
        const parsedData = parser.parse(response.data);
        
        const channel = parsedData.rss.channel;
        const items = Array.isArray(channel.item) ? channel.item : [channel.item];
        
        const episodes = items.map((item, index) => ({
            id: item.guid?.['#text'] || item.guid || `episode-${index}`,
            title: item.title || 'Untitled Episode',
            description: item.description || '',
            audioUrl: item.enclosure?.['@_url'] || '',
            publishedDate: item.pubDate || '',
            duration: item['itunes:duration'] || 'Unknown duration',
            episodeNumber: parseInt(item['itunes:episode']) || index + 1,
            season: parseInt(item['itunes:season']) || 1,
            creator: item['dc:creator'] || 'Unknown Creator',
        }));
        
        // Sort by published date (most recent first)
        episodes.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
        
        return episodes;
        
    } catch (error) {
        console.error('Error fetching podcast episodes:', error);
        throw new Error('Failed to fetch podcast episodes');
    }
};