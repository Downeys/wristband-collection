import initTranslations from '../../../../common/utils/i18n/i18n';
import Font from '../../../../common/config/fonts';
import { Namespaces } from '../../../../common/constants/i18nConstants';
import { Heading } from '../../../../common/components/text/Heading';
import { Label } from '../../../../common/components/text/Label';

interface LongTermDirectionSectionProps {
  locale: string;
}

export const LongTermDirectionSection = async ({ locale }: LongTermDirectionSectionProps) => {
  const { t } = await initTranslations(locale, [Namespaces.ABOUT]);
  return (
    <section>
      <Heading size="xl" additionalStyles={`sm:text-2xl md:text-4xl mt-4 w-full ${Font.secondary.className}`} text={t('theVisionHeader')} />
      <Label alignment="center" size="lg" additionalStyles={`md:text-2xl lg:text-3xl mt-4`} text={t('theVision1')} />
      <Label alignment="center" size="lg" additionalStyles={`md:text-2xl lg:text-3xl mt-4`} text={t('theVision2')} />
      <Label alignment="center" size="lg" additionalStyles={`md:text-2xl lg:text-3xl mt-4`} text={t('theVision3')} />
      <Label alignment="center" size="lg" additionalStyles={`md:text-2xl lg:text-3xl mt-4`} text={t('theVision4')} />
      <Label alignment="center" size="lg" additionalStyles={`md:text-2xl lg:text-3xl mt-4`} text={t('theVision5')} />
    </section>
  );
};

export default LongTermDirectionSection;
