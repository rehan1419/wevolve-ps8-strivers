import express from "express";
import pool from "../db.js";

// Core logic
import { generateTemplate, TOTAL_TEMPLATES } from "../services/templateEngine.js";

import { atsFormat } from "../services/atsOptimizer.js";


// PDF generation
import { generatePDF } from "../services/pdfGenerator.js";

const router = express.Router();

/**
 * Generate Job Description
 * - Uses skill mapper via templateEngine
 * - Optionally enhances with OpenAI
 * - Saves final JD to MySQL
 */
router.post("/generate", async (req, res) => {
  try {
    const { templateIndex = 0 } = req.body;

    const template = generateTemplate(req.body, templateIndex);
    const description = atsFormat(template);

    res.json({
      jobDescription: description,
      nextTemplateIndex: (templateIndex + 1) % TOTAL_TEMPLATES
    });
  } catch (err) {
    res.status(500).json({ error: "Generation failed" });
  }
});

/**
 * Save Job Description to MySQL
 */
router.post("/save", async (req, res) => {
  try {
    const { jobTitle, industry, experienceLevel, keySkills, companyCulture, description } = req.body;

    // 3️⃣ Save final JD to MySQL
    await pool.execute(
      `INSERT INTO job_descriptions
       (job_title, industry, experience_level, skills, culture, content)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        jobTitle,
        industry,
        experienceLevel,
        JSON.stringify(keySkills),
        companyCulture,
        description
      ]
    );

    // 4️⃣ Send response
    res.json({ jobDescription: description });

  } catch (error) {
    console.error("JD generation error:", error);
    res.status(500).json({
      error: "Failed to generate job description"
    });
  }
});

/**
 * Download Job Description as PDF
 */
router.post("/download-pdf", (req, res) => {
  try {
    const { content } = req.body;
    generatePDF(content, res);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({
      error: "Failed to generate PDF"
    });
  }
});

/**
 * Get all saved Job Descriptions (optional utility)
 */
router.get("/all", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM job_descriptions ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch job descriptions"
    });
  }
});

// Save Draft
router.post("/save-draft", async (req, res) => {
  try {
    const {
      jobTitle,
      industry,
      experienceLevel,
      keySkills,
      companyCulture,
      content
    } = req.body;

    await pool.execute(
      `INSERT INTO job_descriptions
       (job_title, industry, experience_level, skills, culture, content)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        jobTitle,
        industry,
        experienceLevel,
        JSON.stringify(keySkills),
        companyCulture,
        content
      ]
    );

    res.json({ message: "Draft saved" });
  } catch (err) {
    res.status(500).json({ error: "Save draft failed" });
  }
});


// Fetch All Drafts
router.get("/drafts", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM job_descriptions ORDER BY created_at DESC"
  );
  res.json(rows);
});


// Fetch Single Draft
router.get("/drafts/:id", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM job_descriptions WHERE id = ?",
    [req.params.id]
  );
  res.json(rows[0]);
});

// Delete a draft
router.delete("/drafts/:id", async (req, res) => {
  try {
    await pool.execute(
      "DELETE FROM job_descriptions WHERE id = ?",
      [req.params.id]
    );
    res.json({ message: "Draft deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});








export default router;
