import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { endpoint } = req.query;

  if (endpoint === "analyze") {
    const { resumeText, jobTitle } = req.body;
    if (!resumeText || !jobTitle)
      return res.status(400).json({ error: "resumeText and jobTitle required" });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    try {
      const stream = await client.messages.stream({
        model: "claude-opus-4-6",
        max_tokens: 1500,
        messages: [{
          role: "user",
          content: `You are SkillForge AI — an expert career coach.
Analyze this resume for a "${jobTitle}" role and return ONLY valid JSON:
{
  "matchPercent": <0-100>,
  "summary": "<2 sentence honest assessment>",
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "gaps": [
    {
      "skill": "<skill name>",
      "priority": "high|medium|low",
      "reason": "<why this matters>",
      "courses": ["<course1>", "<course2>"],
      "timeMonths": <number>
    }
  ],
  "nextStep": "<single most important action this week>"
}
Resume:
${resumeText.slice(0, 4000)}`
        }]
      });

      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
          res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
        }
      }
      res.write("data: [DONE]\n\n");
      return res.end();
    } catch (err) {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.write("data: [DONE]\n\n");
      return res.end();
    }
  }

  if (endpoint === "chat") {
    const { messages, resumeContext, jobTitle } = req.body;
    if (!messages?.length)
      return res.status(400).json({ error: "messages required" });

    try {
      const response = await client.messages.create({
        model: "claude-opus-4-6",
        max_tokens: 800,
        system: `You are SkillForge AI — a helpful career coach.
${resumeContext ? `User resume summary: ${resumeContext}` : "No resume yet."}
${jobTitle ? `Target role: ${jobTitle}` : ""}
Be concise, actionable, honest. Max 3 sentences per point.`,
        messages,
      });
      return res.json({ reply: response.content[0].text });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(404).json({ error: "Unknown endpoint" });
}
