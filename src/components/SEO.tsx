import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// A component that dynamically updates the document's head for SEO purposes.
// It sets the language, title, and meta description based on the current i18n language.

const SEO = () => {
  const { t, i18n } = useTranslation();

  const siteTitle = t('meta.title');
  const siteDescription = t('meta.description');

  return (
    <Helmet>
      {/* Updates the <html lang=""> attribute */}
      <html lang={i18n.language} />

      {/* Updates the <title> tag */}
      <title>{siteTitle}</title>

      {/* Updates the <meta name="description"> tag */}
      <meta name="description" content={siteDescription} />
      
      {/* Updates Open Graph tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:locale" content={i18n.language === 'sl' ? 'sl_SI' : i18n.language === 'de' ? 'de_DE' : 'en_US'} />

      {/* Updates Twitter tags */}
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
    </Helmet>
  );
};

export default SEO;