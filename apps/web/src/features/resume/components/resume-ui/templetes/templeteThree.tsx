"use client";

import React from "react";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiGithub,
    FiLinkedin,
    FiGlobe,
    FiExternalLink,
    FiBriefcase,
    FiCode,
    FiBookOpen,
    FiUser,
} from "react-icons/fi";

type ResumeProps = {
    d: any;
};

const FONT = "'Inter', 'Segoe UI', sans-serif";

const COLORS = {
    primary: "#2563EB",
    dark: "#111827",
    text: "#374151",
    light: "#6B7280",
    border: "#E5E7EB",
    background: "#FFFFFF",
    chip: "#F3F4F6",
};

const bodyStyle: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: 12,
    color: COLORS.text,
    lineHeight: 1.7,
};

const headingStyle: React.CSSProperties = {
    fontFamily: FONT,
    fontWeight: 700,
    fontSize: 14,
    color: COLORS.dark,
    letterSpacing: 0.8,
    textTransform: "uppercase",
};

function Divider({ height=1, color=COLORS.border }: { height?: number, color?: string }) {
    return (
        <div
            style={{
                borderRadius: 100,
                height: height ,
                background: color ,
                marginTop: 8,
                marginBottom: 14,
            }}
        />
    );
}

function Section({
    title,
    icon,
    children,
}: {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <section style={{ marginBottom: 24 }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <div style={{ color: COLORS.primary }}>{icon}</div>

                <div style={headingStyle}>{title}</div>
            </div>

            <Divider />

            {children}
        </section>
    );
}

function ContactItem({
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
                color: COLORS.text,
                textDecoration: "none",
                fontSize: 12.5,
                fontFamily: FONT,
            }}
        >
            {icon}
            {value}
        </a>
    );
}

function BulletList({
    items,
}: {
    items: string[];
}) {
    return (
        <ul
            style={{
                margin: "8px 0 0",
                paddingLeft: 18,
            }}
        >
            {items
                ?.filter(Boolean)
                .map((item, i) => (
                    <li
                        key={i}
                        style={{
                            ...bodyStyle,
                            marginBottom: 5,
                        }}
                    >
                        {item}
                    </li>
                ))}
        </ul>
    );
}

function SkillChip({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div
            style={{
                marginBottom: 10,
                display: "flex",
                alignItems: "center"
            }}
        >
            <div
                style={{
                    fontWeight: 600,
                    fontSize: 16,
                    marginBottom: 5,
                    color: COLORS.dark,
                }}
            >
                {title} :
            </div>

            <div
                style={{
                    margin: 4,
                    gap: 4,
                    display: "flex",
                    flexWrap: "wrap",
                    ...bodyStyle,
                }}
            >
                {value.split(",").map((i) => (<div key={i} style={
                    {
                        background: 'cornflowerblue',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: 6
                    }
                } >{i}</div>))}
            </div>
        </div>
    );
}

function ProjectCard({
    project,
}: {
    project: any;
}) {
    return (
        <div
            style={{
                borderLeft: `4px solid ${COLORS.primary}`,
                paddingLeft: 14,
                marginBottom: 20,
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 5,
                }}
            >
                <div>
                    <div
                        style={{
                            fontWeight: 700,
                            fontSize: 14,
                            color: COLORS.dark,
                        }}
                    >
                        {project.name}
                    </div>

                    {project.type && (
                        <div
                            style={{
                                color: COLORS.light,
                                fontSize: 11,
                            }}
                        >
                            {project.type}
                        </div>
                    )}
                </div>

                {project.url && (
                    <a
                        href={project.url}
                        style={{
                            display: "flex",
                            gap: 4,
                            alignItems: "center",
                            color: COLORS.primary,
                            textDecoration: "none",
                            fontSize: 11,
                        }}
                    >
                        <FiExternalLink />
                        {project.urlLabel || "Visit"}
                    </a>
                )}
            </div>

            {project.description && (
                <p
                    style={{
                        ...bodyStyle,
                        margin: "6px 0",
                    }}
                >
                    {project.description}
                </p>
            )}

            <BulletList items={project.points || []} />
        </div>
    );
}

export default function TemplateThree({
    d,
}: ResumeProps) {
    const P = d.personal;

    return (
        <div
            id="resume-preview"
            style={{
                background: "#fff",
                padding: 34,
                fontFamily: FONT,
            }}
        >
            {/* ================= HEADER ================= */}

            <div
                style={{
                    color: "black"
                }}
            >
                <div
                    style={{
                        fontSize: 32,
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        letterSpacing: 1,
                        color: "black"
                    }}
                >
                    {P.name}
                </div>

                <div
                    style={{
                        fontSize: 20,
                        opacity: 0.95,
                        marginBottom: 4

                    }}
                >
                    {P.role || "Professional"}
                </div>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: 10,
                        columnGap: 20,
                        marginBottom: 20
                    }}
                >
                    <ContactItem
                        icon={<FiPhone />}
                        value={P.phone}
                        href={`tel:${P.phone}`}
                    />

                    <ContactItem
                        icon={<FiMail />}
                        value={P.email}
                        href={`mailto:${P.email}`}
                    />

                    <ContactItem
                        icon={<FiMapPin />}
                        value={P.location}
                    />

                    <ContactItem
                        icon={<FiLinkedin />}
                        value={P.linkedin}
                        href={P.linkedinUrl}
                    />

                    <ContactItem
                        icon={<FiGithub />}
                        value={P.github}
                        href={P.githubUrl}
                    />

                    <ContactItem
                        icon={<FiGlobe />}
                        value={P.portfolio}
                        href={P.portfolioUrl}
                    />
                </div>
            </div>

            <Divider height={6} color="cornflowerblue" />

            {/* ================= SUMMARY ================= */}

            {P.summary && (
                <Section title="Professional Summary" icon={<FiUser size={16} />}>
                    <p
                        style={{
                            ...bodyStyle,
                            margin: 0,
                            textAlign: "justify",
                        }}
                    >
                        {P.summary}
                    </p>
                </Section>
            )}

            {/* ================= SKILLS ================= */}

            {d.skills?.filter((s: any) => s.label || s.value).length > 0 && (
                <Section title="Technical Skills" icon={<FiCode size={16} />}>
                    <div
                    // style={{
                    //     display: "grid",
                    //     gridTemplateColumns: "1fr 1fr",
                    //     columnGap: 18,
                    //     rowGap: 4,
                    // }}
                    >
                        {d.skills
                            .filter((s: any) => s.label || s.value)
                            .map((skill: any) => (
                                <SkillChip
                                    key={skill.id}
                                    title={skill.label}
                                    value={skill.value}
                                />
                            ))}
                    </div>
                </Section>
            )}

            {/* ================= EXPERIENCE ================= */}

            {d.experience?.length > 0 && (
                <Section
                    title="Professional Experience"
                    icon={<FiBriefcase size={16} />}
                >
                    {d.experience.map((exp: any, index: number) => (
                        <div
                            key={exp.id}
                            style={{
                                position: "relative",
                                paddingLeft: 24,
                                marginBottom:
                                    index === d.experience.length - 1 ? 0 : 24,
                            }}
                        >
                            {/* timeline */}

                            <div
                                style={{
                                    position: "absolute",
                                    left: 5,
                                    top: 6,
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: COLORS.primary,
                                }}
                            />

                            {index !== d.experience.length - 1 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        left: 9,
                                        top: 16,
                                        width: 2,
                                        bottom: -22,
                                        background: COLORS.border,
                                    }}
                                />
                            )}

                            {/* heading */}

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    gap: 12,
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: COLORS.dark,
                                        }}
                                    >
                                        {exp.role}
                                    </div>

                                    <div
                                        style={{
                                            color: COLORS.light,
                                            fontSize: 12,
                                            marginTop: 3,
                                        }}
                                    >
                                        {exp.company}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        background: COLORS.chip,
                                        padding: "4px 10px",
                                        borderRadius: 20,
                                        fontSize: 11,
                                        color: COLORS.dark,
                                        whiteSpace: "nowrap",
                                        fontWeight: 600,
                                    }}
                                >
                                    {exp.period}
                                </div>
                            </div>

                            <BulletList items={exp.points || []} />
                        </div>
                    ))}
                </Section>
            )}
            {/* ================= PROJECTS ================= */}

            {d.projects?.length > 0 && (
                <Section title="Projects" icon={<FiCode size={16} />}>
                    {d.projects.map((project: any) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}

                    {P.portfolioUrl && (
                        <div
                            style={{
                                marginTop: 18,
                                padding: "12px 16px",
                                background: COLORS.chip,
                                borderRadius: 8,
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: 600,
                                    color: COLORS.dark,
                                    marginBottom: 6,
                                }}
                            >
                                More Projects
                            </div>

                            <a
                                href={`${P.portfolioUrl}/projects`}
                                style={{
                                    color: COLORS.primary,
                                    textDecoration: "none",
                                    fontSize: 12,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    wordBreak: "break-all",
                                }}
                            >
                                <FiExternalLink />
                                {`${P.portfolioUrl}/projects`}
                            </a>
                        </div>
                    )}
                </Section>
            )}

            {/* ================= EDUCATION ================= */}

            {d.education?.length > 0 && (
                <Section title="Education" icon={<FiBookOpen size={16} />}>
                    {d.education.map((edu: any, index: number) => (
                        <div
                            key={edu.id}
                            style={{
                                marginBottom:
                                    index === d.education.length - 1 ? 0 : 18,
                                padding: "14px 16px",
                                border: `1px solid ${COLORS.border}`,
                                borderRadius: 10,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 16,
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: COLORS.dark,
                                            marginBottom: 4,
                                        }}
                                    >
                                        {edu.school}
                                    </div>

                                    <div
                                        style={{
                                            fontSize: 12,
                                            color: COLORS.text,
                                        }}
                                    >
                                        {edu.degree}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        textAlign: "right",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 11,
                                            fontWeight: 600,
                                            color: COLORS.dark,
                                            marginBottom: 4,
                                        }}
                                    >
                                        {edu.period}
                                    </div>

                                    {edu.grade && (
                                        <div
                                            style={{
                                                fontSize: 11,
                                                color: COLORS.light,
                                            }}
                                        >
                                            {edu.grade}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </Section>
            )}

            {/* ================= FOOTER ================= */}

            <div
                style={{
                    marginTop: 30,
                    paddingTop: 16,
                    borderTop: `1px solid ${COLORS.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: COLORS.light,
                    fontSize: 11,
                }}
            >
                <span>
                    {P.name}
                </span>

                <span>
                    Resume
                </span>
            </div>
        </div>
    );
}