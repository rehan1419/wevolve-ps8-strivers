// Step2Skills.jsx 
import { useState, useEffect } from "react";

export default function Step2Skills({ formData, setFormData }) {
  const [search, setSearch] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);

  const skillsByCategory = {
    'Programming Languages': [
      'JavaScript', 'TypeScript', 'Python', 'Java', 
      'C#', 'C++', 'Go', 'Rust'
    ],
    'Frontend Development': [
      'React', 'Vue.js', 'Next.js', 'Angular',
      'HTML', 'CSS', 'Tailwind CSS'
    ],
    'Backend Development': [
      'Node.js', 'Express.js', 'Flask', 'Django',
      'FastAPI', 'Spring Boot'
    ],
    'Databases': [
      'PostgreSQL', 'MySQL', 'MongoDB',
      'SQLite', 'Redis'
    ],
    'Cloud & DevOps': [
      'AWS', 'GCP', 'Azure', 'Docker',
      'Kubernetes', 'CI/CD'
    ],
    'AI/ML & Data': [
      'Machine Learning', 'Deep Learning',
      'TensorFlow', 'Data Analysis', 'PyTorch'
    ],
    'Mobile Development': [
      'Android', 'iOS', 'Flutter', 'React Native'
    ],
    'Architecture & Tools': [
      'REST APIs', 'GraphQL', 'Microservices',
      'System Design', 'Git', 'Agile/Scrum'
    ]
  };

  useEffect(() => {
    if (!search.trim()) {
      setFilteredSkills(Object.entries(skillsByCategory));
    } else {
      const filtered = Object.entries(skillsByCategory).map(([category, skills]) => {
        const filteredSkills = skills.filter(skill =>
          skill.toLowerCase().includes(search.toLowerCase())
        );
        return [category, filteredSkills];
      }).filter(([_, skills]) => skills.length > 0);
      setFilteredSkills(filtered);
    }
  }, [search]);

  const toggleSkill = skill => {
    const updatedSkills = formData.keySkills.includes(skill)
      ? formData.keySkills.filter(s => s !== skill)
      : [...formData.keySkills, skill];

    setFormData({ ...formData, keySkills: updatedSkills });
  };

  const removeSkill = skill => {
    const updatedSkills = formData.keySkills.filter(s => s !== skill);
    setFormData({ ...formData, keySkills: updatedSkills });
  };

  const inputStyle = {
    height: "48px",
    padding: "12px 16px",
    fontSize: "15px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    boxSizing: "border-box",
    width: "100%",
    backgroundColor: "#ffffff",
    transition: "all 0.2s ease",
    color: "#1e293b"
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <h2 style={{ 
        fontSize: "24px", 
        fontWeight: "700", 
        color: "#0f172a",
        marginBottom: "10px" 
      }}>
        Key Skills
      </h2>
      <p style={{ 
        color: "#64748b", 
        marginBottom: "24px",
        fontSize: "15px" 
      }}>
        Select at least 3 required skills for this position
      </p>

      {/* Search Bar */}
      <div style={{ position: "relative", marginBottom: "24px" }}>
        <span style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#94a3b8",
          fontSize: "16px"
        }}>
          🔍
        </span>
        <input
          type="text"
          placeholder="Search skills (e.g., 'JavaScript', 'React', 'AWS')..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            ...inputStyle,
            paddingLeft: "44px",
            marginBottom: "0"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.boxShadow = "none";
          }}
        />
        {search && (
          <span
            onClick={() => setSearch("")}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#94a3b8",
              fontSize: "18px"
            }}
          >
            ✕
          </span>
        )}
      </div>

      {/* Selected Skills Preview */}
      <div style={{ marginBottom: "30px" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px" 
        }}>
          <h3 style={{ 
            fontSize: "16px", 
            margin: "0", 
            color: "#334155",
            fontWeight: "600"
          }}>
            Selected Skills
          </h3>
          <span style={{ 
            fontSize: "14px", 
            color: formData.keySkills.length >= 3 ? "#10b981" : "#ef4444",
            fontWeight: "600",
            backgroundColor: formData.keySkills.length >= 3 ? "#d1fae5" : "#fee2e2",
            padding: "4px 12px",
            borderRadius: "20px"
          }}>
            {formData.keySkills.length} selected (minimum: 3)
          </span>
        </div>
        
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "10px",
          minHeight: "56px",
          padding: "16px",
          background: "#f8fafc",
          borderRadius: "12px",
          border: "1px solid #e2e8f0"
        }}>
          {formData.keySkills.length === 0 ? (
            <span style={{ 
              color: "#94a3b8", 
              fontStyle: "italic",
              fontSize: "14px"
            }}>
              No skills selected yet. Search and select skills above.
            </span>
          ) : (
            formData.keySkills.map(skill => (
              <span
                key={skill}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "500",
                  boxShadow: "0 2px 8px rgba(99, 102, 241, 0.2)"
                }}
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "18px",
                    padding: "0",
                    lineHeight: "1",
                    opacity: "0.8",
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "1"}
                  onMouseLeave={(e) => e.target.style.opacity = "0.8"}
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Skills Categories */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
        gap: "24px",
        maxHeight: "500px",
        overflowY: "auto",
        padding: "12px"
      }}>
        {filteredSkills.map(([category, skills]) => (
          <div
            key={category}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "24px",
              background: "#ffffff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              transition: "all 0.2s"
            }}
          >
            <h3 style={{ 
              margin: "0 0 20px 0", 
              fontSize: "18px", 
              color: "#0f172a",
              paddingBottom: "12px",
              borderBottom: "2px solid #f1f5f9",
              fontWeight: "600"
            }}>
              {category}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {skills.map(skill => {
                const isSelected = formData.keySkills.includes(skill);
                return (
                  <label
                    key={skill}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "8px 16px",
                      background: isSelected ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#f1f5f9",
                      color: isSelected ? "white" : "#475569",
                      borderRadius: "8px",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      userSelect: "none",
                      fontWeight: "500",
                      border: isSelected ? "none" : "1px solid #e2e8f0"
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.target.style.background = "#e2e8f0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.target.style.background = "#f1f5f9";
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSkill(skill)}
                      style={{ display: "none" }}
                    />
                    {skill}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}