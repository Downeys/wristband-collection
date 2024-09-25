import initTranslations from "@/common/utils/i18n";
import SubmitPage from "@/Submit/SubmitPage";
import TranslationsProvider from "@/common/context/TranslationsProvider";

export default async function Submit({ params }: { params: { locale: string } }) {
    const locale = `${params.locale}`; 
    const { t, resources } = await initTranslations(locale, ['submit']);
    return (
        <TranslationsProvider
            namespaces={['submit']}
            locale={locale}
            resources={resources}
        >
            <SubmitPage />
        </TranslationsProvider>
    )
}