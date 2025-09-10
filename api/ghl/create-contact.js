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
    const { firstName, lastName, email, phone, customFields } = req.body;

    // GoHighLevel API configuration
    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      console.error('Missing GHL credentials');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Prepare contact data for GHL API
    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      locationId: GHL_LOCATION_ID,
      customFields: Object.entries(customFields).map(([key, value]) => ({
        key,
        field_value: value
      }))
    };

    console.log('Creating contact with data:', JSON.stringify(contactData, null, 2));

    // Create contact in GoHighLevel
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(contactData)
    });

    const responseText = await response.text();
    console.log('GHL API Response:', response.status, responseText);

    if (!response.ok) {
      throw new Error(`GHL API error: ${response.status} - ${responseText}`);
    }

    const contact = JSON.parse(responseText);
    
    return res.status(200).json({
      success: true,
      contact: contact.contact || contact,
      message: 'Contact created successfully'
    });

  } catch (error) {
    console.error('Error creating contact:', error);
    return res.status(500).json({ 
      error: 'Failed to create contact',
      details: error.message 
    });
  }
}
