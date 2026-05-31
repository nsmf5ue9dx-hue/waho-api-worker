export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    
    // ১. ব্রাউজারের অটোমেটিক CORS/OPTIONS চেকিং রিকোয়েস্ট পার করে দেওয়া
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      });
    }

    // ২. শুধুমাত্র আপনার ব্লগের ডোমেইন চেক করা (www বা মোবাইল ভার্সন সব সাপোর্ট করবে)
    const isAllowed = origin.includes("wahoearnbotist.blogspot.com");
    
    if (origin && !isAllowed) {
      return new Response(JSON.stringify({ error: "Access Denied by Cloudflare Security" }), { 
          status: 403,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" 
          }
      });
    }

    // ৩. আপনার গুগল শিট লিংক ও পাসওয়ার্ড
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw0W7duzFMPoieHDD6Jsa-rC2AfFNvyGBDDSIFmQfZiywVITAYQnF1EPEVOS4E07WfjjQ/exec";
    const SECRET_KEY = "Nirob_Secure_Waho_2026"; 
    
    try {
      const fetchUrl = `${GOOGLE_SCRIPT_URL}?key=${SECRET_KEY}`;
      const response = await fetch(fetchUrl);
      const data = await response.text();

      // ৪. ডেটা পাওয়ার পর ওয়েবসাইটে পাঠানো
      return new Response(data, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin || "*",
          "Access-Control-Allow-Methods": "GET",
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
    }
  }
};
