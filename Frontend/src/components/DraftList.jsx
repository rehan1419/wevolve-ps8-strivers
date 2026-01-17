// DraftList.jsx 
import { useEffect, useState } from "react";
import { fetchDrafts, deleteDraft } from "../api/jobApi";
import "./DraftList.css";

export default function DraftList({ onLoadDraft }) {
  const [drafts, setDrafts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadDrafts = async () => {
    setLoading(true);
    try {
      const data = await fetchDrafts();
      setDrafts(data);
    } catch (error) {
      console.error("Error loading drafts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrafts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this draft?")) return;
    
    try {
      await deleteDraft(id);
      loadDrafts();
    } catch (error) {
      console.error("Error deleting draft:", error);
      alert("Failed to delete draft. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loadDrafts();
    }
  };

  const filteredDrafts = drafts.filter(draft => {
    const searchTerm = search.toLowerCase();
    return (
      draft.job_title?.toLowerCase().includes(searchTerm) ||
      draft.industry?.toLowerCase().includes(searchTerm) ||
      draft.experience_level?.toLowerCase().includes(searchTerm) ||
      draft.culture?.toLowerCase().includes(searchTerm)
    );
  });

  // Format date as shown in image: "17 Jan 2026, 07:58 pm"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  return (
    <div className="draft-list-container">
      {/* Header */}
      <div className="drafts-header">
        <h2>Saved Drafts</h2>
      </div>

      {/* Search and Refresh */}
      <div className="search-wrapper">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search drafts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {search && (
            <button 
              className="clear-search"
              onClick={() => setSearch("")}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        
        <button
          className="refresh-button"
          onClick={loadDrafts}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner">⟳</span>
              Refreshing...
            </>
          ) : (
            <>
              <span>⟳</span>
              Refresh
            </>
          )}
        </button>
      </div>

      {/* Drafts List */}
      {filteredDrafts.length === 0 ? (
        <div className="empty-state">
          <p>{search ? "No drafts found matching your search." : "No drafts saved yet."}</p>
        </div>
      ) : (
        <div className="drafts-grid">
          {filteredDrafts.map((draft) => (
            <div key={draft.id} className="draft-card">
              <h3 className="draft-title">
                {draft.job_title || "Untitled Draft"}
              </h3>
              
              <div className="draft-meta">
                <span>{draft.industry || "Not specified"}</span>
                <span>{draft.experience_level || "Not specified"}</span>
                <span>{draft.culture || "Not specified"}</span>
              </div>
              
              <div className="draft-date">
                Saved on {formatDate(draft.created_at)}
              </div>
              
              <div className="draft-actions">
                <button
                  className="action-button open-button"
                  onClick={() => onLoadDraft(draft)}
                >
                  Open
                </button>
                
                <button
                  className="action-button delete-button"
                  onClick={() => handleDelete(draft.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}