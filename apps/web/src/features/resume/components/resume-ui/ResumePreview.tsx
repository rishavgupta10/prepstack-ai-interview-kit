/* ── RESUME PREVIEW — Bitter headings + Open Sans body ── */
"use client"
import { ReactNode, CSSProperties } from "react";
import { CiLinkedin, CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { LuGithub } from "react-icons/lu";
import { TbWorldWww } from "react-icons/tb";

const BITTER = "'Bitter', Georgia, serif";
const OPENSANS = "'Open Sans', 'Segoe UI', sans-serif";

/* ── types ── */

interface Personal {
    name: string;
    role: string;
    phone: string;
    email: string;
    location: string;
    linkedin: string;
    linkedinUrl: string;
    github: string;
    githubUrl: string;
    portfolio: string;
    portfolioUrl: string;
    summary: string;
}

interface Education {
    id: number | string;
    school: string;
    degree: string;
    period: string;
    grade: string;
}

interface Skill {
    id: number | string;
    label: string;
    value: string;
}

interface Experience {
    id: number | string;
    role: string;
    company: string;
    period: string;
    points: string[];
}

interface Project {
    id: number | string;
    name: string;
    type: string;
    url: string;
    urlLabel: string;
    description: string;
    points: string[];
}

interface ResumeData {
    personal: Personal;
    education: Education[];
    skills: Skill[];
    experience: Experience[];
    projects: Project[];
}

/* ── small layout helpers ── */

interface SectionProps {
    title: string;
    children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div style={{ marginTop: 16 }}>
      <div
        style={{
          fontFamily: BITTER,
          fontWeight: 700,
          fontSize: 12.5,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          textAlign: "center",
          marginBottom: 5,
        }}
      >
        {title}
      </div>
      <FullRule />
      <div style={{ marginTop: 8 }}>{children}</div>
    </div>
  );
}

interface RowSpreadProps {
    left: ReactNode;
    right: ReactNode;
}

function RowSpread({ left, right }: RowSpreadProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 8,
      }}
    >
      <div style={{ flex: 1 }}>{left}</div>
      <div style={{ flexShrink: 0 }}>{right}</div>
    </div>
  );
}

function FullRule() {
  return <div style={{ borderTop: "1.5px solid #111", margin: 0 }} />;
}

function ThinRule() {
  return <div style={{ borderTop: "1px solid #ddd", margin: "12px 0" }} />;
}

function HR() {
  return <FullRule />;
}

function Pipe() {
  return (
    <span
      style={{
        color: "#bbb",
        fontFamily: OPENSANS,
        userSelect: "none",
        fontSize: 12,
      }}
    >
      |
    </span>
  );
}

interface ResumePreviewProps {
    d: ResumeData;
}

export default function ResumePreview({ d }: ResumePreviewProps) {
  const P = d.personal;

  // reusable style tokens
  const body: CSSProperties = {
    fontFamily: OPENSANS,
    fontSize: 12,
    color: "#222",
    lineHeight: 1.68,
  };
  const meta: CSSProperties = {
    fontFamily: OPENSANS,
    fontSize: 11.5,
    color: "#333",
    fontStyle: "italic",
  };
  const lnk: CSSProperties = {
    fontFamily: OPENSANS,
    fontSize: 13,
    color: "blue",
    fontWeight: 600,
    // textDecoration: "underline",
    display: "flex",
    gap: "5px",
  };

  return (
    <div
      id="resume-preview"
      style={{
        background: "#fff",
        color: "#111",
        padding: "20px 46px 44px",
        lineHeight: 1.5,
      }}
    >
      {/* ── NAME + CONTACT HEADER ── */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            fontFamily: BITTER,
            fontSize: 27,
            fontWeight: 700,
            letterSpacing: "0.01em",
          }}
        >
          {P.name || "Your Name"}
        </div>
        <p
          style={{
            // fontFamily: BITTER,
            color: "#555",
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: "0.01em",
            marginTop: 0,
            marginBottom: 8,
          }}
        >
         {P.role || "your role"}
        </p>

        {/* row 1: links + phone */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            columnGap: 6,
            rowGap: 0,
            marginBottom: 3,
          }}
        >
          {P.phone && (
            <>
              <a
                href={`tel:${P.phone}`}
                style={{ ...body, fontSize: 12, ...lnk }}
              >
                <FiPhone size={16} color="black" />
                {P.phone}
              </a>{" "}
              <Pipe />
            </>
          )}
          {P.email && (
            <>
              <a href={`mailto:${P.email}`} style={lnk}>
                <CiMail size={20} color="black" />
                {P.email}
              </a>
              <Pipe />
            </>
          )}
          {P.linkedin && (
            <>
              <a href={P.linkedinUrl} style={lnk}>
                <CiLinkedin size={20} color="black" /> {P.linkedin}
              </a>
              <Pipe />
            </>
          )}
          {P.github && (
            <>
              <a href={P.githubUrl} style={lnk}>
                <LuGithub size={20} color="black" />
                {P.github}
              </a>
              <Pipe />
            </>
          )}

          {P.portfolio && (
            <>
              <a href={P.portfolioUrl} style={lnk}>
                <TbWorldWww size={20} color="black" />
                {P.portfolio}
              </a>
              <Pipe />
            </>
          )}
        </div>

        {/* row 2: email + location */}
      </div>

      {/* <FullRule /> */}

      {/* ── SUMMARY ── */}
      {P.summary && (
        <Section title="Professional summary">
        <p style={{ ...body, textAlign: "justify", margin: "10px 0 2px" }}>
          {P.summary}
        </p>
        </Section>
      )}

      {/* ── SKILLS ── */}
      {d.skills.filter((s) => s.label || s.value).length > 0 && (
        <Section title="TECHNICAL Skills">
          <ul style={{ listStyle: "disc", paddingLeft: 18, margin: 0 }}>
            {d.skills
              .filter((s) => s.label || s.value)
              .map((sk) => (
                <li key={sk.id} style={{ ...body, marginBottom: 3 }}>
                  <span
                    style={{
                      fontFamily: BITTER,
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  >
                    {sk.label}:
                  </span>{" "}
                  {sk.value}
                </li>
              ))}
          </ul>
        </Section>
      )}

      {/* ── WORK EXPERIENCE ── */}
      {d.experience.length > 0 && (
        <Section title="PROFESSIONAL EXPERIENCE">
          {d.experience.map((exp, i) => (
            <div
              key={exp.id}
              style={{ marginBottom: i < d.experience.length - 1 ? 12 : 0 }}
            >
              <RowSpread
                left={
                  <span>
                    <span
                      style={{
                        fontFamily: BITTER,
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      {exp.role}
                    </span>
                    {exp.company && <span style={meta}> — {exp.company}</span>}
                  </span>
                }
                right={<span style={meta}>{exp.period}</span>}
              />
              <ul
                style={{ listStyle: "none", paddingLeft: 0, margin: "5px 0 0" }}
              >
                {exp.points.filter(Boolean).map((pt, j) => (
                  <li
                    key={j}
                    style={{
                      ...body,
                      paddingLeft: 12,
                      position: "relative",
                      marginBottom: 2,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.05em",
                        color: "#555",
                      }}
                    >
                      –
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              {i < d.experience.length - 1 && <ThinRule />}
            </div>
          ))}
        </Section>
      )}

      {/* ── PROJECTS ── */}
      {d.projects.length > 0 && (
        <Section title="Projects">
          {d.projects.map((proj, i) => (
            <div
              key={proj.id}
              style={{ marginBottom: i < d.projects.length - 1 ? 14 : 0 }}
            >
              <div style={{ marginBottom: 5 }}>
                <span
                  style={{ fontFamily: BITTER, fontWeight: 600, fontSize: 13 }}
                >
                  {proj.name}
                </span>
                {proj.type && (
                  <span
                    style={{
                      fontFamily: OPENSANS,
                      fontSize: 12,
                      color: "#444",
                    }}
                  >
                    {" "}
                    | {proj.type}
                  </span>
                )}
                {proj.url && (
                  <span
                    style={{
                      fontFamily: OPENSANS,
                      fontSize: 12,
                      color: "#444",
                    }}
                  >
                    {" | "}
                    <a href={proj.url} style={lnk}>
                      {proj.urlLabel || proj.url}
                    </a>
                  </span>
                )}
              </div>
              {proj.description && (
                <p style={{ ...body, textAlign: "justify", marginBottom: 7 }}>
                  {proj.description}
                </p>
              )}
              {proj.points.filter(Boolean).length > 0 && (
                <>
                  <div
                    style={{
                      fontFamily: OPENSANS,
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#555",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 5,
                    }}
                  >
                    Key Features
                  </div>
                  <ul style={{ paddingLeft: 18, margin: 0 }}>
                    {proj.points.filter(Boolean).map((pt, j) => (
                      <li key={j} style={{ ...body, marginBottom: 3 }}>
                        • {pt}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {i < d.projects.length - 1 && <ThinRule />}
            </div>
          ))}
          {/* <div>
            <p>
              View all Projects on :{" "}
              <a style={{ ...lnk, textDecoration:"underline"}} href={`${P.portfolioUrl}projects`}>
                {`${P.portfolioUrl}projects`}
              </a>{" "}
            </p>
          </div> */}
        </Section>
      )}
      {/* ── EDUCATION ── */}
      {d.education.length > 0 && (
        <Section title="Education">
          {d.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 4 }}>
              <RowSpread
                left={
                  <span
                    style={{
                      fontFamily: BITTER,
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {edu.school}
                  </span>
                }
                right={<span style={meta}>{edu.period}</span>}
              />
              <RowSpread
                left={<span style={meta}>{edu.degree}</span>}
                right={
                  <span style={{ ...meta, fontWeight: 600 }}>{edu.grade}</span>
                }
              />
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}