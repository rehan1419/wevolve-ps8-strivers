import { skillMap } from "./skillMapper.js";

const templates = [
  // TEMPLATE 0 — Standard / Corporate
  function templateStandard(input) {
    return {
      title: `${input.jobTitle} at ${input.company || "Our Company"}`,

      about: `
We are looking for a ${input.jobTitle} to join our ${input.industry} team.
In this role, you will collaborate with cross-functional teams to design,
build, and maintain scalable solutions that align with business goals.

This position offers an opportunity to work on impactful projects while
developing your technical and professional skills.
      `.trim(),

      responsibilities: mapSkills(input.keySkills),
      requiredSkills: input.keySkills,
      preferredSkills: ["Cloud platforms", "CI/CD", "Agile methodology"],

      experience: experienceText(input.experienceLevel),

      benefits: benefitsByCulture(input.companyCulture),

      company: `
${input.company || "Our Company"} is a growing organization in the ${
        input.industry
      } space, focused on innovation, quality, and long-term impact.
      `.trim()
    };
  },

  // TEMPLATE 1 — Startup / Impact-driven
  function templateStartup(input) {
    return {
      title: `${input.jobTitle} | Build With Us`,

      about: `
We are a fast-growing ${input.industry} company looking for a passionate
${input.jobTitle}. You will play a key role in shaping our product,
making architectural decisions, and driving innovation.

If you enjoy ownership, rapid learning, and solving real-world problems,
this role is for you.
      `.trim(),

      responsibilities: mapSkills(input.keySkills),
      requiredSkills: input.keySkills,
      preferredSkills: ["Startup experience", "Product mindset"],

      experience: experienceText(input.experienceLevel),

      benefits: benefitsByCulture(input.companyCulture),

      company: `
We are a mission-driven team building meaningful solutions for real users.
Our culture values ownership, transparency, and continuous improvement.
      `.trim()
    };
  },

  // TEMPLATE 2 — Technical / Role-focused
  function templateTechnical(input) {
    return {
      title: `${input.jobTitle} – Technical Role`,

      about: `
As a ${input.jobTitle}, you will be responsible for designing, implementing,
and optimizing systems within our ${input.industry} platform.

This role is ideal for candidates who enjoy deep technical challenges and
working with modern technologies.
      `.trim(),

      responsibilities: mapSkills(input.keySkills),
      requiredSkills: input.keySkills,
      preferredSkills: ["System design", "Performance optimization"],

      experience: experienceText(input.experienceLevel),

      benefits: benefitsByCulture(input.companyCulture),

      company: `
We are a technology-focused organization committed to building reliable,
high-quality software systems.
      `.trim()
    };
  }
];

// 🔹 Helper functions
function mapSkills(skills = []) {
  return skills.flatMap(skill => skillMap[skill] || []).slice(0, 7);
}

function experienceText(level) {
  if (level === "Entry") return "0–2 years of relevant experience";
  if (level === "Mid") return "3–5 years of relevant experience";
  return "5+ years of relevant experience";
}

function benefitsByCulture(culture) {
  if (culture === "Startup") {
    return [
      "High ownership and impact",
      "Flexible working hours",
      "Fast-paced learning environment"
    ];
  }
  return [
    "Structured career growth",
    "Health insurance benefits",
    "Work-life balance"
  ];
}

// 🔹 Main export
export function generateTemplate(input, templateIndex = 0) {
  const templateFn = templates[templateIndex % templates.length];
  return templateFn(input);
}

export const TOTAL_TEMPLATES = templates.length;
