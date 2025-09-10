export default async function handler(req, res) {
  console.log('=== NEW OPPORTUNITY API v2 CALLED ===');
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { contactId, title, status, value, source } = req.body;

    // GoHighLevel API configuration
    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
    const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID;

    console.log('=== ENVIRONMENT CHECK ===');
    console.log('API Key present:', !!GHL_API_KEY);
    console.log('Location ID:', GHL_LOCATION_ID);
    console.log('Pipeline ID:', GHL_PIPELINE_ID);

    if (!GHL_API_KEY || !GHL_LOCATION_ID || !GHL_PIPELINE_ID) {
      return res.status(500).json({ error: 'Missing environment variables' });
    }

    // Create opportunity data
    const opportunityData = {
      name: title,
      status: status || 'open',
      contactId,
      monetaryValue: value || 0,
      pipelineId: GHL_PIPELINE_ID,
      locationId: GHL_LOCATION_ID,
      source: source || 'API'
    };

    console.log('Creating opportunity with data:', opportunityData);

    // Create opportunity in GoHighLevel
    const response = await fetch('https://services.leadconnectorhq.com/opportunities/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(opportunityData)
    });

    const responseText = await response.text();
    console.log('GHL API Response Status:', response.status);
    console.log('GHL API Response Body:', responseText);

    if (!response.ok) {
      return res.status(500).json({ 
        error: 'GHL API error',
        status: response.status,
        details: responseText
      });
    }

    const opportunity = JSON.parse(responseText);
    
    return res.status(200).json({
      success: true,
      opportunity: opportunity.opportunity || opportunity,
      message: 'Opportunity created successfully - NEW API'
    });

  } catch (error) {
    console.error('Error in new opportunity API:', error);
    return res.status(500).json({ 
      error: 'API error',
      details: error.message 
    });
  }
}
