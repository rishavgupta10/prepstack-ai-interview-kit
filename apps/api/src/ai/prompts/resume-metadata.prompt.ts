export const resumeMetadataPrompt = (rawText: string) => `
Analyze the following resume raw text and extract all details to format them into a structured JSON object matching the schema below.
Make sure all required fields are filled. If a required field is not present in the resume text, provide a reasonable default (like an empty string or a placeholder derived from context) so that the JSON validation does not fail.

Group skills into logical categories (such as Languages, Frontend, Backend, Database & Caching, DevOps & Tools, AI Tools & Platforms, Design & Schema Tools, Concepts, etc.). For each category, return the category name as 'label' and a comma-separated list of all relevant skills in that category as 'value'. Do not return each skill as its own separate category; group them together.
JSON Schema:
{
  "personal": {
    "name": "Full name of the person (required)",
    "role": "Current job title or role (e.g., Software Engineer) (required)",
    "phone": "Phone number (required)",
    "email": "Email address (required)",
    "location": "Location (city, state, or country) (required)",
    "linkedinUrl": "LinkedIn profile URL (optional, omit or set to empty string if not found)",
    "githubUrl": "GitHub profile URL (optional, omit or set to empty string if not found)",
    "portfolioUrl": "Portfolio or personal website URL (optional, omit or set to empty string if not found)",
    "summary": "A brief professional summary of the person (required)"
  },
  "education": [
    {
      "school": "Name of school/university (required)",
      "degree": "Degree and major (required)",
      "period": "Time period of attendance (e.g., 2018 - 2022) (required)",
      "grade": "GPA or Grade (optional)"
    }
  ],
  "skills": [
    {
      "label": "Skill Category name (e.g., Languages, Frontend, Backend, Database & Caching, DevOps & Tools, AI Tools & Platforms, Design & Schema Tools, Concepts, etc.) (required)",
      "value": "A comma-separated string list of all skills belonging to this category (e.g., React.js, Next.js, HTML5, CSS3, Tailwind CSS) (required)"
    }
  ],
  "experience": [
    {
      "role": "Job role / title (required)",
      "company": "Company name (required)",
      "period": "Time period (e.g., 2022 - Present) (required)",
      "points": [
        "Description bullet point 1 (required, provide at least one bullet point)"
      ]
    }
  ],
  "projects": [
    {
      "name": "Project name (required)",
      "type": "Project type (e.g., Web App, Open Source, Personal) (required)",
      "url": "Project link URL (optional)",
      "urlLabel": "Label for the URL (e.g., Live Demo, Source Code) (optional)",
      "description": "Short description of the project (required)",
      "points": [
        "Project detail bullet point 1 (required, provide at least one bullet point)"
      ]
    }
  ]
}

Return ONLY valid JSON. Do not write any markdown code block formatting (like \`\`\`json or \`\`\`), do not write explanations, just return the raw JSON string.

Resume text:
${rawText}
`;
