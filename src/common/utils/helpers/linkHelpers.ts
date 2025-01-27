import { links } from '@/common/config/config';

export const getHomeLink = (locale: string): string => `${links.baseUrl}${locale}/`;

export const getContactLink = (locale: string): string => `${links.baseUrl}${locale}/${links.contactLink}`;

export const getSubmitLink = (locale: string): string => `${links.baseUrl}${locale}/${links.submitLink}`;

export const getAboutLink = (locale: string): string => `${links.baseUrl}${locale}/${links.aboutLink}`;

export const getOnDemandLink = (locale: string): string => `${links.baseUrl}${locale}/${links.onDemandLink}`;

export const linkHelper = { getHomeLink, getContactLink, getSubmitLink, getAboutLink, getOnDemandLink };

export default linkHelper;
