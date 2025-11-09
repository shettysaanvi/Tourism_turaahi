// Application State (In-Memory Storage)
const appState = {
  currentUser: null,
  currentRole: null,
  guides: [
    {
      id: 'guide1',
      name: 'Rajesh Sharma',
      email: 'rajesh@guide.com',
      phone: '+91 9876543210',
      experience: 8,
      location: 'Jaipur',
      languages: ['Hindi', 'English', 'Rajasthani'],
      specialization: 'Heritage Tours',
      bio: 'Passionate about showcasing the rich heritage of Rajasthan',
      approved: true
    },
    {
      id: 'guide2',
      name: 'Priya Nair',
      email: 'priya@guide.com',
      phone: '+91 9876543211',
      experience: 5,
      location: 'Kochi',
      languages: ['English', 'Malayalam', 'Tamil'],
      specialization: 'Backwater Tours',
      bio: 'Expert in Kerala backwater experiences',
      approved: true
    },
    {
      id: 'guide3',
      name: 'Amit Singh',
      email: 'amit@guide.com',
      phone: '+91 9876543212',
      experience: 10,
      location: 'Delhi',
      languages: ['Hindi', 'English', 'Punjabi'],
      specialization: 'Adventure Tours',
      bio: 'Adventure enthusiast with decade of experience',
      approved: true
    }
  ],
  tours: [
    {
      id: 'tour1',
      name: 'Golden Triangle Tour',
      destination: 'Delhi-Agra-Jaipur',
      duration: '5 days',
      price: 25000,
      groupSize: 15,
      difficulty: 'Easy',
      description: 'Experience the iconic Golden Triangle - Delhi, Agra, and Jaipur',
      itinerary: 'Day 1: Delhi sightseeing\nDay 2: Agra - Taj Mahal\nDay 3-5: Jaipur palaces',
      guideId: 'guide3',
      guideName: 'Amit Singh',
      approved: true,
      imageDesc: '🕌 Taj Mahal & Red Fort'
    },
    {
      id: 'tour2',
      name: 'Kerala Backwaters',
      destination: 'Alleppey, Kerala',
      duration: '4 days',
      price: 18000,
      groupSize: 10,
      difficulty: 'Easy',
      description: 'Relax on traditional houseboats through serene backwaters',
      itinerary: 'Day 1: Arrival Kochi\nDay 2-3: Houseboat stay\nDay 4: Departure',
      guideId: 'guide2',
      guideName: 'Priya Nair',
      approved: true,
      imageDesc: '🚤 Houseboats in Backwaters'
    },
    {
      id: 'tour3',
      name: 'Rajasthan Royal Heritage',
      destination: 'Udaipur-Jodhpur-Jaisalmer',
      duration: '7 days',
      price: 35000,
      groupSize: 12,
      difficulty: 'Moderate',
      description: 'Explore the royal palaces and majestic forts of Rajasthan',
      itinerary: 'Day 1-2: Udaipur palaces\nDay 3-4: Jodhpur fort\nDay 5-7: Jaisalmer desert',
      guideId: 'guide1',
      guideName: 'Rajesh Sharma',
      approved: true,
      imageDesc: '🏰 Royal Palaces & Forts'
    },
    {
      id: 'tour4',
      name: 'Goa Beach Paradise',
      destination: 'North & South Goa',
      duration: '3 days',
      price: 12000,
      groupSize: 20,
      difficulty: 'Easy',
      description: 'Beach hopping and exploring Portuguese heritage',
      itinerary: 'Day 1: North Goa beaches\nDay 2: South Goa\nDay 3: Churches & culture',
      guideId: 'guide2',
      guideName: 'Priya Nair',
      approved: true,
      imageDesc: '🏖️ Beautiful Beaches'
    },
    {
      id: 'tour5',
      name: 'Himachal Adventure',
      destination: 'Manali-Shimla',
      duration: '6 days',
      price: 28000,
      groupSize: 8,
      difficulty: 'Challenging',
      description: 'Trekking and adventure in the Himalayas',
      itinerary: 'Day 1-3: Manali trekking\nDay 4-6: Shimla exploration',
      guideId: 'guide3',
      guideName: 'Amit Singh',
      approved: true,
      imageDesc: '⛰️ Snow-capped Mountains'
    }
  ],
  touristInterests: [],
  touristRequests: [],
  bookedTours: [],
  pendingGuides: [],
  pendingTours: [],
  recentActivity: [],
  statistics: {
    activeUsers: 0,
    activeTourists: 0,
    activeGuides: 3,
    bookedTours: 0
  }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  updateStatistics();
});

// Login Handler
function handleLogin(event, role) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('input[type="email"]').value;
  
  appState.currentRole = role;
  appState.currentUser = email;
  
  // Hide login page
  document.getElementById('loginPage').classList.remove('active');
  
  // Show appropriate dashboard
  if (role === 'tourist') {
    showTouristDashboard();
  } else if (role === 'guide') {
    showGuideDashboard();
  } else if (role === 'admin') {
    showAdminDashboard();
  }
  
  updateStatistics();
}

// Logout
function logout() {
  appState.currentUser = null;
  appState.currentRole = null;
  
  // Hide all dashboards
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show login page
  document.getElementById('loginPage').classList.add('active');
}

// Tourist Dashboard
function showTouristDashboard() {
  document.getElementById('touristDashboard').classList.add('active');
  renderTours();
  renderInterestedTours();
  appState.statistics.activeTourists++;
  updateStatistics();
}

function renderTours() {
  const toursGrid = document.getElementById('toursGrid');
  const approvedTours = appState.tours.filter(tour => tour.approved);
  
  toursGrid.innerHTML = approvedTours.map(tour => {
    const isInterested = appState.touristInterests.some(
      interest => interest.tourId === tour.id && interest.touristEmail === appState.currentUser
    );
    
    return `
      <div class="tour-card">
        <div class="tour-image">${tour.imageDesc}</div>
        <div class="tour-content">
          <h3 class="tour-title">${tour.name}</h3>
          <p class="tour-location">📍 ${tour.destination}</p>
          <div class="tour-details">
            <span class="tour-detail">⏱️ ${tour.duration}</span>
            <span class="tour-detail">👥 Max ${tour.groupSize}</span>
            <span class="tour-detail">🎯 ${tour.difficulty}</span>
          </div>
          <p class="tour-price">₹${tour.price.toLocaleString('en-IN')}</p>
          <p class="tour-guide">Guide: ${tour.guideName}</p>
          <button 
            onclick="showInterest('${tour.id}')" 
            class="btn ${isInterested ? 'btn-secondary' : 'btn-primary'}" 
            ${isInterested ? 'disabled' : ''}>
            ${isInterested ? '✓ Interest Shown' : 'Show Interest'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterTours() {
  const searchTerm = document.getElementById('tourSearch').value.toLowerCase();
  const toursGrid = document.getElementById('toursGrid');
  const approvedTours = appState.tours.filter(tour => 
    tour.approved && 
    (tour.name.toLowerCase().includes(searchTerm) || 
     tour.destination.toLowerCase().includes(searchTerm))
  );
  
  toursGrid.innerHTML = approvedTours.map(tour => {
    const isInterested = appState.touristInterests.some(
      interest => interest.tourId === tour.id && interest.touristEmail === appState.currentUser
    );
    
    return `
      <div class="tour-card">
        <div class="tour-image">${tour.imageDesc}</div>
        <div class="tour-content">
          <h3 class="tour-title">${tour.name}</h3>
          <p class="tour-location">📍 ${tour.destination}</p>
          <div class="tour-details">
            <span class="tour-detail">⏱️ ${tour.duration}</span>
            <span class="tour-detail">👥 Max ${tour.groupSize}</span>
            <span class="tour-detail">🎯 ${tour.difficulty}</span>
          </div>
          <p class="tour-price">₹${tour.price.toLocaleString('en-IN')}</p>
          <p class="tour-guide">Guide: ${tour.guideName}</p>
          <button 
            onclick="showInterest('${tour.id}')" 
            class="btn ${isInterested ? 'btn-secondary' : 'btn-primary'}" 
            ${isInterested ? 'disabled' : ''}>
            ${isInterested ? '✓ Interest Shown' : 'Show Interest'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function showInterest(tourId) {
  const tour = appState.tours.find(t => t.id === tourId);
  
  const interest = {
    id: Date.now().toString(),
    tourId: tourId,
    tourName: tour.name,
    touristEmail: appState.currentUser,
    guideId: tour.guideId,
    status: 'pending',
    timestamp: new Date().toLocaleString('en-IN')
  };
  
  appState.touristInterests.push(interest);
  
  // Add to guide requests
  appState.touristRequests.push(interest);
  
  // Add to recent activity
  addActivity(`Tourist showed interest in ${tour.name}`);
  
  renderTours();
  renderInterestedTours();
}

function renderInterestedTours() {
  const interestedSection = document.getElementById('interestedTours');
  const userInterests = appState.touristInterests.filter(
    interest => interest.touristEmail === appState.currentUser
  );
  
  if (userInterests.length === 0) {
    interestedSection.innerHTML = '<p class="empty-message">No tours selected yet. Browse and show interest in tours above!</p>';
    return;
  }
  
  interestedSection.innerHTML = userInterests.map(interest => {
    const tour = appState.tours.find(t => t.id === interest.tourId);
    
    return `
      <div class="tour-card">
        <div class="tour-image">${tour.imageDesc}</div>
        <div class="tour-content">
          <h3 class="tour-title">${tour.name}</h3>
          <p class="tour-location">📍 ${tour.destination}</p>
          <span class="tour-status status-${interest.status}">
            ${interest.status === 'pending' ? '⏳ Pending Response' : 
              interest.status === 'accepted' ? '✓ Accepted by Guide' : 
              '✗ Rejected'}
          </span>
          <p class="tour-price">₹${tour.price.toLocaleString('en-IN')}</p>
          <p style="font-size: 0.9rem; color: #666;">Requested: ${interest.timestamp}</p>
        </div>
      </div>
    `;
  }).join('');
}

// Guide Dashboard
function showGuideDashboard() {
  // Check if guide has profile
  const guide = appState.guides.find(g => g.email === appState.currentUser);
  
  if (!guide || !guide.approved) {
    document.getElementById('guideProfileForm').classList.add('active');
  } else {
    document.getElementById('guideDashboard').classList.add('active');
    document.getElementById('guideName').textContent = `Welcome, ${guide.name}!`;
    renderCalendar();
    renderWeather(guide.location);
    renderSuggestedPlaces();
    renderTouristRequests();
  }
  
  appState.statistics.activeGuides++;
  updateStatistics();
}

function submitGuideProfile(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const newGuide = {
    id: 'guide' + Date.now(),
    email: appState.currentUser,
    name: formData.get('name'),
    phone: formData.get('phone'),
    experience: formData.get('experience'),
    location: formData.get('location'),
    languages: Array.from(form.elements['languages'].selectedOptions).map(opt => opt.value),
    specialization: formData.get('specialization'),
    bio: formData.get('bio'),
    approved: false
  };
  
  appState.pendingGuides.push(newGuide);
  addActivity(`New guide profile submitted: ${newGuide.name}`);
  
  alert('Profile submitted successfully! Please wait for admin approval.');
  form.reset();
}

function renderCalendar() {
  const calendarDiv = document.getElementById('calendar');
  const now = new Date();
  const month = now.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  
  let calendarHTML = `
    <div class="calendar">
      <div class="calendar-header">${month}</div>
      <div class="calendar-grid">
        <div class="calendar-day">Sun</div>
        <div class="calendar-day">Mon</div>
        <div class="calendar-day">Tue</div>
        <div class="calendar-day">Wed</div>
        <div class="calendar-day">Thu</div>
        <div class="calendar-day">Fri</div>
        <div class="calendar-day">Sat</div>
  `;
  
  for (let i = 0; i < firstDay; i++) {
    calendarHTML += '<div class="calendar-date"></div>';
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === now.getDate();
    calendarHTML += `<div class="calendar-date ${isToday ? 'today' : ''}">${day}</div>`;
  }
  
  calendarHTML += '</div></div>';
  calendarDiv.innerHTML = calendarHTML;
}

function renderWeather(city) {
  const weatherDiv = document.getElementById('weather');
  const weatherData = {
    'Delhi': { temp: '28°C', condition: 'Partly Cloudy', humidity: '65%', icon: '⛅' },
    'Mumbai': { temp: '31°C', condition: 'Humid', humidity: '78%', icon: '🌤️' },
    'Jaipur': { temp: '35°C', condition: 'Sunny', humidity: '45%', icon: '☀️' },
    'Kochi': { temp: '29°C', condition: 'Pleasant', humidity: '70%', icon: '🌥️' },
    'Manali': { temp: '18°C', condition: 'Cool', humidity: '55%', icon: '❄️' }
  };
  
  const weather = weatherData[city] || weatherData['Delhi'];
  
  weatherDiv.innerHTML = `
    <div class="weather-info">
      <div class="weather-city">${city}</div>
      <div style="font-size: 3rem; margin: 10px 0;">${weather.icon}</div>
      <div class="weather-temp">${weather.temp}</div>
      <div class="weather-condition">${weather.condition}</div>
      <div class="weather-details">
        <div class="weather-detail">
          <div class="weather-detail-label">Humidity</div>
          <div class="weather-detail-value">${weather.humidity}</div>
        </div>
      </div>
    </div>
  `;
}

function renderSuggestedPlaces() {
  const placesDiv = document.getElementById('suggestedPlaces');
  const places = [
    { name: 'Taj Mahal, Agra', desc: 'Wonder of the World', icon: '🕌' },
    { name: 'Red Fort, Delhi', desc: 'Mughal Architecture', icon: '🏛️' },
    { name: 'Hawa Mahal, Jaipur', desc: 'Palace of Winds', icon: '🏰' },
    { name: 'Gateway of India', desc: 'Historic Monument', icon: '🏛️' }
  ];
  
  placesDiv.innerHTML = places.map(place => `
    <div class="place-item">
      <div class="place-icon">${place.icon}</div>
      <div class="place-info">
        <div class="place-name">${place.name}</div>
        <div class="place-desc">${place.desc}</div>
      </div>
    </div>
  `).join('');
}

function submitTour(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const guide = appState.guides.find(g => g.email === appState.currentUser);
  
  const newTour = {
    id: 'tour' + Date.now(),
    name: formData.get('tourName'),
    destination: formData.get('destination'),
    duration: formData.get('duration'),
    price: parseInt(formData.get('price')),
    groupSize: parseInt(formData.get('groupSize')),
    difficulty: formData.get('difficulty'),
    description: formData.get('description'),
    itinerary: formData.get('itinerary'),
    guideId: guide.id,
    guideName: guide.name,
    approved: false,
    imageDesc: '🗺️ ' + formData.get('destination')
  };
  
  appState.pendingTours.push(newTour);
  addActivity(`New tour submitted for approval: ${newTour.name}`);
  
  alert('Tour submitted for verification! Admin will review it soon.');
  form.reset();
}

function renderTouristRequests() {
  const requestsDiv = document.getElementById('touristRequests');
  const guide = appState.guides.find(g => g.email === appState.currentUser);
  
  if (!guide) return;
  
  const guideRequests = appState.touristRequests.filter(
    req => req.guideId === guide.id && req.status === 'pending'
  );
  
  if (guideRequests.length === 0) {
    requestsDiv.innerHTML = '<p class="empty-message">No pending requests</p>';
    return;
  }
  
  requestsDiv.innerHTML = guideRequests.map(request => `
    <div class="request-card">
      <h3>${request.tourName}</h3>
      <div class="request-info">
        <p>👤 Tourist: ${request.touristEmail}</p>
        <p>📅 Requested: ${request.timestamp}</p>
      </div>
      <div class="request-actions">
        <button onclick="respondToRequest('${request.id}', 'accepted')" class="btn btn-success">
          ✓ Accept
        </button>
        <button onclick="respondToRequest('${request.id}', 'rejected')" class="btn btn-danger">
          ✗ Reject
        </button>
      </div>
    </div>
  `).join('');
}

function respondToRequest(requestId, status) {
  const request = appState.touristRequests.find(r => r.id === requestId);
  if (!request) return;
  
  request.status = status;
  
  // Update in touristInterests as well
  const interest = appState.touristInterests.find(i => i.id === requestId);
  if (interest) {
    interest.status = status;
  }
  
  if (status === 'accepted') {
    appState.bookedTours.push({
      tourName: request.tourName,
      tourist: request.touristEmail,
      timestamp: new Date().toLocaleString('en-IN')
    });
    appState.statistics.bookedTours++;
    addActivity(`Tour booking confirmed: ${request.tourName}`);
  }
  
  addActivity(`Guide ${status} tourist request for ${request.tourName}`);
  updateStatistics();
  renderTouristRequests();
}

// Admin Dashboard
function showAdminDashboard() {
  document.getElementById('adminDashboard').classList.add('active');
  switchAdminTab('statistics');
  updateStatistics();
}

function switchAdminTab(tab) {
  // Remove active class from all tabs and contents
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  // Add active class to selected tab
  event?.target?.classList.add('active');
  
  if (tab === 'statistics') {
    document.getElementById('statisticsTab').classList.add('active');
    document.querySelector('.tab-btn:nth-child(1)').classList.add('active');
    renderStatistics();
  } else if (tab === 'guides') {
    document.getElementById('guidesTab').classList.add('active');
    document.querySelector('.tab-btn:nth-child(2)').classList.add('active');
    renderGuideApprovals();
  } else if (tab === 'tours') {
    document.getElementById('toursTab').classList.add('active');
    document.querySelector('.tab-btn:nth-child(3)').classList.add('active');
    renderTourApprovals();
  }
}

function renderStatistics() {
  document.getElementById('activeUsers').textContent = 
    appState.statistics.activeGuides + appState.statistics.activeTourists;
  document.getElementById('activeTourists').textContent = appState.statistics.activeTourists;
  document.getElementById('bookedTours').textContent = appState.statistics.bookedTours;
  document.getElementById('activeGuides').textContent = appState.statistics.activeGuides;
  
  const activityDiv = document.getElementById('recentActivity');
  
  if (appState.recentActivity.length === 0) {
    activityDiv.innerHTML = '<p class="empty-message">No recent activity</p>';
    return;
  }
  
  activityDiv.innerHTML = appState.recentActivity.slice(-10).reverse().map(activity => `
    <div class="activity-item">
      <div class="activity-time">${activity.timestamp}</div>
      <div class="activity-text">${activity.text}</div>
    </div>
  `).join('');
}

function renderGuideApprovals() {
  const approvalsDiv = document.getElementById('guideApprovals');
  
  if (appState.pendingGuides.length === 0) {
    approvalsDiv.innerHTML = '<p class="empty-message">No pending guide approvals</p>';
    return;
  }
  
  approvalsDiv.innerHTML = appState.pendingGuides.map(guide => `
    <div class="approval-card">
      <div class="approval-header">
        <h3>${guide.name}</h3>
        <span class="tour-status status-pending">Pending</span>
      </div>
      <div class="approval-body">
        <div class="approval-row">
          <span class="approval-label">Email:</span>
          <span class="approval-value">${guide.email}</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Phone:</span>
          <span class="approval-value">${guide.phone}</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Experience:</span>
          <span class="approval-value">${guide.experience} years</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Location:</span>
          <span class="approval-value">${guide.location}</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Languages:</span>
          <span class="approval-value">${guide.languages.join(', ')}</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Specialization:</span>
          <span class="approval-value">${guide.specialization}</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Bio:</span>
          <span class="approval-value">${guide.bio}</span>
        </div>
      </div>
      <div class="approval-actions">
        <button onclick="approveGuide('${guide.id}')" class="btn btn-success">
          ✓ Approve Profile
        </button>
        <button onclick="rejectGuide('${guide.id}')" class="btn btn-danger">
          ✗ Reject Profile
        </button>
      </div>
    </div>
  `).join('');
}

function approveGuide(guideId) {
  const guideIndex = appState.pendingGuides.findIndex(g => g.id === guideId);
  if (guideIndex === -1) return;
  
  const guide = appState.pendingGuides[guideIndex];
  guide.approved = true;
  
  appState.guides.push(guide);
  appState.pendingGuides.splice(guideIndex, 1);
  
  addActivity(`Guide profile approved: ${guide.name}`);
  renderGuideApprovals();
  updateStatistics();
}

function rejectGuide(guideId) {
  const guideIndex = appState.pendingGuides.findIndex(g => g.id === guideId);
  if (guideIndex === -1) return;
  
  const guide = appState.pendingGuides[guideIndex];
  appState.pendingGuides.splice(guideIndex, 1);
  
  addActivity(`Guide profile rejected: ${guide.name}`);
  renderGuideApprovals();
}

function renderTourApprovals() {
  const approvalsDiv = document.getElementById('tourApprovals');
  
  if (appState.pendingTours.length === 0) {
    approvalsDiv.innerHTML = '<p class="empty-message">No pending tour approvals</p>';
    return;
  }
  
  approvalsDiv.innerHTML = appState.pendingTours.map(tour => `
    <div class="approval-card">
      <div class="approval-header">
        <h3>${tour.name}</h3>
        <span class="tour-status status-pending">Pending</span>
      </div>
      <div class="approval-body">
        <div class="approval-row">
          <span class="approval-label">Destination:</span>
          <span class="approval-value">${tour.destination}</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Duration:</span>
          <span class="approval-value">${tour.duration}</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Price:</span>
          <span class="approval-value">₹${tour.price.toLocaleString('en-IN')}</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Group Size:</span>
          <span class="approval-value">${tour.groupSize} people</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Difficulty:</span>
          <span class="approval-value">${tour.difficulty}</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Guide:</span>
          <span class="approval-value">${tour.guideName}</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Description:</span>
          <span class="approval-value">${tour.description}</span>
        </div>
        <div class="approval-row">
          <span class="approval-label">Itinerary:</span>
          <span class="approval-value" style="white-space: pre-line;">${tour.itinerary}</span>
        </div>
      </div>
      <div class="approval-actions">
        <button onclick="approveTour('${tour.id}')" class="btn btn-success">
          ✓ Approve Tour
        </button>
        <button onclick="rejectTour('${tour.id}')" class="btn btn-danger">
          ✗ Reject Tour
        </button>
      </div>
    </div>
  `).join('');
}

function approveTour(tourId) {
  const tourIndex = appState.pendingTours.findIndex(t => t.id === tourId);
  if (tourIndex === -1) return;
  
  const tour = appState.pendingTours[tourIndex];
  tour.approved = true;
  
  appState.tours.push(tour);
  appState.pendingTours.splice(tourIndex, 1);
  
  addActivity(`Tour approved: ${tour.name}`);
  renderTourApprovals();
  updateStatistics();
}

function rejectTour(tourId) {
  const tourIndex = appState.pendingTours.findIndex(t => t.id === tourId);
  if (tourIndex === -1) return;
  
  const tour = appState.pendingTours[tourIndex];
  appState.pendingTours.splice(tourIndex, 1);
  
  addActivity(`Tour rejected: ${tour.name}`);
  renderTourApprovals();
}

// Utility Functions
function updateStatistics() {
  appState.statistics.activeUsers = appState.statistics.activeGuides + appState.statistics.activeTourists;
  
  if (appState.currentRole === 'admin') {
    renderStatistics();
  }
}

function addActivity(text) {
  appState.recentActivity.push({
    timestamp: new Date().toLocaleString('en-IN'),
    text: text
  });
}

function closeModal() {
  document.getElementById('tourModal').classList.remove('active');
}