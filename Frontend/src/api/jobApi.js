export async function generateJD(data) {
  const res = await fetch("http://localhost:5000/api/job/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}


export async function downloadPDF(content) {
  const res = await fetch("http://localhost:5000/api/job/download-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "job-description.pdf";
  a.click();

  window.URL.revokeObjectURL(url);
}

export async function saveDraft(data) {
  const res = await fetch("http://localhost:5000/api/job/save-draft", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchDrafts() {
  const res = await fetch("http://localhost:5000/api/job/drafts");
  return res.json();
}

export async function fetchDraftById(id) {
  const res = await fetch(
    `http://localhost:5000/api/job/drafts/${id}`
  );
  return res.json();
}

export async function deleteDraft(id) {
  const res = await fetch(
    `http://localhost:5000/api/job/drafts/${id}`,
    { method: "DELETE" }
  );
  return res.json();
}
