"use client";

import Script from "next/script";

export default function JsonLd() {
  // Current year for copyright and date calculations
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toISOString().split("T")[0];

  // Person schema with comprehensive details
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jia Wei Ng",
    alternateName: "Jay",
    url: "https://jiaweing.com",
    image: "https://jiaweing.com/images/avatars/jiawei.png",
    sameAs: [
      "https://github.com/jiaweing",
      "https://www.linkedin.com/in/jiaweing/",
      "https://x.com/j14wei",
      "https://www.threads.net/@j14.wei",
      "https://www.tiktok.com/@j14.wei",
      "https://www.youtube.com/@j14wei",
    ],
    jobTitle: "Software Engineer & Designer",
    worksFor: [
      {
        "@type": "Organization",
        name: "base07.com",
        url: "https://base07.com",
      },
      {
        "@type": "Organization",
        name: "supply.tf",
        url: "https://supply.tf",
      },
      {
        "@type": "Organization",
        name: "decosmic.com",
        url: "https://decosmic.com",
      },
      {
        "@type": "Organization",
        name: "been.place",
        url: "https://been.place",
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
      "Software Engineer & Designer based in Singapore with expertise in AI, blockchain, and game development.",
  };

  // Website schema for better site representation
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jia Wei Ng - Portfolio",
    url: "https://jiaweing.com",
    author: {
      "@type": "Person",
      name: "Jia Wei Ng",
      url: "https://jiaweing.com",
    },
    description:
      "Personal portfolio of Jia Wei Ng, a software engineer and designer based in Singapore with expertise in AI, blockchain, and game development.",
    publisher: {
      "@type": "Person",
      name: "Jia Wei Ng",
    },
    inLanguage: "en-US",
    copyrightYear: currentYear,
    datePublished: "2023-01-01",
    dateModified: currentDate,
  };

  // Combine all schemas into an array
  const schemas = [personSchema, websiteSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          id={`json-ld-${index}`}
          key={`json-ld-${index}`}
          type="application/ld+json"
        />
      ))}
    </>
  );
}
