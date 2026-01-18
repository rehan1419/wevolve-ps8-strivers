// App.jsx 
import { useState, useEffect } from "react";
import { generateJD } from "./api/jobApi";
import Home from "./pages/Home";
import Stepper from "./components/Stepper";
import Step1BasicInfo from "./components/Step1BasicInfo";
import Step2Skills from "./components/Step2Skills";
import Step3Culture from "./components/Step3Culture";
import Preview from "./components/Preview";
import DraftList from "./components/DraftList";
import LivePreview from "./components/LivePreview";

export default function App() {
  const [step, setStep] = useState(0);
  const [jd, setJd] = useState("");
  const [templateIndex, setTemplateIndex] = useState(0);
  const [showHome, setShowHome] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const [formData, setFormData] = useState({
    jobTitle: "",
    industry: "",
    experienceLevel: "",
    keySkills: [],
    companyCulture: "",
    specialRequirements: ""
  });

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedFormData = localStorage.getItem("jdFormData");
    const savedStep = localStorage.getItem("jdCurrentStep");
    
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    if (savedStep) {
      setStep(parseInt(savedStep));
    }
  }, []);

  // Save form data to localStorage on change
  useEffect(() => {
    localStorage.setItem("jdFormData", JSON.stringify(formData));
    localStorage.setItem("jdCurrentStep", step.toString());
  }, [formData, step]);

  const buttonStyle = {
    height: "44px",
    padding: "0 24px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#fff",
    cursor: "pointer",
    marginRight: "10px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px"
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: "#2563eb",
    color: "#fff",
    border: "1px solid #2563eb",
  };

  const generate = async () => {
    setLoading(true);
    try {
      const res = await generateJD({
        ...formData,
        templateIndex
      });
      setJd(res.jobDescription);
      setTemplateIndex(res.nextTemplateIndex);
      
      // Show success toast
      setSaveStatus("Job description generated successfully!");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus("Error generating job description. Please try again.");
      setTimeout(() => setSaveStatus(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const canGoNext = () => {
    switch (step) {
      case 0:
        if (!formData.jobTitle.trim() || !formData.industry || !formData.experienceLevel) {
          alert("Please fill all required fields in Basic Info");
          return false;
        }
        break;
      case 1:
        if (formData.keySkills.length < 3) {
          alert("Please select at least 3 skills");
          return false;
        }
        break;
      case 2:
        if (!formData.companyCulture) {
          alert("Please select Company Culture");
          return false;
        }
        break;
    }
    return true;
  };

  const loadDraft = draft => {
    setFormData({
      jobTitle: draft.job_title,
      industry: draft.industry,
      experienceLevel: draft.experience_level,
      keySkills: JSON.parse(draft.skills),
      companyCulture: draft.culture,
      specialRequirements: draft.special_requirements || ""
    });
    setJd(draft.content);
    setStep(3);
  };

  const resetForm = () => {
    setFormData({
      jobTitle: "",
      industry: "",
      experienceLevel: "",
      keySkills: [],
      companyCulture: "",
      specialRequirements: ""
    });
    setJd("");
    setStep(0);
    setTemplateIndex(0);
  };

  return (
    <div className="container" style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px" }}>
      {showHome ? (
        <Home onStart={() => setShowHome(false)} />
      ) : (
        <>
          {/* Header */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "30px" 
          }}>
            <div>
              <h1 style={{ margin: "0 0 8px 0", fontSize: "28px" }}>AI Job Description Generator</h1>
              <p style={{ color: "#666", margin: "0" }}>Create compelling job descriptions in minutes</p>
            </div>
            <button
              onClick={() => setShowHome(true)}
              style={{
                ...buttonStyle,
                background: "transparent",
                border: "1px solid #ccc",
              }}
            >
              ← Back to Home
            </button>
          </div>

          {/* Stepper */}
          <Stepper step={step} onStepClick={(index) => {
            if (index < step) setStep(index);
          }} />

          {/* Status Message */}
          {saveStatus && (
            <div style={{
              padding: "12px 16px",
              background: saveStatus.includes("Error") ? "#fef2f2" : "#f0f9ff",
              border: `1px solid ${saveStatus.includes("Error") ? "#fecaca" : "#bae6fd"}`,
              borderRadius: "8px",
              margin: "20px 0",
              color: saveStatus.includes("Error") ? "#dc2626" : "#0369a1",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              {saveStatus.includes("Error") ? "⚠️" : "✓"} {saveStatus}
            </div>
          )}

          {/* Main Content Area with Two Columns */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: step < 3 ? "1fr 400px" : "1fr",
            gap: "32px",
            marginTop: "20px",
            alignItems: "flex-start"
          }}>
            {/* Form Column */}
            <div style={{ 
              background: "#fff", 
              border: "1px solid #e5e7eb", 
              borderRadius: "12px", 
              padding: "30px"
            }}>
              {step === 0 && (
                <Step1BasicInfo
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {step === 1 && (
                <Step2Skills
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {step === 2 && (
                <Step3Culture
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {step === 3 && (
                <Preview
                  jd={jd}
                  onGenerate={generate}
                  formData={formData}
                  loading={loading}
                />
              )}

              {/* Navigation Buttons */}
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                marginTop: "40px",
                paddingTop: "20px",
                borderTop: "1px solid #e5e7eb"
              }}>
                <div>
                  {step > 0 && (
                    <button
                      style={buttonStyle}
                      onClick={() => setStep(step - 1)}
                    >
                      ← Back
                    </button>
                  )}
                  <button
                    onClick={resetForm}
                    style={{
                      ...buttonStyle,
                      background: "transparent",
                      color: "#666",
                    }}
                  >
                    ↺ Reset
                  </button>
                </div>

                <div>
                  {step < 3 ? (
                    <button
                      style={primaryButtonStyle}
                      onClick={() => {
                        if (canGoNext()) setStep(step + 1);
                      }}
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      style={primaryButtonStyle}
                      onClick={generate}
                      disabled={loading}
                    >
                      {loading ? "⏳ Generating..." : "✨ Generate"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Live Preview Column - Only show for steps 0-2 */}
            {step < 3 && (
              <div style={{
                position: "sticky",
                top: "20px",
                height: "fit-content"
              }}>
                <LivePreview formData={formData} />
              </div>
            )}
          </div>

          {/* Drafts Section */}
          <DraftList onLoadDraft={loadDraft} />
        </>
      )}
    </div>
  );
}