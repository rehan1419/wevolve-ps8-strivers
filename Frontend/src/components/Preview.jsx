// Preview.jsx
import { useState, useEffect } from "react";
import { saveDraft, downloadPDF } from "../api/jobApi";

export default function Preview({ jd, onGenerate, formData, loading }) {
  const [editableJD, setEditableJD] = useState(jd);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    if (!jd && !hasGenerated) {
      onGenerate();
      setHasGenerated(true);
    }
  }, [jd, hasGenerated, onGenerate]);

  useEffect(() => {
    setEditableJD(jd);
  }, [jd]);

  const buttonStyle = {
    height: "48px",
    padding: "0 24px",
    fontSize: "15px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    background: "#ffffff",
    cursor: "pointer",
    marginRight: "12px",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.2s ease",
    color: "#475569"
  };

  const handleSaveDraft = async () => {
    setSaveLoading(true);
    try {
      await saveDraft({ ...formData, content: editableJD });
      setCopyStatus("Draft saved successfully!");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch (error) {
      setCopyStatus("Error saving draft");
      setTimeout(() => setCopyStatus(""), 2000);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableJD);
    setCopyStatus("Copied to clipboard!");
    setTimeout(() => setCopyStatus(""), 2000);
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "24px" 
      }}>
        <h2 style={{ 
          fontSize: "24px", 
          fontWeight: "700", 
          color: "#0f172a",
          margin: "0" 
        }}>
          Job Description Preview
        </h2>
        {copyStatus && (
          <span style={{ 
            fontSize: "14px", 
            color: copyStatus.includes("Error") ? "#dc2626" : "#059669",
            background: copyStatus.includes("Error") ? "#fee2e2" : "#d1fae5",
            padding: "8px 16px",
            borderRadius: "8px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            {copyStatus.includes("Error") ? "⚠️" : "✓"} {copyStatus}
          </span>
        )}
      </div>

      <textarea
        rows={22}
        value={editableJD}
        onChange={e => setEditableJD(e.target.value)}
        placeholder={loading ? "Generating job description..." : "Your job description will appear here..."}
        style={{
          width: "100%",
          padding: "24px",
          fontSize: "15px",
          lineHeight: "1.8",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: "#1e293b",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          boxSizing: "border-box",
          resize: "vertical",
          marginBottom: "24px",
          background: "#ffffff",
          transition: "all 0.2s"
        }}
        disabled={loading}
        onFocus={(e) => {
          e.target.style.borderColor = "#6366f1";
          e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e2e8f0";
          e.target.style.boxShadow = "none";
        }}
      />

      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "12px",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <button
            style={{
              ...buttonStyle,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#ffffff",
              border: "none",
              boxShadow: "0 4px 16px rgba(99, 102, 241, 0.3)"
            }}
            onClick={() => {
              setHasGenerated(true);
              onGenerate();
            }}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(99, 102, 241, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 16px rgba(99, 102, 241, 0.3)";
            }}
          >
            {loading ? "⏳" : "✨"} {loading ? "Generating..." : "Regenerate"}
          </button>

          <button
            style={buttonStyle}
            onClick={handleSaveDraft}
            disabled={saveLoading}
            onMouseEnter={(e) => {
              if (!saveLoading) {
                e.target.style.background = "#f1f5f9";
                e.target.style.borderColor = "#cbd5e1";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#ffffff";
              e.target.style.borderColor = "#e2e8f0";
            }}
          >
            {saveLoading ? "⏳" : "💾"} {saveLoading ? "Saving..." : "Save Draft"}
          </button>

          <button
            style={buttonStyle}
            onClick={handleCopy}
            onMouseEnter={(e) => {
              e.target.style.background = "#f1f5f9";
              e.target.style.borderColor = "#cbd5e1";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#ffffff";
              e.target.style.borderColor = "#e2e8f0";
            }}
          >
            📋 Copy
          </button>

          <button
            style={buttonStyle}
            onClick={() => downloadPDF(editableJD)}
            onMouseEnter={(e) => {
              e.target.style.background = "#f1f5f9";
              e.target.style.borderColor = "#cbd5e1";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#ffffff";
              e.target.style.borderColor = "#e2e8f0";
            }}
          >
            📄 Download PDF
          </button>
        </div>

        <div style={{ 
          fontSize: "14px", 
          color: "#64748b",
          fontWeight: "500",
          background: "#f8fafc",
          padding: "8px 16px",
          borderRadius: "8px"
        }}>
          Character count: {editableJD?.length || 0}
        </div>
      </div>
    </div>
  );
}