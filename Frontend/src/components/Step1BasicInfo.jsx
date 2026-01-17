// Step1BasicInfo.jsx - Updated Colors
export default function Step1BasicInfo({ formData, setFormData }) {
  const industries = [
    "FinTech",
    "HealthTech",
    "EdTech",
    "E-commerce",
    "SaaS",
    "AI / Machine Learning",
    "Cybersecurity",
    "Blockchain / Web3",
    "Gaming",
    "Media & Entertainment",
    "Logistics",
    "Travel & Hospitality",
    "Retail",
    "Manufacturing",
    "Telecom",
    "IoT",
    "Cloud Computing",
    "DevOps",
    "AgriTech",
    "GovTech"
  ];

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

  const labelStyle = {
    fontWeight: "600",
    color: "#334155",
    marginBottom: "8px",
    display: "block",
    fontSize: "15px"
  };

  return (
    <div style={{ maxWidth: 900 }}>
      <h2 style={{ 
        fontSize: "24px", 
        fontWeight: "700", 
        color: "#0f172a",
        marginBottom: "30px" 
      }}>
        Basic Job Information
      </h2>

      {/* Job Title */}
      <div style={{ marginBottom: "24px" }}>
        <label style={labelStyle}>
          Job Title <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Backend Developer, Frontend Engineer, Product Manager"
          value={formData.jobTitle}
          onChange={e =>
            setFormData({ ...formData, jobTitle: e.target.value })
          }
          required
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Industry */}
      <div style={{ marginBottom: "24px" }}>
        <label style={labelStyle}>
          Industry <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <select
          value={formData.industry}
          onChange={e =>
            setFormData({ ...formData, industry: e.target.value })
          }
          required
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.boxShadow = "none";
          }}
        >
          <option value="">Select Industry</option>
          {industries.map(ind => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* Experience Level */}
      <div style={{ marginBottom: "24px" }}>
        <label style={labelStyle}>
          Experience Level <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <select
          value={formData.experienceLevel}
          onChange={e =>
            setFormData({
              ...formData,
              experienceLevel: e.target.value
            })
          }
          required
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.boxShadow = "none";
          }}
        >
          <option value="">Select Experience Level</option>
          <option value="Entry">Entry (0–2 years)</option>
          <option value="Mid">Mid (3–5 years)</option>
          <option value="Senior">Senior (5+ years)</option>
        </select>
      </div>
    </div>
  );
}