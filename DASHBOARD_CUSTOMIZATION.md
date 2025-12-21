# Dashboard Components - Code Examples & Customization

## 1. Adding New Appointments

### How to Add Appointments
Edit `src/Pages/User/Dashboard.jsx`:

```javascript
const upcomingAppointments = [
  { 
    id: 1, 
    title: "Court Hearing", 
    date: "May 5, 2025", 
    time: "10:00 AM", 
    lawyer: "Adv. Ahmed Raza" 
  },
  // Add more like this:
  { 
    id: 4, 
    title: "Pre-trial Meeting", 
    date: "May 10, 2025", 
    time: "3:30 PM", 
    lawyer: "Adv. Sara Khan" 
  },
];
```

---

## 2. Adding New Cases

### How to Add Cases
Edit `src/Pages/User/Dashboard.jsx`:

```javascript
const recentCases = [
  { 
    id: 1, 
    name: "Divorce Case", 
    status: "ongoing",      // Options: 'ongoing', 'pending', 'closed'
    lastUpdate: "2 mins ago", 
    caseNumber: "#2024-001" 
  },
  // Add more like this:
  { 
    id: 6, 
    name: "Custody Matter", 
    status: "pending",
    lastUpdate: "5 hours ago", 
    caseNumber: "#2024-006" 
  },
];
```

---

## 3. Customizing Card Colors

### Change DashboardCard Icon Background
Edit `src/Styles/User/DashboardCard.css`:

```css
/* Current: Blue gradient */
.dashboard-card-icon-wrapper {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  /* Change to: */
  /* Purple: linear-gradient(135deg, #8b5cf6, #7c3aed); */
  /* Green:  linear-gradient(135deg, #10b981, #059669); */
  /* Red:    linear-gradient(135deg, #ef4444, #dc2626); */
}
```

---

## 4. Changing Status Badge Colors

### Status Badge Styling
Edit `src/Styles/User/Dashboard.css`:

```css
/* Green for Ongoing */
.status-ongoing {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
}

/* Orange for Pending */
.status-pending {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);
}

/* Gray for Closed */
.status-closed {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(107, 114, 128, 0.3);
}
```

---

## 5. Adding New Notifications

### How to Add Notifications
Edit `src/Components/User/Notification.jsx`:

```javascript
const notificationsData = [
  { 
    id: 1, 
    message: "New case request from John Doe", 
    time: "2 mins ago", 
    type: "normal",      // Options: 'normal' or 'emergency'
    icon: "📧" 
  },
  // Add more like this:
  { 
    id: 5, 
    message: "Your case is ready for review", 
    time: "30 mins ago", 
    type: "normal",
    icon: "✅" 
  },
  { 
    id: 6, 
    message: "URGENT: Client needs immediate consultation", 
    time: "Just now", 
    type: "emergency",
    icon: "🚨" 
  },
];
```

---

## 6. Modifying Card Layout

### Change Card Grid Columns
Edit `src/Styles/User/Dashboard.css`:

```css
/* Current: 4 cards in 1 row (desktop) */
.dashboard-cards {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  /* Change to: */
  /* 3 cards per row: */
  /* grid-template-columns: repeat(3, 1fr); */
  
  /* 2 cards per row: */
  /* grid-template-columns: repeat(2, 1fr); */
  
  /* 1 card per row: */
  /* grid-template-columns: 1fr; */
}
```

---

## 7. Adjusting Spacing

### Modify Gap and Padding
Edit `src/Styles/User/Dashboard.css`:

```css
/* Card gaps */
.dashboard-cards {
  gap: 28px;  /* Increase/decrease space between cards */
}

/* Container padding */
.dashboard-container {
  padding: 40px;  /* Increase/decrease padding inside container */
}

/* Header padding */
.dashboard-header {
  padding: 40px;  /* Increase/decrease header padding */
}
```

---

## 8. Changing Font Sizes

### Modify Typography
Edit `src/Styles/User/Dashboard.css`:

```css
/* Header title */
.dashboard-header h1 {
  font-size: 32px;  /* Change to: 28px, 36px, etc. */
}

/* Card title */
.dashboard-card-content .card-title {
  font-size: 18px;  /* Change to: 16px, 20px, etc. */
}

/* Card description */
.dashboard-card-content .card-description {
  font-size: 14px;  /* Change to: 12px, 16px, etc. */
}
```

---

## 9. Adjusting Hover Effects

### Modify Animation Duration and Distance
Edit CSS files:

```css
/* Current: 0.3s ease, translateY(-8px) */
.dashboard-card {
  transition: all 0.3s ease;  /* Change 0.3s to slower/faster */
}

.dashboard-card:hover {
  transform: translateY(-8px);  /* Change -8px to larger/smaller movement */
}
```

---

## 10. Customizing Mobile Breakpoints

### Change Responsive Breakpoints
Edit `src/Styles/User/Dashboard.css`:

```css
/* Tablet breakpoint */
@media (max-width: 1200px) {
  /* Styles for tablets and smaller desktops */
}

/* Mobile breakpoint */
@media (max-width: 768px) {
  /* Styles for phones and tablets */
}

/* Small mobile breakpoint */
@media (max-width: 480px) {
  /* Styles for very small phones */
}
```

---

## 11. Changing Appointment Button

### Modify Action Button
Edit `src/Styles/User/Dashboard.css`:

```css
.appointment-action {
  width: 40px;
  height: 40px;
  /* Change size: */
  /* width: 50px; */
  /* height: 50px; */
  
  font-size: 18px;
  /* Change icon size: */
  /* font-size: 24px; */
  
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  /* Change color: */
  /* background: linear-gradient(135deg, #10b981, #059669); */
}
```

---

## 12. Stats Cards Customization

### Modify Statistics Cards
Edit `src/Pages/User/Dashboard.jsx`:

```javascript
// Current stats in dashboard header
<div className="dashboard-stats">
  <DashboardCard 
    title="Total Cases" 
    description="12 Ongoing / 5 Closed" 
    icon="📁" 
  />
  <DashboardCard 
    title="Pending Requests" 
    description="3 Requests Pending" 
    icon="⏳" 
  />
  <DashboardCard 
    title="Emergency Alerts" 
    description="2 Urgent Cases" 
    icon="⚠️" 
  />
</div>

// Add or modify by changing title, description, icon
```

---

## 13. Adjusting Table Column Width

### Modify Cases Table
Edit `src/Styles/User/Dashboard.css`:

```css
.cases-table th {
  padding: 16px;  /* Change padding to adjust column width */
}

.cases-table td {
  padding: 16px;  /* Change padding to adjust row height */
}

/* Hide column on mobile */
.case-id {
  display: none;  /* Currently hidden on mobile */
  /* Remove display: none; to show on all screens */
}
```

---

## 14. Emergency Animation Customization

### Modify Pulse Animation
Edit `src/Styles/User/Notification.css`:

```css
.emergency-indicator {
  animation: pulse 2s infinite;  /* 2s = duration, infinite = loop */
  /* Change to: */
  /* animation: pulse 3s infinite;  (slower) */
  /* animation: pulse 1s infinite;  (faster) */
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(239, 68, 68, 0.6);
  }
}
```

---

## 15. Adding More Dashboard Sections

### Extend Dashboard with New Section
Edit `src/Pages/User/Dashboard.jsx`:

```javascript
{/* New Section */}
<div className="dashboard-section">
  <div className="section-header">
    <h2>⚡ New Section Title</h2>
    <p className="section-subtitle">Subtitle here</p>
  </div>
  {/* Your content here */}
</div>
```

Edit `src/Styles/User/Dashboard.css`:

```css
.dashboard-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.5);
  margin-bottom: 40px;
}
```

---

## 16. Quick Color Reference

### All Colors Used
```css
/* Primary */
#3b82f6   - Primary Blue
#2563eb   - Darker Blue
#1d4ed8   - Darkest Blue

/* Text */
#0f172a   - Dark Text
#1e293b   - Lighter Dark Text
#475569   - Medium Gray
#64748b   - Light Gray

/* Background */
#ffffff   - White
#f8fafc   - Off-white
#f1f5f9   - Light Gray
#e2e8f0   - Lighter Gray

/* Status */
#10b981   - Green (Ongoing)
#f59e0b   - Orange (Pending)
#6b7280   - Gray (Closed)
#ef4444   - Red (Emergency)
```

---

## 17. Adding Dark Mode

### Quick Dark Mode Implementation
Create a toggle in Dashboard.jsx:

```javascript
const [isDarkMode, setIsDarkMode] = useState(false);

<div className={`dashboard-wrapper ${isDarkMode ? 'dark' : ''}`}>
  {/* Content */}
</div>
```

Add to Dashboard.css:

```css
.dashboard-wrapper.dark {
  background: linear-gradient(135deg, #0f172a 0%, #1a2e4a 100%);
}

.dashboard-wrapper.dark .dashboard-card {
  background: linear-gradient(135deg, #1a2e4a 0%, #243550 100%);
  color: #ffffff;
}
```

---

## 18. Performance Tips

### Optimize Component Rendering
```javascript
// Memoize static components
const DashboardCard = React.memo(({ title, description, icon, link }) => {
  // Component code
});

// Use useCallback for event handlers
const handleAppointmentClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

---

## 19. Accessibility Improvements

### Add ARIA Labels and Semantic HTML
```jsx
// Add to cards
<div 
  className="dashboard-card"
  role="article"
  aria-label="Dashboard card for Search Lawyers"
>

// Add to buttons
<button 
  className="appointment-action"
  aria-label="View appointment details"
>
  →
</button>
```

---

## 20. Common Customization Scenarios

### Scenario 1: Make All Cards Same Height
```css
.dashboard-cards {
  grid-auto-rows: 1fr;  /* Makes all cards equal height */
}
```

### Scenario 2: Remove Hover Effects
```css
.dashboard-card:hover {
  transform: none;  /* Disable translation */
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);  /* Keep shadow */
}
```

### Scenario 3: Increase Animation Speed
```css
.dashboard-card {
  transition: all 0.15s ease;  /* Faster: 0.15s instead of 0.3s */
}
```

### Scenario 4: Change All Borders
```css
/* Add this to override all border radiuses */
* {
  border-radius: 8px !important;  /* Smaller corners */
}
```

---

## Summary

All components are fully customizable. Use these code examples as templates to:
- ✅ Add new data
- ✅ Change colors
- ✅ Adjust spacing
- ✅ Modify animations
- ✅ Extend layouts
- ✅ Optimize performance

Happy customizing! 🎨
