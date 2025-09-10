# GoHighLevel Integration Configuration

## Required Environment Variables

Add these environment variables to your Vercel deployment:

```
GHL_API_KEY=your_ghl_api_key_here
GHL_LOCATION_ID=your_ghl_location_id_here  
GHL_PIPELINE_ID=your_ghl_pipeline_id_here
```

## How to Get These Values:

### 1. GHL_API_KEY
- Go to GoHighLevel Settings > Integrations > API
- Create a new API key with the following permissions:
  - contacts.write
  - opportunities.write
  - opportunities.read
  - locations.read

### 2. GHL_LOCATION_ID
- Found in your GoHighLevel URL: `https://app.gohighlevel.com/v2/location/{LOCATION_ID}`
- Or get it via API: `GET /locations`

### 3. GHL_PIPELINE_ID
- Go to Settings > Pipelines
- Click on your pipeline and check the URL for the pipeline ID
- Or get it via API: `GET /opportunities/pipelines`
- **Current Pipeline**: "Paid Ads Pipeline" (ID: `uawoqNEqdaeDXFMuyFTt`)

## Custom Fields to Create in GHL:

Make sure these custom fields exist in your GoHighLevel location:

- `postcode` (Text)
- `ev_ownership` (Text)
- `electrical_system` (Text)
- `charging_frequency` (Text)
- `charger_type` (Text)
- `property_type` (Text)
- `garage_type` (Text)
- `current_panel` (Text)
- `timeline` (Text)
- `quiz_zip` (Text)
- `ad_id` (Text) - Meta Ad ID for tracking
- `lead_source` (Text)
- `form_submission_date` (DateTime)

## Pipeline Stage:

Using "Paid Ads Pipeline" → "New Lead 💡" stage for new opportunities from the EV Charger funnel.

Environment variable `GHL_PIPELINE_ID` should be set to: `uawoqNEqdaeDXFMuyFTt`
