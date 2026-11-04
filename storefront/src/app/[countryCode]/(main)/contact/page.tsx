import { Metadata } from "next"
import { listRegions } from "@lib/data/regions"
import {
  buildCountryAlternates,
  buildCountryPath,
  toAbsoluteUrl,
} from "@lib/util/seo"

type Props = {
  params: { countryCode: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.flatMap((r) => r.countries?.map((c) => c.iso_2))
        .filter(Boolean) as string[]
  )

  const contactPath = buildCountryPath(params.countryCode, "/contact")
  const title = "Contact Us"
  const description =
    "Get in touch with Crowncut Gems International AB. Inquire about certified gemstones, bespoke jewelry creations, and orders."

  return {
    title,
    description,
    alternates: {
      canonical: toAbsoluteUrl(contactPath),
      languages: {
        ...buildCountryAlternates(countryCodes || [], "/contact"),
        "x-default": toAbsoluteUrl(contactPath),
      },
    },
    openGraph: {
      title,
      description,
      url: toAbsoluteUrl(contactPath),
      type: "website",
    },
  }
}

export default function ContactPage({ params }: Props) {
  const contactPath = buildCountryPath(params.countryCode, "/contact")
  const contactUrl = toAbsoluteUrl(contactPath)

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Crowncut Gems International AB",
    description: "Contact information and support for Crowncut Gems International AB.",
    url: contactUrl,
    mainEntity: {
      "@type": "Organization",
      name: "Crowncut Gems International AB",
      email: "info@crowncutgems.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Studiegången 8",
        postalCode: "416 81",
        addressLocality: "Göteborg",
        addressCountry: "SE",
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section style={{ paddingTop: 140, paddingBottom: 80 }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              {/* Hero heading */}
              <div className="mb-5 text-center">
                <p
                  style={{
                    fontSize: "0.8rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#999",
                    marginBottom: "0.75rem",
                  }}
                >
                  Crowncut Gems International AB
                </p>
                <h1
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    lineHeight: 1.2,
                    marginBottom: "1.5rem",
                  }}
                >
                  Contact Us
                </h1>
                <div
                  style={{
                    width: 48,
                    height: 2,
                    background: "#1a1a1a",
                    margin: "0 auto",
                  }}
                />
              </div>

              {/* Information Cards */}
              <div className="row g-4 mb-5">
                <div className="col-md-6">
                  <div
                    style={{
                      background: "#fafafa",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 12,
                      padding: "2rem",
                      height: "100%",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        marginBottom: "1rem",
                        color: "#1a1a1a",
                      }}
                    >
                      Email &amp; Inquiries
                    </h2>
                    <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.6 }}>
                      For gemstone inquiries, bespoke commissions, certificate verification, or order support:
                    </p>
                    <a
                      href="mailto:info@crowncutgems.com"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#1a1a1a",
                        textDecoration: "underline",
                      }}
                    >
                      info@crowncutgems.com
                    </a>
                    <p
                      style={{
                        marginTop: "1rem",
                        fontSize: "0.85rem",
                        color: "#777",
                      }}
                    >
                      Response time: Within 24 hours (Monday &ndash; Friday)
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div
                    style={{
                      background: "#fafafa",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 12,
                      padding: "2rem",
                      height: "100%",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        marginBottom: "1rem",
                        color: "#1a1a1a",
                      }}
                    >
                      Headquarters
                    </h2>
                    <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 0 }}>
                      <strong>Crowncut Gems International AB</strong>
                      <br />
                      Studiegången 8<br />
                      416 81 Göteborg<br />
                      Sweden
                    </p>
                    <p
                      style={{
                        marginTop: "1rem",
                        fontSize: "0.85rem",
                        color: "#777",
                      }}
                    >
                      Private consultations available by appointment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation Note */}
              <div
                style={{
                  background: "#f5f5f0",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 12,
                  padding: "2rem",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  Custom Gemstone Sourcing &amp; Bespoke Designs
                </h3>
                <p
                  style={{
                    color: "#555",
                    fontSize: "0.95rem",
                    maxWidth: 580,
                    margin: "0 auto 1.5rem auto",
                    lineHeight: 1.6,
                  }}
                >
                  Searching for a specific untreated sapphire, emerald, ruby, or custom jewelry setting? Reach out to our gemology specialists with your specifications.
                </p>
                <a
                  href="mailto:info@crowncutgems.com?subject=Custom%20Gemstone%20Inquiry"
                  className="btn btn-dark"
                  style={{
                    padding: "0.75rem 2rem",
                    borderRadius: 8,
                    fontWeight: 500,
                  }}
                >
                  Send an Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
