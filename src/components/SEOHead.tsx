import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
}

const SEOHead = ({ title, description, url }: SEOHeadProps) => {
  useEffect(() => {
    const docTitle = title;
    document.title = docTitle;

    const ensureMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}='${name}']`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const canonicalHref = url || window.location.href;
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalHref);

    ensureMeta("description", description);
    ensureMeta("og:title", docTitle, "property");
    ensureMeta("og:description", description, "property");
    ensureMeta("og:type", "website", "property");

    // LocalBusiness Schema
    const existingJsonLd = document.getElementById("jsonld-localbusiness");
    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.id = "jsonld-localbusiness";
    jsonLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Electrician",
      name: "Premium Panel Upgrades",
      url: canonicalHref,
      areaServed: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Your City",
          addressRegion: "Your State",
          addressCountry: "US"
        }
      }
    });
    if (existingJsonLd) existingJsonLd.remove();
    document.head.appendChild(jsonLd);
  }, [title, description, url]);

  return null;
};

export default SEOHead;
