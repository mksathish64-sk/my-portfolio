
interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

interface ContactPayload {
  first_name?: unknown;
  last_name?: unknown;
  email?: unknown;
  phone_number?: unknown;
  message?: unknown;
  turnstileToken?: unknown;
}

function jsonResponse(body: object, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  try {
    // 1. Check request origin
    const origin = request.headers.get("Origin");
    const requestUrl = new URL(request.url);

    if (!origin || new URL(origin).origin !== requestUrl.origin) {
      return jsonResponse({ error: "Invalid request origin" }, 403);
    }

    // 2. Check configuration
    if (
      !env.SUPABASE_URL ||
      !env.SUPABASE_SERVICE_ROLE_KEY ||
      !env.TURNSTILE_SECRET_KEY
    ) {
      return jsonResponse({ error: "Server configuration error" }, 500);
    }

    // 3. Accept JSON only and limit payload size
    if (!request.headers.get("Content-Type")?.includes("application/json")) {
      return jsonResponse({ error: "JSON required" }, 415);
    }

    const rawBody = await request.text();

    if (rawBody.length > 16000) {
      return jsonResponse({ error: "Request too large" }, 413);
    }

    const data = JSON.parse(rawBody) as ContactPayload;

    const firstName =
      typeof data.first_name === "string" ? data.first_name.trim() : "";
    const lastName =
      typeof data.last_name === "string" ? data.last_name.trim() : "";
    const email =
      typeof data.email === "string" ? data.email.trim() : "";
    const phoneNumber =
      typeof data.phone_number === "string"
        ? data.phone_number.trim()
        : "";
    const message =
      typeof data.message === "string" ? data.message.trim() : "";
    const token =
      typeof data.turnstileToken === "string"
        ? data.turnstileToken
        : "";

    // 4. Validate form fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !message ||
      firstName.length > 100 ||
      lastName.length > 100 ||
      email.length > 254 ||
      phoneNumber.length > 40 ||
      message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return jsonResponse({ error: "Invalid form data" }, 400);
    }

    if (!token || token.length > 2048) {
      return jsonResponse({ error: "Bot verification required" }, 400);
    }

    // 5. Verify Turnstile token with Cloudflare
    const verifyBody = new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
    });

    const clientIp = request.headers.get("CF-Connecting-IP");
    if (clientIp) {
      verifyBody.set("remoteip", clientIp);
    }

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: verifyBody,
      }
    );

    if (!verifyResponse.ok) {
      return jsonResponse({ error: "Verification service unavailable" }, 502);
    }

    const verification = (await verifyResponse.json()) as {
      success: boolean;
      hostname?: string;
    };

    if (
      !verification.success ||
      verification.hostname !== requestUrl.hostname
    ) {
      return jsonResponse({ error: "Bot verification failed" }, 403);
    }

    // 6. Insert into Supabase using the server-side key
    const supabaseUrl = env.SUPABASE_URL.replace(/\/+$/, "");
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

    const supabaseHeaders: Record<string, string> = {
      apikey: supabaseKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    };

    // Legacy service_role JWT keys need Authorization too.
    // New sb_secret_ keys are sent through the apikey header.
    if (supabaseKey.startsWith("eyJ")) {
      supabaseHeaders.Authorization = `Bearer ${supabaseKey}`;
    }

    const insertResponse = await fetch(
      `${supabaseUrl}/rest/v1/contact_messages`,
      {
        method: "POST",
        headers: supabaseHeaders,
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: phoneNumber || null,
          message,
        }),
      }
    );

    if (!insertResponse.ok) {
      console.error("Contact insert failed:", insertResponse.status);
      return jsonResponse({ error: "Message submission failed" }, 502);
    }

    return jsonResponse({ success: true }, 200);
  } catch (error) {
    console.error("Contact function error:", error);
    return jsonResponse({ error: "Unable to process request" }, 500);
  }
};
