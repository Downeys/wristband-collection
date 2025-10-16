import initTranslations from '../../../../common/utils/i18n/i18n';
import Font from '../../../../common/config/fonts';
import { Namespaces } from '../../../../common/constants/i18nConstants';
import { Heading } from '../../../../common/components/text/Heading/Heading';
import { Label } from '../../../../common/components/text/Label/Label';
import styles from './LongTermDirectionSection.module.scss';

interface LongTermDirectionSectionProps {
  locale: string;
}

export const LongTermDirectionSection = async ({ locale }: LongTermDirectionSectionProps) => {
  const { t } = await initTranslations(locale, [Namespaces.ABOUT]);
  const sectionContent = [t('theVision1'), t('theVision2'), t('theVision3'), t('theVision4'), t('theVision5')]
  return (
    <section>
      <Heading size="xl" additionalStyles={`${styles.longTermDirectionHeader} ${Font.secondary.className}`} text={t('theVisionHeader')} />
      {sectionContent.map((content, idx) => <Label key={`longTermLabel-${idx}`} alignment="center" size="lg" additionalStyles={styles.longTermDirectionLabel} text={content} />)}
    </section>
  );
};

export default LongTermDirectionSection;
