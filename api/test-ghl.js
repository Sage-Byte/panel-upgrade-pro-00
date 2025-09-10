export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

    console.log('Testing GHL API...');
    console.log('API Key present:', !!GHL_API_KEY);
    console.log('Location ID present:', !!GHL_LOCATION_ID);
    
    if (!GHL_API_KEY) {
      return res.status(500).json({ 
        error: 'GHL_API_KEY environment variable is missing',
        hasApiKey: false,
        hasLocationId: !!GHL_LOCATION_ID
      });
    }

    if (!GHL_LOCATION_ID) {
      return res.status(500).json({ 
        error: 'GHL_LOCATION_ID environment variable is missing',
        hasApiKey: !!GHL_API_KEY,
        hasLocationId: false
      });
    }

    // Test API key by getting location info
    const response = await fetch(`https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      }
    });

    const responseText = await response.text();
    console.log('GHL API Response Status:', response.status);
    console.log('GHL API Response:', responseText.substring(0, 200));

    if (!response.ok) {
      return res.status(500).json({
        error: 'GHL API test failed',
        status: response.status,
        details: responseText,
        apiKeyValid: false
      });
    }

    const locationData = JSON.parse(responseText);
    
    return res.status(200).json({
      success: true,
      message: 'GHL API connection successful',
      location: locationData.location?.name || 'Unknown',
      apiKeyValid: true,
      hasApiKey: true,
      hasLocationId: true
    });

  } catch (error) {
    console.error('Test error:', error);
    return res.status(500).json({ 
      error: 'Test failed',
      details: error.message 
    });
  }
}
