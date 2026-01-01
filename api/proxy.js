export default async function handler(req, res) {
  // Captura todo después de /api/
  const path = req.url.replace('/api/', '');
  
  const RAILWAY_URL = process.env.RAILWAY_API_URL;
  
  if (!RAILWAY_URL) {
    return res.status(500).json({ error: 'RAILWAY_API_URL no está configurada' });
  }

  const targetUrl = `${RAILWAY_URL}/${path}`;

  try {
    const options = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Forward cookies del request original
    if (req.headers.cookie) {
      options.headers['Cookie'] = req.headers.cookie;
    }

    // Incluir body en POST/PUT/PATCH/DELETE
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);
    
    // CRÍTICO: Forward las Set-Cookie headers desde Railway
    const setCookieHeaders = response.headers.raw()['set-cookie'];
    if (setCookieHeaders) {
      res.setHeader('Set-Cookie', setCookieHeaders);
    }

    // Forward Content-Type
    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    // Leer respuesta
    const data = await response.text();
    
    return res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Error en el proxy', 
      details: error.message,
      target: targetUrl 
    });
  }
}
