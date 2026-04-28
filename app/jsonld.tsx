export default function JsonLd() {
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://jiaweing.com/#profilepage",
    url: "https://jiaweing.com",
    name: "Jia Wei Ng — Portfolio",
    mainEntity: {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://jiaweing.com/#person",
      name: "Jia Wei Ng",
      alternateName: "Jay",
      url: "https://jiaweing.com",
      image: {
        "@type": "ImageObject",
        url: "https://jiaweing.com/images/avatars/jiawei.png",
        width: 400,
        height: 400,
      },
      sameAs: [
        "https://github.com/jiaweing",
        "https://www.linkedin.com/in/jiaweing/",
        "https://x.com/jiaweihq",
        "https://www.threads.net/@jiaweihq",
        "https://www.tiktok.com/@jiaweihq",
        "https://www.youtube.com/@jiaweihq",
      ],
      jobTitle: "Founder & CEO",
      worksFor: [
        {
          "@type": "Organization",
          name: "amajor.ai",
          url: "https://amajor.ai",
        },
        {
          "@type": "Organization",
          name: "ryuhq.com",
          url: "https://ryuhq.com",
        },
        {
          "@type": "Organization",
          name: "supply.tf",
          url: "https://supply.tf",
        },
      ],
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "University of Glasgow",
          url: "https://www.gla.ac.uk",
        },
        {
          "@type": "EducationalOrganization",
          name: "Singapore Institute of Technology",
          url: "https://www.singaporetech.edu.sg",
        },
      ],
      knowsAbout: [
        "Software Engineering",
        "Web Development",
        "Artificial Intelligence",
        "Blockchain",
        "Game Development",
        "Design",
      ],
      nationality: {
        "@type": "Country",
        name: "Singapore",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "Singapore",
      },
      description:
        "Founder & CEO at amajor.ai, building AI agent products. Co-founder of ryu. Based in Singapore.",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jia Wei Ng - Portfolio",
    url: "https://jiaweing.com",
    author: {
      "@type": "Person",
      "@id": "https://jiaweing.com/#person",
      name: "Jia Wei Ng",
      url: "https://jiaweing.com",
    },
    description:
      "Founder & CEO at amajor.ai, building AI agent products. Co-founder of ryu. Based in Singapore.",
    publisher: {
      "@type": "Person",
      "@id": "https://jiaweing.com/#person",
      name: "Jia Wei Ng",
    },
    inLanguage: "en-US",
  };

  const schemas = [profilePageSchema, websiteSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={`json-ld-${index}`}
          type="application/ld+json"
        />
      ))}
    </>
  );
}
