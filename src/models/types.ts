export interface IconProps {
    styling?: string;
    selected?: boolean;
    onClick?: () => void;
}

export interface TrackData {
    trackId: string;
    imageHref: string;
    bandName: string;
    trackName: string;
}