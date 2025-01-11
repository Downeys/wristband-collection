import { DEFAULT_LOCALE } from '@/common/constants/i18nConstants';
import { getOnDemandLink } from '@/common/utils/helpers/linkHelpers';
import { redirect } from 'next/navigation';

export default function OnDemand({ params }: { params: { locale: string } }) {
  const locale = params.locale ?? DEFAULT_LOCALE;
  redirect(getOnDemandLink(locale));
}
