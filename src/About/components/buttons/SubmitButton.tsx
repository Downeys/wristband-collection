import Link from 'next/link';
import React from 'react';
import initTranslations from '../../../common/utils/i18n/i18n';
import { getSubmitLink } from '../../../common/utils/helpers/linkHelpers';
import Font from '../../../common/config/fonts';
import { Namespaces } from '../../../common/constants/i18nConstants';
import styles from './SubmitButton.module.scss';

interface SubmitButtonProps {
  locale: string;
}

export const SubmitButton = async ({ locale }: SubmitButtonProps) => {
  const { t } = await initTranslations(locale, [Namespaces.ABOUT]);
  const submitLink = getSubmitLink(locale);
  return (
    <Link className={`${Font.primary.className} ${styles.submitButton}`} type="button" href={submitLink}>
      {t('submitButton')}
    </Link>
  );
};

export default SubmitButton;
