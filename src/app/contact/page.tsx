import { DEFAULT_LOCALE } from '@/common/constants/i18nConstants';
import { getContactLink } from '@/common/utils/helpers/linkHelpers';
import { redirect } from 'next/navigation';

export default function Contact({ params }: { params: { locale: string } }) {
  const locale = params.locale ?? DEFAULT_LOCALE;
  redirect(getContactLink(locale));
}
