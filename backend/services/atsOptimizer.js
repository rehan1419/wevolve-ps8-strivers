export function atsFormat(jd) {
  return `
${jd.title}

About the Role:
${jd.about}

Key Responsibilities:
${jd.responsibilities.map(r => `- ${r}`).join("\n")}

Required Skills:
${jd.requiredSkills.map(s => `- ${s}`).join("\n")}

Experience:
${jd.experience}

What We Offer:
${jd.benefits.map(b => `- ${b}`).join("\n")}
`.trim();
}
