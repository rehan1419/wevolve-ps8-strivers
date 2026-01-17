// Home.jsx - With Rounded Edges Design
import './Home.css';

export default function Home({ onStart }) {
  const features = [
    {
      icon: '🎯',
      title: 'ATS Optimized',
      description: 'Create job descriptions that pass through Applicant Tracking Systems with proper formatting and keywords.'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Generation',
      description: 'Generate professional descriptions in seconds using advanced AI, then customize to your needs.'
    },
    {
      icon: '📄',
      title: 'Multiple Formats',
      description: 'Download as PDF, DOCX, or copy to clipboard. Includes clean formatting and branding options.'
    },
    {
      icon: '💾',
      title: 'Save & Organize',
      description: 'Save unlimited drafts, organize by department, and access them anytime from anywhere.'
    },
    {
      icon: '🔄',
      title: 'Quick Regeneration',
      description: 'Generate multiple variations with different tones and styles in just one click.'
    },
    {
      icon: '⚡',
      title: 'Time Efficient',
      description: 'Create job descriptions 10x faster than manual writing. Save hours of tedious work.'
    }
  ];

  const stats = [
    { number: '15K+', label: 'Job Descriptions' },
    { number: '96%', label: 'ATS Success' },
    { number: '85%', label: 'Time Saved' },
    { number: '4.9★', label: 'User Rating' }
  ];

  return (
    <div className="home-page">
      {/* Decorative Background Elements */}
      <div className="decorative-element dec-1"></div>
      <div className="decorative-element dec-2"></div>
      
      <div className="home-container">
        {/* Hero Section */}
        <div className="hero-section">
          
          
          <h1 className="hero-title">
            Create Perfect Job Descriptions
            <span>in Minutes, Not Hours</span>
          </h1>
          
          <p className="hero-description">
            Generate professional, ATS-friendly job descriptions with our AI assistant. 
            Customize, edit, and export ready-to-use descriptions that attract the right candidates.
          </p>
          
          <button className="cta-button" onClick={onStart}>
            <span>🚀</span>
            Start Creating Free
          </button>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2 className="section-title">Why Choose Our Generator</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
}