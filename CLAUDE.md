# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page website for "Sport Aktivitäten Amman" - a sports activities community in Amman, Jordan. The site is written in German and promotes group sports activities and private kickboxing lessons.

## Architecture

**Single-file application**: The entire website is contained in `index.html` with embedded CSS and JavaScript. There is no build process or external dependencies.

**Structure**:
- **HTML**: Semantic sections for hero, sports offerings, private lessons, about, location, and contact
- **CSS**: Embedded in `<style>` tag (lines 7-305) with gradient-based design system using primary colors #667eea (blue-purple) and #764ba2 (purple)
- **JavaScript**: Embedded in `<script>` tag (lines 490-526) handling smooth scrolling and scroll-based animations

## Key Components

### Navigation
The header (lines 309-319) contains navigation links that smooth-scroll to page sections using anchor links.

### Sports Grid
Sports are displayed using CSS Grid (`.sports-grid` class, lines 103-108) with responsive auto-fit columns. Each sport card includes an emoji icon, title, description, and tags.

### Animation System
The IntersectionObserver API (lines 506-525) animates sport cards on scroll with fade-in and slide-up effects.

## Development

**Local testing**: Simply open `index.html` in a browser - no server required for basic viewing.

**Testing smooth scroll**: Click navigation links to verify smooth scrolling behavior works across different browsers.

**Responsive testing**: The site has a mobile breakpoint at 768px (lines 291-304). Test navigation collapse and single-column grid layout on mobile viewports.

## Content Language

All user-facing content is in German. When making content changes:
- Maintain German language consistency
- Keep informal "du" form used throughout
- Sports terminology uses standard German terms (Fußball, Volleyball, Kickboxing, etc.)
