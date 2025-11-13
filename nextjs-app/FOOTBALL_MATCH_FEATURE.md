# Football Match Booking Feature

## Overview
An interactive web UI for joining football matches, inspired by cinema seat booking systems but designed for a football stadium.

## How It Works

### 1. Accessing the Feature
- Click on the **Football** card in the Sports Section
- A full-screen modal opens with the match booking interface

### 2. Layout

#### Left Side - Football Stadium View
- **Interactive pitch visualization** with realistic football field markings
- **22 player positions** arranged in 4-3-3 formation (11 vs 11)
- **Visual elements:**
  - White pitch markings (penalty areas, center circle, corners)
  - Green grass background gradient
  - Team labels (Home Team / Away Team)

#### Right Side - Player List
- **Stats panel** showing booked vs. available positions
- **Categorized player lists:**
  - Home Team (Navy blue) - 11 players
  - Away Team (Orange) - 11 players
- Each player entry shows:
  - Avatar icon
  - Player name (Player 1-22)
  - Team affiliation
  - Join button with "+" icon

### 3. Booking Interaction

#### To Book a Position:
1. Find a player in the right-side list
2. Click the **"+ Join"** button
3. The player position becomes filled on the pitch
4. The button changes to **"✓ Booked"** (disabled state)
5. The pitch position shows a filled circle with player icon

#### To Unbook a Position:
1. Click on a booked position directly on the pitch
2. The position becomes available again
3. The player's "Join" button re-enables

### 4. Visual Feedback

#### Available Positions (Pitch):
- Semi-transparent white circles
- White border
- Hover: brighter appearance and scale up

#### Booked Positions (Pitch):
- Home Team: Navy blue filled circle
- Away Team: Orange filled circle
- Player icon visible inside
- White border
- Click to remove booking

#### Player List States:
- **Available**: Colored background (navy/orange tint), "+ Join" button enabled
- **Booked**: Gray background, "✓ Booked" button disabled

### 5. Additional Features
- **Reset All** button to clear all bookings
- **Match information** display (Date, Time, Location)
- **Hover tooltips** on pitch positions showing role (GK, CB, ST, etc.)
- **Responsive design** works on desktop and mobile
- **Smooth animations** for all interactions

## Technical Details

### Components Created
1. **FootballPitch** (`components/football-pitch.tsx`)
   - SVG-based pitch rendering
   - 22 positioned player slots
   - Click handlers for position management

2. **PlayerList** (`components/player-list.tsx`)
   - Categorized player display
   - Join/Booked button states
   - Stats panel

3. **FootballMatchModal** (`components/football-match-modal.tsx`)
   - Main container component
   - State management for bookings
   - Modal overlay and close functionality

### Color Scheme
- **Primary Navy**: #2C4A6E (Home Team)
- **Primary Blue**: #4A7BA7 (Hover states)
- **Accent Orange**: #E67E22 (Away Team)
- **Green Pitch**: Gradient from green-600 to green-700

### State Management
- Uses React `useState` for booking state
- Array of booked position IDs (1-22)
- Simple add/remove operations

## User Experience Highlights
- ✅ Clear visual distinction between teams
- ✅ Intuitive booking similar to seat selection
- ✅ Easy undo by clicking pitch positions
- ✅ Real-time feedback on availability
- ✅ Professional stadium visualization
- ✅ Mobile-responsive layout
- ✅ Smooth animations and transitions
- ✅ Accessible with clear labels and states

## Future Enhancements
- User authentication and profile integration
- Real-time synchronization across users
- Payment integration
- Match schedule calendar
- Player ratings and history
- Team chat functionality
- Position preferences
- Skill level matching
