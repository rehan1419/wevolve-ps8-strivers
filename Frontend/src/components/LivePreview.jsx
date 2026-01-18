// LivePreview.jsx
import { useEffect, useState } from "react";

export default function LivePreview({ formData }) {
  const [previewHTML, setPreviewHTML] = useState("");

  useEffect(() => {
    const generatePreview = () => {
      const { 
        jobTitle, 
        industry, 
        experienceLevel, 
        keySkills = [], 
        companyCulture, 
        specialRequirements 
      } = formData;

      let html = `
        <div class="live-preview-content">
          <div class="preview-header">
            <h2 class="preview-title">${jobTitle || "Job Title"}</h2>
            <div class="preview-subtitle">
              ${industry || "Industry"} • ${experienceLevel || "Experience Level"}
            </div>
          </div>

          <div class="preview-section">
            <h3 class="section-title">📝 Overview</h3>
            <p class="section-content">
              We are looking for a talented <strong>${jobTitle || "professional"}</strong> 
              to join our team in the <strong>${industry || "tech"}</strong> industry. 
              This is a <strong>${experienceLevel || "mid-level"}</strong> position ideal for someone 
              passionate about innovation and growth.
            </p>
          </div>

          <div class="preview-section">
            <h3 class="section-title">🎯 Key Responsibilities</h3>
            <ul class="responsibilities-list">
              <li>Collaborate with cross-functional teams to deliver high-quality solutions</li>
              <li>Participate in the full software development lifecycle</li>
              <li>Contribute to architectural decisions and technical roadmap</li>
              <li>Mentor junior team members and promote best practices</li>
              <li>${jobTitle ? `Lead ${jobTitle.toLowerCase()} initiatives and projects` : "Drive key projects and initiatives"}</li>
            </ul>
          </div>
      `;

      // Skills Section
      if (keySkills.length > 0) {
        html += `
          <div class="preview-section">
            <h3 class="section-title">🛠️ Required Skills & Qualifications</h3>
            <div class="skills-container">
        `;
        
        keySkills.forEach(skill => {
          html += `<span class="skill-tag">${skill}</span>`;
        });

        html += `
            </div>
            <ul class="qualifications-list">
              <li>${experienceLevel === "Entry" ? "0-2 years" : experienceLevel === "Mid" ? "3-5 years" : "5+ years"} of relevant experience</li>
              <li>Strong problem-solving abilities and attention to detail</li>
              <li>Excellent communication and teamwork skills</li>
            </ul>
          </div>
        `;
      }

      // Culture & Requirements
      html += `
        <div class="preview-section">
          <h3 class="section-title">🏢 Our Culture</h3>
          <p class="section-content">
            We are a <strong>${companyCulture || "dynamic"}</strong> company that values innovation, 
            collaboration, and continuous learning. We offer:
          </p>
          <ul class="benefits-list">
            <li>Competitive salary and equity package</li>
            <li>Flexible work arrangements</li>
            <li>Health and wellness benefits</li>
            <li>Professional development opportunities</li>
            <li>${companyCulture === "Startup" ? "Fast-paced startup environment with rapid growth potential" : 
                companyCulture === "Remote-first" ? "Fully remote team with global collaboration" : 
                "Structured career progression and stability"}</li>
          </ul>
      `;

      // Special Requirements
      if (specialRequirements) {
        html += `
          <div class="preview-section">
            <h3 class="section-title">📋 Additional Requirements</h3>
            <p class="section-content">${specialRequirements}</p>
          </div>
        `;
      }

      html += `
          <div class="preview-footer">
            <p class="footer-text">
              If you're passionate about making an impact and meet the above qualifications, 
              we'd love to hear from you!
            </p>
            <div class="cta-section">
              <button class="apply-button">Apply Now</button>
            </div>
          </div>
        </div>
      `;

      setPreviewHTML(html);
    };

    generatePreview();
  }, [formData]);

  return (
    <div className="live-preview-container">
      <div className="preview-header-bar">
        <h3 className="preview-title">Live Preview</h3>
        <div className="preview-status">
          <span className="status-dot"></span>
          Real-time
        </div>
      </div>
      
      <div className="preview-card">
        <div 
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: previewHTML }}
        />
      </div>
      
      <div className="preview-tips">
        <div className="tip">
          <span className="tip-icon">💡</span>
          <div>
            <strong>Tip:</strong> This preview updates in real-time as you fill the form.
            Changes are automatically reflected here.
          </div>
        </div>
      </div>
    </div>
  );
}