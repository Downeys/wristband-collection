import { Life_Savers, Permanent_Marker } from 'next/font/google';

const primary = Permanent_Marker({ subsets: ['latin'], weight: '400' });
const secondary = Life_Savers({ subsets: ['latin'], weight: ['400', '700', '800'] });

const fonts = { primary, secondary };

export default fonts;
