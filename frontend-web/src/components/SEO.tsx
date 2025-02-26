import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg', // Default social sharing image
  url = 'https://flownote.app', // Your domain
}) => {
  const siteTitle = 'FlowNote - Jouw Digitale Notitie Werkplaats';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Dutch" />
      <link rel="canonical" href={url} />

      {/* Structured Data / JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: siteTitle,
          description: description,
          url: url,
          applicationCategory: 'ProductivityApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR'
          },
          features: [
            'Spraak naar tekst conversie',
            'AI-ondersteunde notities',
            'Slim notitie beheer'
          ]
        })}
      </script>
    </Helmet>
  );
}; 