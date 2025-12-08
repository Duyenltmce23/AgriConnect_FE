# Farmer Profile Implementation

## Overview
Implemented a complete farmer profile feature that allows farmers to view and edit their profile information by clicking the "Profile" button in the navbar.

## Implementation Details

### 1. API Integration
- **Endpoint**: `/api/profiles/me`
- **Method**: GET (for fetching), PUT (for updating), PATCH (for delete)
- **Location**: `src/api/index.ts` (already existed)

### 2. Files Created

#### a. API Module
**File**: `src/features/farmer/FarmerProfile/api/index.ts`

Contains three main functions:
- `getFarmerProfile()` - Fetches farmer profile data from `/api/profiles/me`
- `updateFarmerProfile(request)` - Updates farmer profile information
- `deleteFarmerAccount()` - Deactivates farmer account

All functions:
- Use axios with Bearer token authentication
- Include error handling for 400 status codes
- Return typed responses

#### b. Types
**File**: `src/features/farmer/FarmerProfile/types/index.ts`

Defines:
- `FarmerProfileInfo` - Interface for farmer profile data matching API response
- `FarmerProfileResponse` - API response type for profile fetch
- `UpdateFarmerProfileResponse` - API response type for profile updates
- `DeleteFarmerAccountResponse` - API response type for account deletion

#### c. Component
**File**: `src/features/farmer/FarmerProfile/FarmerProfile.tsx`

Features:
- **Profile Loading**: Fetches farmer profile on component mount using `useEffect`
- **Two Tabs**:
  - Profile tab: View/Edit name, email, phone
  - Password tab: Change password
  - Delete account option
- **Edit Mode**: Toggle between view and edit modes
- **Validation**: Ensures all required fields are filled before save
- **Error Handling**: Toast notifications for success/error messages
- **Loading State**: Shows loading spinner while fetching data
- **Navigation**: Back button returns to farmer dashboard

### 3. Route Setup
**File**: `src/app/App.tsx`

Added new route:
```tsx
<Route path="/farmer/profile" element={<FarmerProfile />} />
```

Located within the FarmerLayout route group, ensuring:
- Proper navbar display
- Consistent styling with other farmer pages
- Navigation drawer integration

### 4. Navigation Integration
**File**: `src/features/farmer/components/FarmerLayout/Index.tsx`

The Profile button (line 66-69) calls:
```tsx
function onNavigateToProfile() {
    navigate("/farmer/profile");
}
```

This button is always visible in the farmer navbar header.

## User Flow

1. **Farmer clicks "Profile" button** in navbar
2. **Redirects to** `/farmer/profile`
3. **Calls** `GET /api/profiles/me` to fetch farmer data
4. **Displays** farmer information:
   - Full Name
   - Email
   - Phone Number
5. **Farmer can**:
   - Edit profile information
   - Change password
   - Delete account

## API Response Example
```json
{
    "success": true,
    "message": "Retrieving data successfully!",
    "data": {
        "fullname": "Farmer",
        "email": "farm@gmail.com",
        "phone": "07351670467",
        "avatarUrl": "",
        "accountId": "01b6bd29-11d8-4eb4-0355-08de2c47a494",
        "createdAt": "2025-11-25T17:25:34.901587",
        "id": "f7b5fdd0-1065-4e20-0861-08de2c47a48b"
    }
}
```

## Error Handling
- **401 Unauthorized**: Handled at axios interceptor level
- **400 Bad Request**: Caught and returned in response data
- **Network Errors**: Displayed as toast notifications
- **Validation Errors**: User feedback via toast messages

## Authentication
All API requests include Bearer token from localStorage:
```javascript
const token = localStorage.getItem("token");
const api = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## Similar Implementations
This implementation follows the same pattern as:
- Customer Profile (`src/features/customer/UserProfile/`)
- Admin Profile (`src/features/admin/AdminProfile/`)

## Component Structure
```
FarmerProfile/
├── FarmerProfile.tsx (Main component)
├── api/
│   └── index.ts (API functions)
└── types/
    └── index.ts (TypeScript interfaces)
```

## UI/UX Features

### Layout
- **Container**: Full-width with max-width constraint for readability
- **Responsive**: Mobile-first design with proper breakpoints
- **Structure**: Header card + Tabbed content area

### Visual Elements
- **Avatar**: Large user avatar with initials fallback (green background)
- **Header**: Shows name, role badge, email, and action buttons
- **Navigation**: Sidebar tabs with active state highlighting
- **Form Fields**: Icon-prefixed inputs with consistent styling
- **Cards**: Proper padding, borders, and shadow effects

### Color Scheme
- **Primary Color**: Green (#16a34a) - matching farmer theme
- **Secondary**: Gray tones for text and backgrounds
- **Accent**: Red (#dc2626) for delete/danger actions

## Testing the Feature
1. Login as a farmer
2. Click the "Profile" button in the navbar
3. Verify profile data loads from the API
4. Test edit functionality
5. Verify profile update sends PUT request
6. Test password change
7. Test account deletion (optional)
8. Test responsive layout on mobile/tablet/desktop
