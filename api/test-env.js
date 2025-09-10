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
    const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID;

    return res.status(200).json({
      success: true,
      environment: {
        GHL_API_KEY: GHL_API_KEY ? `${GHL_API_KEY.substring(0, 10)}...` : 'Missing',
        GHL_LOCATION_ID: GHL_LOCATION_ID || 'Missing',
        GHL_PIPELINE_ID: GHL_PIPELINE_ID || 'Missing'
      },
      message: 'Environment variables check'
    });

  } catch (error) {
    console.error('Error checking environment:', error);
    return res.status(500).json({ 
      error: 'Failed to check environment',
      details: error.message 
    });
  }
}
