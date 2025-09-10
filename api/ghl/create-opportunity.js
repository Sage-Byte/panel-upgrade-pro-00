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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { contactId, title, status, stage, value, source, notes } = req.body;

    // GoHighLevel API configuration
    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
    const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID;

    console.log('Environment variables check (v2):');
    console.log('GHL_API_KEY:', GHL_API_KEY ? 'Present' : 'Missing');
    console.log('GHL_LOCATION_ID:', GHL_LOCATION_ID || 'Missing');
    console.log('GHL_PIPELINE_ID:', GHL_PIPELINE_ID || 'Missing');

    if (!GHL_API_KEY || !GHL_LOCATION_ID || !GHL_PIPELINE_ID) {
      console.error('Missing GHL credentials');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // GHL will automatically assign the opportunity to the first stage of the pipeline

    // Prepare opportunity data for GHL API
    const opportunityData = {
      name: title,
      status,
      contactId,
      monetaryValue: value || 0,
      pipelineId: GHL_PIPELINE_ID,
      locationId: GHL_LOCATION_ID,
      source
    };

    console.log('Creating opportunity with data:', JSON.stringify(opportunityData, null, 2));

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
    console.log('GHL Opportunity API Response:', response.status, responseText);

    if (!response.ok) {
      throw new Error(`GHL API error: ${response.status} - ${responseText}`);
    }

    const opportunity = JSON.parse(responseText);
    
    return res.status(200).json({
      success: true,
      opportunity: opportunity.opportunity || opportunity,
      message: 'Opportunity created successfully'
    });

  } catch (error) {
    console.error('Error creating opportunity:', error);
    return res.status(500).json({ 
      error: 'Failed to create opportunity',
      details: error.message 
    });
  }
}
