/**
 * 3D GRIT — Edge Analytics Catcher
 * Cloudflare Worker to receive and route analytics and waitlist intents.
 * Deploy via: npx wrangler deploy worker.js
 */
export default {
  async fetch(request, env, ctx) {
    // 1. Handle CORS Preflight (Required for frontend fetch API)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*", // Restrict to yourdomain.com in production
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // 2. Only accept POST requests
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      // 3. Parse the incoming payload
      const data = await request.json();

      // 4. Log or Store the Data
      // In production, push this data to Cloudflare D1, Supabase,
      // or a Google Sheet via a webhook here.
      console.log("Intent Captured:", data.event, data.tool);

      // 5. Return a fast success response to the client
      return new Response(JSON.stringify({ status: "success" }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        status: 200,
      });
    } catch (error) {
      return new Response("Bad Request", { status: 400 });
    }
  },
};
