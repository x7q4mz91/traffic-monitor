export async function onRequest(context) {
  console.log("Function executed");

  const country =
    context.request.headers.get("CF-IPCountry") || "Unknown";

  const page = new URL(context.request.url).pathname;

  try {
    const response = await fetch(
      "https://discord.com/api/webhooks/1510778113330774130/cVVE9UFnHwJJ9GSB-F_vdLYmz6r2s5s8vCJhz-2BMMwQhidefOXh4mP8CQk3lx7yCWOU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content:
            `🌐 New Visit\n` +
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
