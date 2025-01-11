import config from "@/common/config/config"

export const getHomeLink = (locale: string): string => `${config.links.baseUrl}${locale}/`;

export const getContactLink = (locale: string): string => `${config.links.baseUrl}${locale}/${config.links.contactLink}`;

export const getSubmitLink = (locale: string): string => `${config.links.baseUrl}${locale}/${config.links.submitLink}`;

export const getAboutLink = (locale: string): string => `${config.links.baseUrl}${locale}/${config.links.aboutLink}`;

export const getOnDemandLink = (locale: string): string => `${config.links.baseUrl}${locale}/${config.links.onDemandLink}`;

export const linkHelper = {  getHomeLink, getContactLink, getSubmitLink, getAboutLink, getOnDemandLink };

export default linkHelper;
