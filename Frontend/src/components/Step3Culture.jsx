// Step3Culture.jsx
export default function Step3Culture({ formData, setFormData }) {
  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: `
      0 10px 30px rgba(0, 0, 0, 0.05),
      0 1px 3px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(255, 255, 255, 0.9),
      0 0 30px rgba(99, 102, 241, 0.05),
      0 15px 35px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.8)
    `,
    border: "1px solid rgba(255, 255, 255, 0.6)",
    position: "relative",
    transform: "translateY(0)",
    transition: "all 0.3s ease",
    zIndex: "1"
  };

  const inputStyle = {
    height: "52px",
    padding: "12px 20px",
    fontSize: "15px",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    boxSizing: "border-box",
    width: "100%",
    backgroundColor: "#ffffff",
    transition: "all 0.3s ease",
    color: "#1e293b",
    boxShadow: `
      0 2px 4px rgba(0, 0, 0, 0.02),
      0 1px 2px rgba(0, 0, 0, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.8)
    `
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#334155",
    marginBottom: "12px",
    display: "block",
    fontSize: "15px",
    textShadow: "0 1px 1px rgba(0, 0, 0, 0.05)"
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ 
        fontSize: "28px", 
        fontWeight: "700", 
        color: "#0f172a",
        marginBottom: "30px",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        position: "relative",
        paddingBottom: "16px"
      }}>
        Company & Culture
        <div style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "60px",
          height: "4px",
          background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
          borderRadius: "2px",
          boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)"
        }}></div>
      </h2>

      {/* Company Culture */}
      <div style={{ marginBottom: "32px" }}>
        <label style={labelStyle}>
          Company Culture <span style={{ color: "#ef4444", textShadow: "none" }}>*</span>
        </label>
        <select
          value={formData.companyCulture}
          onChange={e =>
            setFormData({
              ...formData,
              companyCulture: e.target.value
            })
          }
          required
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.boxShadow = `
              0 0 0 3px rgba(99, 102, 241, 0.1),
              0 4px 12px rgba(99, 102, 241, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.8)
            `;
            e.target.style.transform = "translateY(-1px)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.boxShadow = `
              0 2px 4px rgba(0, 0, 0, 0.02),
              0 1px 2px rgba(0, 0, 0, 0.03),
              inset 0 1px 0 rgba(255, 255, 255, 0.8)
            `;
            e.target.style.transform = "translateY(0)";
          }}
        >
          <option value="">Select Company Culture</option>
          <option value="Startup">Startup</option>
          <option value="Corporate">Corporate</option>
          <option value="Remote-first">Remote-first</option>
        </select>
      </div>

      {/* Special Requirements */}
      <div>
        <label style={labelStyle}>
          Special Requirements (Optional)
        </label>
        <textarea
          rows={6}
          value={formData.specialRequirements}
          onChange={e =>
            setFormData({
              ...formData,
              specialRequirements: e.target.value
            })
          }
          style={{
            ...inputStyle,
            height: "auto",
            minHeight: "140px",
            resize: "vertical",
            padding: "16px 20px",
            lineHeight: "1.6"
          }}
          placeholder="Add any special requirements, work arrangements, or additional information..."
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.boxShadow = `
              0 0 0 3px rgba(99, 102, 241, 0.1),
              0 4px 12px rgba(99, 102, 241, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.8)
            `;
            e.target.style.transform = "translateY(-1px)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.boxShadow = `
              0 2px 4px rgba(0, 0, 0, 0.02),
              0 1px 2px rgba(0, 0, 0, 0.03),
              inset 0 1px 0 rgba(255, 255, 255, 0.8)
            `;
            e.target.style.transform = "translateY(0)";
          }}
        />
      </div>
    </div>
  );
}