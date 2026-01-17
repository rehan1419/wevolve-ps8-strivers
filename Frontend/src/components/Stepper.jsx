export default function Stepper({ step, onStepClick }) {
  const steps = ["Basic Info", "Skills", "Culture", "Preview"];

  return (
    <div className="stepper">
      {steps.map((label, index) => (
        <div
          key={label}
          className={`step-tab
            ${step === index ? "active" : ""}
            ${step > index ? "completed" : ""}
          `}
          onClick={() => onStepClick && onStepClick(index)}
        >
          <span className="step-number">{index + 1}</span>
          {label}
        </div>
      ))}
    </div>
  );
}
