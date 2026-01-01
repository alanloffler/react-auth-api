export default async function handler(req, res) {
  const path = req.url.replace("/api/", "");

  const RAILWAY_URL = process.env.RAILWAY_API_URL;

  if (!RAILWAY_URL) {
    return res.status(500).json({ error: "RAILWAY_API_URL no está configurada" });
  }

  const targetUrl = `${RAILWAY_URL}/${path}`;

  try {
    const options = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (req.headers.cookie) {
      options.headers["Cookie"] = req.headers.cookie;
    }

    if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);

    const setCookies = [];
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        setCookies.push(value);
      }
    });

    if (setCookies.length > 0) {
      res.setHeader("Set-Cookie", setCookies);
    }

    const contentType = response.headers.get("content-type");
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }

    const data = await response.text();

    return res.status(response.status).send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({
      error: "Error en el proxy",
      details: error.message,
      target: targetUrl,
    });
  }
}
