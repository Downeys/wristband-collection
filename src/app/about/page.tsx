import { DEFAULT_LOCALE } from "@/common/constants/i18nConstants";
import { getAboutLink } from "@/common/utils/helpers/linkHelpers";
import { redirect } from "next/navigation";

export default function About({ params }: { params: { locale: string } }) {
  const locale = params.locale ?? DEFAULT_LOCALE;
  redirect(getAboutLink(locale))
}