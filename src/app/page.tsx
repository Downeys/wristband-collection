import { DEFAULT_LOCALE } from "@/common/constants/i18nConstants";
import { getHomeLink } from "@/common/utils/helpers/linkHelpers";
import { redirect } from "next/navigation";

export default function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale ?? DEFAULT_LOCALE;
  redirect(getHomeLink(locale))
}