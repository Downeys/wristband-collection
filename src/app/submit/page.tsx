import { DEFAULT_LOCALE } from "@/common/constants/i18nConstants";
import { getSubmitLink } from "@/common/utils/helpers/linkHelpers";
import { redirect } from "next/navigation";

export default function Submit({ params }: { params: { locale: string } }) {
  const locale = params.locale ?? DEFAULT_LOCALE;
  redirect(getSubmitLink(locale));
}