# Farmer Profile Feature - Quick Start Guide

## 🚀 Quick Overview

The Farmer Profile feature is a complete profile management system for farmers in the AgriConnect platform.

**Route**: `/farmer/profile`
**Button**: "Profile" in farmer navbar

---

## 📍 How to Access

1. **Login** as a farmer
2. Navigate to farmer dashboard
3. Click **"Profile"** button in top navbar
4. You'll see your profile page

---

## 🎯 What You Can Do

### View Your Profile
- See your name, email, and phone number
- Display your farmer role with avatar
- Quick overview of your account information

### Edit Your Profile
1. Click **"Edit Profile"** button
2. Update any field:
   - Full Name
   - Email Address
   - Phone Number
3. Click **"Save Changes"** to submit
4. See success confirmation

### Change Your Password
1. Click **"Change Password"** tab
2. Enter your current password
3. Enter your new password (8+ characters)
4. Confirm your new password
5. Click **"Change Password"**
6. See success message

### Delete Your Account
1. Click **"Delete Account"** button
2. Review the warning message
3. Confirm deletion
4. Your account is deactivated
5. You're logged out and redirected to home

---

## 📱 Device Support

### Desktop
- Full two-column layout
- Sidebar navigation
- Optimal spacing
- Professional appearance

### Tablet
- Responsive layout
- Sidebar + Content
- Touch-friendly buttons
- Readable fonts

### Mobile
- Single column layout
- Full-width content
- Stacked navigation
- Touch-optimized

---

## 🎨 UI Elements

### Avatar
- Shows your initials
- Green background
- 24x24 pixels
- Farmer themed

### Buttons
- **Edit Profile** - Green, primary action
- **Save Changes** - Green, submit form
- **Cancel** - Outline style, secondary
- **Delete Account** - Red, danger action
- **Change Password** - Green, password action

### Tabs
- **Profile** - View and edit information
- **Change Password** - Update password

### Status Messages
- **Loading**: Spinner with text
- **Success**: Green toast notification
- **Error**: Red toast notification

---

## 🔐 Security Notes

- Your data is encrypted in transit (HTTPS)
- Password must be 8+ characters
- Password confirmation required
- Account deletion is permanent
- Bearer token used for authentication

---

## ⚡ Quick Workflows

### Change Email
```
1. Click "Edit Profile"
2. Update email field
3. Click "Save Changes"
4. ✓ Success notification
```

### Change Phone
```
1. Click "Edit Profile"
2. Update phone field
3. Click "Save Changes"
4. ✓ Success notification
```

### Change Password
```
1. Click "Change Password" tab
2. Enter current password
3. Enter new password
4. Confirm new password
5. Click "Change Password"
6. ✓ Success notification
```

### Delete Account
```
1. Click "Delete Account"
2. Read warning
3. Confirm deletion
4. Account deactivated
5. Logged out → Home page
```

---

## 💡 Tips & Tricks

### Profile Management
- Edit one field at a time for clarity
- Use the cancel button to undo changes
- Passwords are case-sensitive
- Phone numbers can include + and -

### Password Security
- Use strong passwords
- Don't reuse old passwords
- Use mix of letters, numbers, symbols
- Change password regularly

### Account Safety
- Keep your email current
- Update phone number if it changes
- Review your information regularly
- Don't share your password

---

## ❓ Troubleshooting

### Profile Won't Load
- Check internet connection
- Refresh the page
- Clear browser cache
- Try different browser

### Can't Save Changes
- Check all fields are filled
- Verify email format is valid
- Check phone format
- Try again in a few seconds

### Password Change Failed
- Current password must be correct
- New password must be 8+ characters
- Passwords must match
- Try again with different password

### Can't Delete Account
- Must confirm the action
- Account deletion is permanent
- No data can be recovered
- Contact support if needed

---

## 📞 Getting Help

### If Something Goes Wrong
1. Check error message in toast
2. Refresh the page
3. Check internet connection
4. Try again in a few minutes
5. Contact support if issue persists

### Common Issues

**"Profile won't load"**
- Wait a moment and refresh
- Check internet connection
- Try different browser

**"Can't save profile"**
- Check all fields are filled
- Verify email format
- Try saving again

**"Password change not working"**
- Current password must be correct
- New password must be 8+ characters
- Passwords must match exactly

**"Getting 401 error"**
- You may need to login again
- Your session may have expired
- Try logging out and back in

---

## 🔗 Related Features

### Farmer Dashboard
- **Overview**: Sales and farm overview
- **Orders**: Manage customer orders
- **Products**: Manage farm products
- **Seasons**: Manage planting seasons
- **Farms**: Manage farm information
- **Profile**: This page

### Account Management
- **Profile Settings**: View and edit profile (this page)
- **Change Password**: Update account password (this page)
- **Delete Account**: Deactivate account (this page)

---

## 📋 Feature Checklist

- ✅ View profile information
- ✅ Edit profile information
- ✅ Change password
- ✅ Delete account
- ✅ Loading states
- ✅ Error handling
- ✅ Mobile responsive
- ✅ Form validation
- ✅ Success notifications
- ✅ Professional UI

---

## 🎯 Best Practices

### Profile Management
- [ ] Keep your email up to date
- [ ] Keep your phone number current
- [ ] Review your information regularly
- [ ] Update password periodically
- [ ] Don't share your credentials

### Security
- [ ] Use strong passwords
- [ ] Change password every 3 months
- [ ] Don't reuse old passwords
- [ ] Use unique combinations
- [ ] Log out on shared devices

### Account Maintenance
- [ ] Verify contact information
- [ ] Check for unauthorized changes
- [ ] Review recent activity
- [ ] Update profile picture (when available)
- [ ] Keep backup contact info

---

## 📊 Information Stored

Your farmer profile includes:
- **Name**: Your full legal name
- **Email**: Contact email address
- **Phone**: Contact phone number
- **Avatar**: Profile picture (with initials fallback)
- **Created Date**: Account creation date
- **Account ID**: Unique identifier

---

## 🔄 Data Flow

```
┌─ Navbar Profile Button ─┐
│                         │
└──→ /farmer/profile ─────┘
         │
         ├─→ Load Profile Data
         │   GET /api/profiles/me
         │
         ├─→ Display Profile
         │   View Mode
         │
         ├─→ Edit Profile
         │   Toggle Edit Mode
         │
         ├─→ Save Changes
         │   PUT /api/profiles/{id}
         │
         ├─→ Change Password
         │   (Form validation)
         │
         └─→ Delete Account
             PATCH /api/auth/me/deactive
```

---

## 🎓 Learning Resources

### Related Documentation
- `FARMER_PROFILE_IMPLEMENTATION.md` - Technical details
- `FARMER_PROFILE_UI_GUIDE.md` - Visual design
- `UI_IMPROVEMENTS_BEFORE_AFTER.md` - Feature comparison
- `IMPLEMENTATION_CHECKLIST.md` - Completeness check

---

## 📞 Support Contacts

For technical issues or questions:
1. Check this Quick Start Guide
2. Review troubleshooting section
3. Check implementation documentation
4. Contact development team
5. Submit support ticket

---

## ✨ Summary

The Farmer Profile feature provides a complete profile management solution for farmers, including:
- ✅ Profile information viewing
- ✅ Profile information editing
- ✅ Password management
- ✅ Account management
- ✅ Mobile responsive design
- ✅ Professional user interface
- ✅ Secure API integration
- ✅ Complete documentation

**Status**: Ready to use
**Last Updated**: December 8, 2025
**Version**: 1.0

---

**Enjoy managing your farmer profile! 🌾**
