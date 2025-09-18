# Google Maps Integration Setup

## Overview
The contact page now includes an interactive Google Maps component showing the Institute for Advanced Studies location in Podgorica, Montenegro.

## Setup Instructions

### 1. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API (optional, for enhanced features)
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Add your Google Maps API key:
   ```
   GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

### 3. Features Implemented
- **Interactive Map**: Shows Institute location with zoom controls
- **Custom Marker**: Styled marker with Institute branding colors
- **Info Window**: Displays contact information when marker is clicked
- **Loading States**: Skeleton loader while map initializes
- **Error Handling**: Graceful fallback if API key is missing or invalid
- **Security**: API key is fetched server-side, never exposed to client
- **Performance**: Lazy loading to avoid blocking main bundle

### 4. Technical Details
- **Library**: @vis.gl/react-google-maps v1.5.5 (Google's recommended React wrapper)
- **Location**: 42.4304, 19.2594 (Podgorica coordinates)
- **Styling**: Custom purple gradient marker matching site theme
- **Responsive**: Fully responsive design with Tailwind CSS

### 5. Usage
The GoogleMap component is automatically loaded on the contact page. No additional configuration needed once the API key is set.

### 6. Troubleshooting
- **Map not loading**: Check if GOOGLE_MAPS_API_KEY is set in .env.local
- **Quota exceeded**: Check Google Cloud Console for API usage limits
- **Access denied**: Verify API key restrictions match your domain

## Files Added/Modified
- `/src/components/GoogleMap.tsx` - Main map component
- `/src/app/api/maps/key/route.ts` - Secure API key endpoint
- `/src/app/contact/page.tsx` - Updated to use GoogleMap component
- `/.env.example` - Environment variable template