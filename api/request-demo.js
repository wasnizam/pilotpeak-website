export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const { name, email, company, fleet, message } = req.body || {};

    if (!name || !email || !company || !fleet) {
      return res.status(400).json({
        ok: false,
        message: "Missing required fields",
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.DEMO_FROM_EMAIL;
    const toEmail = process.env.DEMO_TO_EMAIL || "nizam.sabian@gmail.com";

    if (!resendApiKey || !fromEmail) {
      return res.status(500).json({
        ok: false,
        message: "Server email settings are not configured",
      });
    }

    const subject = `Enterprise demo request - ${company}`;
    const text = [
      "New enterprise demo request",
      "",
      `Name: ${name}`,
      `Work email: ${email}`,
      `Company: ${company}`,
      `Fleet size: ${fleet}`,
      "",
      "Evaluation goals:",
      message || "-",
    ].join("\n");

    const html = `
      <h2>New enterprise demo request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Work email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Fleet size:</strong> ${escapeHtml(fleet)}</p>
      <p><strong>Evaluation goals:</strong><br>${escapeHtml(message || "-").replace(/\n/g, "<br>")}</p>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(502).json({
        ok: false,
        message: `Email provider error: ${errText}`,
      });
    }

    return res.status(200).json({ ok: true, message: "Request submitted" });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Unexpected server error",
      error: String(error),
    });
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
