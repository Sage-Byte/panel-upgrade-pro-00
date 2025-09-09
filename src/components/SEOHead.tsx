import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
}

const SEOHead = ({ title, description, url }: SEOHeadProps) => {
  useEffect(() => {
    // Add Meta Pixel Code - with better duplicate prevention
    const addMetaPixel = () => {
      const pixelId = '1289737262947490';
      const scriptId = 'meta-pixel-script';
      const noscriptId = 'meta-pixel-noscript';
      
      // Check if pixel is already added using unique IDs
      if (document.getElementById(scriptId)) return;
      
      // Add the main script
      const script = document.createElement('script');
      script.id = scriptId;
      script.textContent = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
      
      // Add noscript fallback
      const noscript = document.createElement('noscript');
      noscript.id = noscriptId;
      noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`;
      document.head.appendChild(noscript);
    };

    addMetaPixel();

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
