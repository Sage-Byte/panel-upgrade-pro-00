import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// GHL Create Contact endpoint
app.post('/api/ghl/create-contact', async (req, res) => {
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

    console.log('🚀 Creating contact with data:', JSON.stringify(contactData, null, 2));

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
    console.log('📡 GHL API Response:', response.status, responseText);

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
    console.error('❌ Error creating contact:', error);
    return res.status(500).json({ 
      error: 'Failed to create contact',
      details: error.message 
    });
  }
});

// GHL Create Opportunity endpoint
app.post('/api/ghl/create-opportunity', async (req, res) => {
  try {
    const { contactId, title, status, stage, value, source, notes } = req.body;

    // GoHighLevel API configuration
    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
    const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID;

    if (!GHL_API_KEY || !GHL_LOCATION_ID || !GHL_PIPELINE_ID) {
      console.error('Missing GHL credentials');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // First, get the pipeline stages to find the "Lead In" stage ID
    const pipelineResponse = await fetch(`https://services.leadconnectorhq.com/opportunities/pipelines/${GHL_PIPELINE_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      }
    });

    if (!pipelineResponse.ok) {
      throw new Error(`Failed to fetch pipeline: ${pipelineResponse.status}`);
    }

    const pipeline = await pipelineResponse.json();
    const leadInStage = pipeline.stages?.find(s => s.name === 'Lead In') || pipeline.stages?.[0];
    
    if (!leadInStage) {
      throw new Error('Lead In stage not found in pipeline');
    }

    // Prepare opportunity data for GHL API
    const opportunityData = {
      title,
      stageId: leadInStage.id,
      status,
      contactId,
      monetaryValue: value || 0,
      pipelineId: GHL_PIPELINE_ID,
      locationId: GHL_LOCATION_ID,
      source,
      notes
    };

    console.log('🎯 Creating opportunity with data:', JSON.stringify(opportunityData, null, 2));

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
    console.log('📡 GHL Opportunity API Response:', response.status, responseText);

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
    console.error('❌ Error creating opportunity:', error);
    return res.status(500).json({ 
      error: 'Failed to create opportunity',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Development API server running at http://localhost:${port}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   POST http://localhost:${port}/api/ghl/create-contact`);
  console.log(`   POST http://localhost:${port}/api/ghl/create-opportunity`);
});
