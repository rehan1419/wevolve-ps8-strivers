// DraftList.jsx 
import { useEffect, useState, useRef } from "react"; // Added useRef
import { fetchDrafts, deleteDraft } from "../api/jobApi";
import "./DraftList.css";

export default function DraftList({ onLoadDraft }) {
  const [drafts, setDrafts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // Add ref for dropdown container
  const dropdownRef = useRef(null);
  const sortButtonRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showSortDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target)
      ) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);

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

  // Sort drafts based on selected criteria
  const sortDrafts = (draftsList) => {
    const sorted = [...draftsList];
    
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case "title":
        return sorted.sort((a, b) => 
          (a.job_title || "").localeCompare(b.job_title || "")
        );
      default:
        return sorted;
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

  // Apply sorting to filtered drafts
  const sortedAndFilteredDrafts = sortDrafts(filteredDrafts);

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

      {/* Search and Action Buttons */}
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
        
        {/* Action Buttons - Sort and Refresh side by side */}
        <div className="action-buttons">
          {/* Sort by button */}
          <div className="sort-container" ref={dropdownRef}>
            <button
              ref={sortButtonRef}
              className="action-button sort-button"
              onClick={(e) => {
                e.stopPropagation();
                setShowSortDropdown(!showSortDropdown);
              }}
            >
              Sort by
            </button>
            
            {showSortDropdown && (
              <div 
                className="sort-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className={`sort-option ${sortBy === "newest" ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortBy("newest");
                    setShowSortDropdown(false);
                  }}
                >
                  Newest first
                </button>
                <button 
                  className={`sort-option ${sortBy === "oldest" ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortBy("oldest");
                    setShowSortDropdown(false);
                  }}
                >
                  Oldest first
                </button>
                <button 
                  className={`sort-option ${sortBy === "title" ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortBy("title");
                    setShowSortDropdown(false);
                  }}
                >
                  Title A-Z
                </button>
              </div>
            )}
          </div>
          
          {/* Refresh button */}
          <button
            className="action-button refresh-button"
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
      </div>

      {/* Drafts List */}
      {sortedAndFilteredDrafts.length === 0 ? (
        <div className="empty-state">
          <p>{search ? "No drafts found matching your search." : "No drafts saved yet."}</p>
        </div>
      ) : (
        <div className="drafts-grid">
          {sortedAndFilteredDrafts.map((draft) => (
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