# Requirements Document

## Introduction

This document specifies the requirements for restructuring the Olyth SaaS website to improve navigation, consolidate the homepage experience, and update the pricing model to reflect a modern 3-tier SaaS structure with an additional platform access add-on. The restructure aims to create a clearer user journey from discovery through conversion while maintaining the existing React/TypeScript/Tailwind CSS technology stack.

## Glossary

- **Website**: The Olyth SaaS marketing and product information website
- **Navigation_Component**: The top navigation bar component that provides site-wide navigation
- **Router**: React Router v6 routing system managing page navigation
- **Product_Page**: The primary landing page showcasing the Olyth platform (replaces Home page)
- **Resources_Hub**: A centralized page linking to secondary resources (About, Careers, Help Center, etc.)
- **Pricing_Component**: The pricing page component displaying subscription tiers
- **Pricing_Toggle**: UI control for switching between monthly and annual billing display
- **Plan_Card**: Individual pricing tier display component
- **Free_Trial**: 14-day trial period with no credit card requirement
- **Annual_Discount**: 10% price reduction applied to annual billing
- **Thal_Platform_Access**: Standalone add-on subscription for advanced AI features ($25/month)
- **Enterprise_CTA**: Call-to-action button linking to Calendly for Enterprise plan inquiries

## Requirements

### Requirement 1: Primary Navigation Structure

**User Story:** As a website visitor, I want to access 8 primary pages through clear navigation, so that I can find information about Olyth's products and services.

#### Acceptance Criteria

1. THE Navigation_Component SHALL display exactly 8 primary navigation items: Product, Features, Pricing, Resources, Sign In, Try For Free, Contact Us, and View Demo
2. WHEN a user clicks the Product navigation item, THE Router SHALL navigate to the Product_Page at the root path "/"
3. WHEN a user clicks Features, Pricing, Contact Us, or Sign In, THE Router SHALL navigate to the corresponding page route
4. WHEN a user clicks Try For Free, THE Router SHALL navigate to the waitlist page
5. WHEN a user clicks View Demo, THE Router SHALL navigate to a demo request page or modal
6. THE Navigation_Component SHALL maintain consistent styling with existing Tailwind CSS design system

### Requirement 2: Product Page as Homepage

**User Story:** As a website visitor, I want the Product page to serve as the homepage, so that I immediately see Olyth's core value proposition when I visit the site.

#### Acceptance Criteria

1. THE Router SHALL map the root path "/" to the Product_Page component
2. THE Product_Page SHALL display all existing homepage sections: HeroSection, PlatformOverviewSection, MeetThalSection, ProcessSection, ImpactStatsSection, TestimonialsSection, PricingPreviewSection, ComparisonTableSection, and CTAWaveSection
3. THE Navigation_Component SHALL highlight the Product navigation item when the current route is "/"
4. WHEN a user navigates to the root domain, THE Website SHALL render the Product_Page without redirects

### Requirement 3: Resources Hub Page

**User Story:** As a website visitor, I want to access secondary resources from a centralized hub, so that I can find company information, support documentation, and legal policies.

#### Acceptance Criteria

1. THE Router SHALL provide a route "/resources" that renders the Resources_Hub page
2. THE Resources_Hub SHALL display navigation links to: About Us, Careers, Help Center, Status, Changelog, Privacy Policy, and Terms & Conditions
3. WHEN a user clicks a resource link, THE Router SHALL navigate to the corresponding resource page
4. THE Resources_Hub SHALL use consistent card-based or list-based layout matching the existing design system
5. THE Navigation_Component SHALL highlight the Resources navigation item when the current route starts with "/resources"

### Requirement 4: Three-Tier Pricing Structure

**User Story:** As a potential customer, I want to see three clear pricing tiers with distinct features, so that I can choose the plan that fits my team's needs.

#### Acceptance Criteria

1. THE Pricing_Component SHALL display exactly 3 pricing tiers: Basic, Professional, and Enterprise
2. THE Basic Plan_Card SHALL display a price of $19/month with features: shared inbox, ticket management, knowledge base, email support, and basic reporting
3. THE Professional Plan_Card SHALL display a price of $39/month with features: everything in Basic plus advanced automation, AI assistance, analytics, team collaboration, and API access
4. THE Professional Plan_Card SHALL display a "MOST POPULAR" badge
5. THE Enterprise Plan_Card SHALL display a price of $88/month with features: everything in Professional plus dedicated account manager, advanced security, custom integrations, priority support, and enterprise SLA
6. WHEN a user views the Pricing_Component, THE Website SHALL display all 3 Plan_Cards in a horizontal 3-column layout on desktop viewports
7. WHEN a user views the Pricing_Component on mobile viewports, THE Website SHALL stack Plan_Cards vertically

### Requirement 5: Pricing Billing Toggle

**User Story:** As a potential customer, I want to toggle between monthly and annual pricing, so that I can see the cost savings of annual billing.

#### Acceptance Criteria

1. THE Pricing_Component SHALL display a Pricing_Toggle control with two options: Monthly and Annual
2. WHEN a user clicks the Monthly option, THE Pricing_Component SHALL display monthly prices for all plans
3. WHEN a user clicks the Annual option, THE Pricing_Component SHALL display annual prices with a 10% discount applied to each tier
4. THE Pricing_Toggle SHALL visually indicate the currently selected billing period
5. WHEN Annual billing is selected, THE Plan_Card SHALL display the monthly equivalent price (e.g., "$35/month billed annually" for Professional)
6. THE Annual_Discount SHALL apply consistently across all three pricing tiers (Basic: $17/month, Professional: $35/month, Enterprise: $79/month when billed annually)

### Requirement 6: Free Trial Display

**User Story:** As a potential customer, I want to understand the free trial terms, so that I can try Olyth without financial commitment.

#### Acceptance Criteria

1. THE Pricing_Component SHALL display Free_Trial information stating "14-day free trial, no credit card required"
2. THE Free_Trial information SHALL be prominently visible above or within the pricing tier cards
3. WHEN a user clicks a "Try For Free" or "Start Free Trial" button on any Plan_Card, THE Router SHALL navigate to the waitlist page
4. THE Free_Trial information SHALL remain visible regardless of the Pricing_Toggle selection (monthly or annual)

### Requirement 7: Thal Platform Access Add-On

**User Story:** As a potential customer, I want to purchase standalone Thal Platform Access, so that I can use advanced AI features independently or in addition to my subscription.

#### Acceptance Criteria

1. THE Pricing_Component SHALL display a Thal_Platform_Access add-on section separate from the three main pricing tiers
2. THE Thal_Platform_Access section SHALL display a price of $25/month
3. THE Thal_Platform_Access section SHALL describe features: API actions, advanced RAG capabilities, and custom model training
4. THE Thal_Platform_Access section SHALL include a call-to-action button for purchasing or learning more
5. THE Thal_Platform_Access pricing SHALL remain constant regardless of the Pricing_Toggle selection (no annual discount)

### Requirement 8: Enterprise Sales Integration

**User Story:** As an enterprise prospect, I want to schedule a sales call directly from the pricing page, so that I can discuss custom requirements with the Olyth team.

#### Acceptance Criteria

1. THE Enterprise Plan_Card SHALL display an Enterprise_CTA button labeled "Talk To Sales"
2. WHEN a user clicks the Enterprise_CTA button, THE Website SHALL open a Calendly scheduling interface
3. THE Calendly integration SHALL open in a new browser tab or modal overlay
4. THE Enterprise_CTA button SHALL use distinct styling (e.g., secondary or outline variant) to differentiate from standard "Try For Free" buttons
5. THE Enterprise Plan_Card SHALL NOT include a "Try For Free" button

### Requirement 9: Route Migration and Cleanup

**User Story:** As a developer, I want to remove deprecated routes and components, so that the codebase remains maintainable and aligned with the new structure.

#### Acceptance Criteria

1. THE Router SHALL remove the "/home" route if it exists as a separate route from "/"
2. THE Website SHALL remove or archive the Home.tsx component if it is replaced by Product.tsx
3. WHEN a user navigates to a deprecated route, THE Router SHALL redirect to the appropriate new route or display a 404 page
4. THE Navigation_Component SHALL remove references to deprecated navigation items
5. THE Website SHALL maintain all existing page components that are not explicitly deprecated (Contact, SignIn, Waitlist)

### Requirement 10: Responsive Design Preservation

**User Story:** As a mobile user, I want the restructured website to work seamlessly on my device, so that I can access all features regardless of screen size.

#### Acceptance Criteria

1. THE Navigation_Component SHALL maintain responsive behavior with mobile hamburger menu for viewports below 1024px width
2. THE Pricing_Component SHALL stack Plan_Cards vertically on viewports below 768px width
3. THE Resources_Hub SHALL adapt layout for mobile viewports while maintaining readability
4. THE Product_Page SHALL preserve all existing responsive breakpoints and mobile optimizations
5. WHEN a user interacts with the Pricing_Toggle on mobile, THE Pricing_Component SHALL update prices without layout shifts or horizontal scrolling

### Requirement 11: Accessibility Compliance

**User Story:** As a user with assistive technology, I want to navigate the website using keyboard and screen readers, so that I can access all information and functionality.

#### Acceptance Criteria

1. THE Navigation_Component SHALL support keyboard navigation with Tab, Enter, and Escape keys
2. THE Pricing_Toggle SHALL be operable via keyboard with focus indicators
3. THE Plan_Card components SHALL include appropriate ARIA labels for pricing information and feature lists
4. THE Resources_Hub links SHALL include descriptive text or ARIA labels for screen reader users
5. WHEN a user navigates using keyboard only, THE Website SHALL provide visible focus indicators on all interactive elements

### Requirement 12: Performance and Loading

**User Story:** As a website visitor, I want pages to load quickly, so that I can access information without delays.

#### Acceptance Criteria

1. THE Product_Page SHALL load and render initial content within 2 seconds on standard broadband connections
2. THE Pricing_Component SHALL render all Plan_Cards without layout shifts during price calculations
3. THE Router SHALL implement code splitting for page components to reduce initial bundle size
4. THE Website SHALL lazy-load images and non-critical assets below the fold
5. WHEN a user navigates between pages, THE Router SHALL complete navigation transitions within 300ms
