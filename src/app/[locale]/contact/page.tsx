import TranslationsProvider from "@/common/context/TranslationsProvider";
import initTranslations from "@/common/utils/i18n";
import ContactPage from "@/Contact/ContactPage";

export default async function Contact({ params }: { params: { locale: string } }) {
  const locale = `${params.locale}`; 
  const { t, resources } = await initTranslations(locale, ['contact']);
  return (
    <TranslationsProvider
        namespaces={['contact']}
        locale={locale}
        resources={resources}
    >
      <ContactPage />;
    </TranslationsProvider>
  )
}
