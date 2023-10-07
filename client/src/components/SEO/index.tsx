import { Helmet } from "react-helmet-async";

export default function SEO({ title }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
