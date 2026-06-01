export async function onRequest(context) {
  console.log("Function executed");

  const country =
    context.request.headers.get("CF-IPCountry") || "Unknown";

  const ip =
    context.request.headers.get("CF-Connecting-IP") || "Unknown";

  const page = new URL(context.request.url).pathname;

  try {
    const response = await fetch(
      "YOUR_DISCORD_WEBHOOK",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content:
            `🌐 New Visit\n` +
            `IP: ${ip}\n` +
            `Country: ${country}\n` +
            `Page: ${page}\n` +
            `Time: ${new Date().toISOString()}`
        })
      }
    );

    console.log("Discord status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Discord error:", errorText);
    }
  } catch (err) {
    console.error("Webhook error:", err);
  }

  return context.next();
}
