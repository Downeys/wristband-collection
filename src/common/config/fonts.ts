import { Lacquer, Life_Savers } from 'next/font/google';

const primary = Lacquer({ subsets: ["latin"], weight: "400" })
const secondary = Life_Savers({ subsets: ["latin"], weight: ["400", "700", "800"] });

export default { primary, secondary }