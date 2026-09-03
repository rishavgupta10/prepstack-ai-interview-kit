"use client";

import React from "react";
import {
  FiPhone,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiGlobe,
  FiMapPin,
  FiExternalLink,
} from "react-icons/fi";

type Props = {
  d: any;
};

const COLORS = {
  primary: "#2563EB",
  dark: "#111827",
  text: "#374151",
  light: "#6B7280",
  border: "#E5E7EB",
  bg: "#FFFFFF",
  sidebar: "#F8FAFC",
};

const FONT = "'Inter','Segoe UI',sans-serif";

const body = {
  fontFamily: FONT,
  fontSize: 12,
  color: COLORS.text,
  lineHeight: 1.7,
} as React.CSSProperties;

function SectionTitle({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          width: 5,
          height: 22,
          borderRadius: 30,
          background: COLORS.primary,
        }}
      />

      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1,
          color: COLORS.dark,
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
    </div>
  );
}

function Contact({
  icon,
  value,
  href,
}: {
  icon: React.ReactNode;
  value?: string;
  href?: string;
}) {
  if (!value) return null;

  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: "#fff",
        textDecoration: "none",
        fontSize: 11,
      }}
    >
      {icon}
      {value}
    </a>
  );
}

function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 12,
        padding: 18,
        marginBottom: 18,
      }}
    >
      {children}
    </div>
  );
}

export default function TemplateFour({ d }: Props) {
  const P = d.personal;

  return (
    <div
      id="resume-preview"
      style={{
        background: "#fff",
        padding: 32,
        fontFamily: FONT,
      }}
    >
      {/* HEADER */}

      <div
        style={{
          background: COLORS.dark,
          borderRadius: 18,
          padding: "28px 30px",
          marginBottom: 24,
          color: "#fff",
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          {P.name}
        </div>

        <div
          style={{
            marginTop: 6,
            color: "#CBD5E1",
            fontSize: 15,
            marginBottom: 22,
          }}
        >
          {P.role || "Software Developer"}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <Contact
            icon={<FiPhone />}
            value={P.phone}
            href={`tel:${P.phone}`}
          />

          <Contact
            icon={<FiMail />}
            value={P.email}
            href={`mailto:${P.email}`}
          />

          <Contact
            icon={<FiMapPin />}
            value={P.location}
          />

          <Contact
            icon={<FiLinkedin />}
            value={P.linkedin}
            href={P.linkedinUrl}
          />

          <Contact
            icon={<FiGithub />}
            value={P.github}
            href={P.githubUrl}
          />

          <Contact
            icon={<FiGlobe />}
            value={P.portfolio}
            href={P.portfolioUrl}
          />
        </div>
      </div>

      {/* MAIN GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* LEFT SIDEBAR */}

        <div>
                      {/* ===== PROFILE ===== */}

          <Card>
            <SectionTitle title="Profile" />

            <p
              style={{
                ...body,
                margin: 0,
                textAlign: "justify",
              }}
            >
              {P.summary}
            </p>
          </Card>

          {/* ===== SKILLS ===== */}

          <Card>
            <SectionTitle title="Skills" />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              {d.skills
                ?.filter((s: any) => s.label || s.value)
                .map((skill: any) => (
                  <div key={skill.id}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: COLORS.dark,
                        marginBottom: 10,
                      }}
                    >
                      {skill.label}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      {skill.value
                        .split(",")
                        .map((item: string, index: number) => (
                          <span
                            key={index}
                            style={{
                              background: "#EFF6FF",
                              color: COLORS.primary,
                              padding: "5px 10px",
                              borderRadius: 999,
                              fontSize: 10.5,
                              fontWeight: 600,
                              border: "1px solid #BFDBFE",
                              lineHeight: 1.3,
                            }}
                          >
                            {item.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          {/* ===== QUICK LINKS ===== */}

          <Card>
            <SectionTitle title="Links" />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {P.portfolio && (
                <a
                  href={P.portfolioUrl}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: COLORS.primary,
                    textDecoration: "none",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <FiGlobe size={15} />
                  {P.portfolio}
                </a>
              )}

              {P.github && (
                <a
                  href={P.githubUrl}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: COLORS.primary,
                    textDecoration: "none",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <FiGithub size={15} />
                  {P.github}
                </a>
              )}

              {P.linkedin && (
                <a
                  href={P.linkedinUrl}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: COLORS.primary,
                    textDecoration: "none",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <FiLinkedin size={15} />
                  {P.linkedin}
                </a>
              )}
            </div>
          </Card>

        </div>

        {/* ================= RIGHT CONTENT ================= */}

        <div>          {/* ================= EXPERIENCE ================= */}

          <SectionTitle title="Professional Experience" />

          {d.experience?.map((exp: any, index: number) => (
            <div
              key={exp.id}
              style={{
                position: "relative",
                paddingLeft: 30,
                marginBottom: 28,
              }}
            >
              {/* Timeline */}

              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 6,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: COLORS.primary,
                  border: "3px solid #DBEAFE",
                }}
              />

              {index !== d.experience.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: 6,
                    top: 22,
                    bottom: -26,
                    width: 2,
                    background: "#DBEAFE",
                  }}
                />
              )}

              <Card>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: COLORS.dark,
                      }}
                    >
                      {exp.role}
                    </div>

                    <div
                      style={{
                        marginTop: 4,
                        color: COLORS.light,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {exp.company}
                    </div>
                  </div>

                  <div
                    style={{
                      whiteSpace: "nowrap",
                      background: "#EFF6FF",
                      color: COLORS.primary,
                      padding: "6px 12px",
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                      height: "fit-content",
                    }}
                  >
                    {exp.period}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {exp.points?.map((point: string, i: number) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          marginTop: 7,
                          borderRadius: "50%",
                          background: COLORS.primary,
                          flexShrink: 0,
                        }}
                      />

                      <div style={body}>
                        {point}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}

          {/* ================= PROJECTS ================= */}

          <SectionTitle title="Featured Projects" />

          {d.projects?.map((project: any) => (
            <div
              key={project.id}
              style={{
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  border: "1px solid #E5E7EB",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                {/* Top Accent */}

                <div
                  style={{
                    height: 6,
                    background: COLORS.primary,
                  }}
                />

                <div
                  style={{
                    padding: 20,
                  }}
                >
                  {/* Header */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      marginBottom: 10,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          color: COLORS.dark,
                        }}
                      >
                        {project.name}
                      </div>

                      <div
                        style={{
                          color: COLORS.light,
                          fontSize: 12,
                          marginTop: 4,
                        }}
                      >
                        {project.type}
                      </div>
                    </div>

                    {project.url && (
                      <a
                        href={project.url}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          color: COLORS.primary,
                          textDecoration: "none",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        <FiExternalLink size={13} />
                        {project.urlLabel || "Visit"}
                      </a>
                    )}
                  </div>

                  {/* Description */}

                  {project.description && (
                    <p
                      style={{
                        ...body,
                        marginTop: 0,
                        marginBottom: 16,
                      }}
                    >
                      {project.description}
                    </p>
                  )}

                  {/* Feature Pills */}

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    {project.points?.map(
                      (point: string, index: number) => (
                        <div
                          key={index}
                          style={{
                            background: "#F9FAFB",
                            border: "1px solid #E5E7EB",
                            borderRadius: 999,
                            padding: "7px 12px",
                            fontSize: 11,
                            color: COLORS.text,
                          }}
                        >
                          ✓ {point}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
                    {/* ================= EDUCATION ================= */}

          <SectionTitle title="Education" />

          {d.education?.map((edu: any) => (
            <Card key={edu.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 18,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.dark,
                      marginBottom: 6,
                    }}
                  >
                    {edu.degree}
                  </div>

                  <div
                    style={{
                      color: COLORS.text,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {edu.school}
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "right",
                    minWidth: 110,
                  }}
                >
                  <div
                    style={{
                      background: "#EFF6FF",
                      color: COLORS.primary,
                      padding: "6px 12px",
                      borderRadius: 999,
                      display: "inline-block",
                      fontSize: 11,
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    {edu.period}
                  </div>

                  {edu.grade && (
                    <div
                      style={{
                        fontSize: 12,
                        color: COLORS.light,
                        fontWeight: 600,
                      }}
                    >
                      {edu.grade}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {/* ================= PORTFOLIO ================= */}

          {P.portfolioUrl && (
            <Card>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: COLORS.dark,
                      marginBottom: 4,
                    }}
                  >
                    Explore More Projects
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: COLORS.light,
                    }}
                  >
                    Visit my complete portfolio for additional work and case
                    studies.
                  </div>
                </div>

                <a
                  href={`${P.portfolioUrl}/projects`}
                  style={{
                    background: COLORS.primary,
                    color: "#fff",
                    textDecoration: "none",
                    padding: "10px 18px",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  View Projects
                  <FiExternalLink />
                </a>
              </div>
            </Card>
          )}

        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <div
        style={{
          marginTop: 36,
          borderTop: "1px solid #E5E7EB",
          paddingTop: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: COLORS.light,
          fontSize: 11,
        }}
      >
        <div>
          <strong>{P.name}</strong>
        </div>

        <div>
          Generated using Resume Builder
        </div>
      </div>

    </div>
  );
}