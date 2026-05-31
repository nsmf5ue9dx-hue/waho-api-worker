export default {
  async fetch(request, env, ctx) {
    const ALLOWED_DOMAIN = "https://wahoearnbotist.blogspot.com";
    const requestOrigin = request.headers.get("Origin");

    if (requestOrigin !== ALLOWED_DOMAIN) {
      return new Response(JSON.stringify({ error: "Access Denied by Cloudflare Security" }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": ALLOWED_DOMAIN 
        }
      });
    }

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw0W7duzFMPoieHDD6Jsa-rC2AfFNvyGBDDSIFmQfZiywVITAYQnF1EPEVOS4E07WfjjQ/exec";
    const SECRET_KEY = "Nirob_Secure_Waho_2026"; 
    
    try {
      const fetchUrl = `${GOOGLE_SCRIPT_URL}?key=${SECRET_KEY}`;
      const response = await fetch(fetchUrl);
      const data = await response.text();

      return new Response(data, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": ALLOWED_DOMAIN,
          "Access-Control-Allow-Methods": "GET",
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Backend Server Error" }), { status: 500 });
    }
  }
};
