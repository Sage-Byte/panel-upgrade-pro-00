import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import type { QuizAnswers } from "@/types/quiz";

const LeadForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    postcode: ""
  });
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [evOwnership, setEvOwnership] = useState<string | null>(null);
  const [adId, setAdId] = useState<string | null>(null);

  // Retrieve quiz answers, EV ownership from localStorage, and ad_id from URL
  useEffect(() => {
    console.log('🔄 LeadForm: Loading data from localStorage...');
    
    try {
      const answers = localStorage.getItem("evChargerQuizAnswers");
      if (answers) {
        const parsedAnswers = JSON.parse(answers);
        setQuizAnswers(parsedAnswers);
        console.log('📋 Quiz answers loaded:', parsedAnswers);
      } else {
        console.log('⚠️ No quiz answers found in localStorage');
      }
      
      const evOwnershipData = localStorage.getItem("evOwnership");
      if (evOwnershipData) {
        setEvOwnership(evOwnershipData);
        console.log('🚗 EV ownership loaded:', evOwnershipData);
      } else {
        console.log('⚠️ No EV ownership data found in localStorage');
      }

      // Capture ad_id from URL parameters or localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const adIdParam = urlParams.get('ad_id');
      const savedAdId = localStorage.getItem("adId");
      
      console.log('🔍 Checking for ad_id - URL:', adIdParam, 'localStorage:', savedAdId);
      
      if (adIdParam) {
        setAdId(adIdParam);
        console.log('✅ Ad ID captured from URL:', adIdParam);
      } else if (savedAdId) {
        setAdId(savedAdId);
        console.log('✅ Ad ID retrieved from localStorage:', savedAdId);
      } else {
        console.log('ℹ️ No ad_id found');
      }
    } catch (error) {
      console.error("❌ Error loading data:", error);
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('🚀 Form submission started!');
    console.log('📊 Form Data:', formData);
    console.log('📋 Quiz Answers:', quizAnswers);
    console.log('🚗 EV Ownership:', evOwnership);
    console.log('📱 Ad ID:', adId);
    
    try {
      // Prepare contact data
      const contactData = {
        firstName: formData.fullName.split(' ')[0] || formData.fullName,
        lastName: formData.fullName.split(' ').slice(1).join(' ') || '',
        email: formData.email,
        phone: formData.phone,
        customFields: {
          // Form data
          postcode: formData.postcode,
          ev_ownership: evOwnership || '',
          
          // Quiz answers as custom fields
          electrical_system: quizAnswers?.electricalSystem || '',
          charging_frequency: quizAnswers?.chargingFrequency || '',
          charger_type: quizAnswers?.chargerType || '',
          property_type: quizAnswers?.propertyType || '',
          garage_type: quizAnswers?.garageType || '',
          current_panel: quizAnswers?.currentPanel || '',
          timeline: quizAnswers?.timeline || '',
          quiz_zip: quizAnswers?.zip || '',
          
          // Meta Ad tracking
          ad_id: adId || '',
          
          // Additional tracking
          lead_source: 'EV Charger Funnel',
          form_submission_date: new Date().toISOString()
        }
      };

      console.log('📤 Sending contact data to GHL:', contactData);

      console.log('🌐 Making API calls to create contact and opportunity...');
      
      // Create contact in GoHighLevel
      const contactResponse = await fetch('/api/ghl/create-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      if (!contactResponse.ok) {
        const errorText = await contactResponse.text();
        throw new Error(`Failed to create contact: ${contactResponse.status} - ${errorText}`);
      }

      const contact = await contactResponse.json();
      console.log('✅ Contact created:', contact);

      // Create opportunity in "Paid Ads Pipeline" → "New Lead 💡" stage
      const opportunityData = {
        contactId: contact.contact?.id || contact.id,
        title: `EV Charger Installation - ${formData.fullName}`,
        status: 'open',
        value: 0,
        source: 'EV Charger Funnel',
        notes: `Lead from EV Charger funnel. EV Ownership: ${evOwnership}. Property: ${quizAnswers?.propertyType || 'Not specified'}${adId ? `. Ad ID: ${adId}` : ''}`
      };

      // Call GHL API directly - this works!
      const opportunityResponse = await fetch('https://services.leadconnectorhq.com/opportunities/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer pit-c8aaff13-e75a-4852-9d5a-ef7eac38b4a8`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        },
        body: JSON.stringify({
          name: `EV Charger Installation - ${formData.fullName}`,
          pipelineId: 'uawoqNEqdaeDXFMuyFTt', // Paid Ads Pipeline
          stageId: '99950fe2-4b99-4d2f-a81d-8d9b715ea6a0', // New Lead 💡 stage
          contactId: contact.contact?.id || contact.id,
          status: 'open',
          monetaryValue: 0
        })
      });

      const opportunityResponseText = await opportunityResponse.text();
      console.log('GHL Opportunity API Response:', opportunityResponse.status, opportunityResponseText);

      if (!opportunityResponse.ok) {
        // Handle duplicate opportunity gracefully
        if (opportunityResponse.status === 400 && opportunityResponseText.includes('duplicate opportunity')) {
          console.log('✅ Contact already has an opportunity (this is normal)');
        } else {
          console.error('❌ Opportunity creation failed:', opportunityResponse.status, opportunityResponseText);
        }
      } else {
        const opportunity = JSON.parse(opportunityResponseText);
        console.log('✅ Opportunity created:', opportunity);
      }

      console.log('🎯 Redirecting to results page...');
      // Redirect to results page
      navigate('/results');
      
    } catch (error) {
      console.error('❌ Submission error:', error);
      // Still redirect to results even if API fails
      navigate('/results');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <SEOHead title="Get Your EV Charger Quote" description="Enter your details to get your personalized EV charger installation quote from Electric Medic." />
      

      {/* Header Section */}
      <section className="container px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Your Personalized EV Charger Estimate is Ready! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Enter your details to see your custom results and book a free consultation.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="container px-4 pb-12">
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="test"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="test@gmail.com"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="938507357"
                />
              </div>
            </div>

            {/* Postcode */}
            <div>
              <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">
                Postcode *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  id="postcode"
                  type="text"
                  required
                  value={formData.postcode}
                  onChange={(e) => handleInputChange('postcode', e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="8500"
                />
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="consent" className="text-gray-700">
                  I agree to be contacted about my EV charger estimate and consultation. *
                </label>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <svg className="h-4 w-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 text-sm">
                <p className="text-gray-600">
                  Your information is secure and will only be used to provide your EV charger estimate and consultation details.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex gap-4">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex justify-center items-center py-3 px-6 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    Show My Results
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </section>
    </main>
  );
};

export default LeadForm;