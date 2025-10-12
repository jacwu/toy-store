# Toy Store Application Design

## 1. Introduction
The Toy Store application is a full-stack e-commerce prototype for browsing toys, managing user accounts, handling shopping carts, and simulating order management. It is organized as a monorepo-style project with a `frontend` (Next.js 14 + TypeScript) and a `backend` (Express + TypeScript). The system emphasizes clean separation of concerns through layered architecture (controllers → services → repositories) on the backend and context-driven state management on the frontend.

Primary goals (current prototype scope):
- Provide a responsive toy browsing experience.
- Maintain clear modular boundaries through layered architecture (currently in-memory; note replaceability without outlining a roadmap).
- Support implemented user flows: browse, filter, view detail, register/login (prototype), add to cart, view mock order list.

This document describes only the current implemented state; it is not a roadmap (statement appears only here to avoid redundancy).

## 2. Implemented Scope Overview
Implemented scope: catalog listing & filtering, toy detail view, user registration/login (in-memory), cart add/remove/update, mock order listing, global navigation.
Technical characteristics: Full-stack TypeScript, layered backend, React Context state management, basic logging, unit + E2E tests.
Prototype constraints: in-memory data only, plain-text passwords (no hashing), no token/session, no payment module.

## 3. Components
### 3.1 Frontend Components
Pages (Next.js App Router):
  - `page.tsx`: Home / catalog overview.
  - `toys/[id]/page.tsx`: Toy detail view.
  - `cart/page.tsx`: Shopping cart UI.
  - `login/page.tsx`, `register/page.tsx`: Auth flows.
  - `orders/page.tsx`: Placeholder orders list (mock read-only).
  - `about/page.tsx`: Informational page.

UI Components:
  - `Navbar.tsx`: Global navigation bar
  - `ToyCard.tsx`: Displays toy summary.
  - `ToyFilter.tsx`: Filtering control by toy type (terminology unified: "toy type").
  - `Loading.tsx`: Generic loading feedback.

Context Providers:
  - `AuthContext.tsx`: Manages current user session state.
  - `CartContext.tsx`: Holds cart items, add/remove/update quantity logic.
  - `OrderContext.tsx`: Provides mock order history.

API Layer:
  - `lib/api.ts`: Axios instance wrapper + typed calls (transport abstraction; no additional requirements beyond facilitating listed endpoints).

Types:
  - `types/index.ts`: Shared TS interfaces for frontend models (alignment with backend domain; mirrors requirements data fields such as toy descriptions and pricing).

### 3.2 Backend Components
Entry Point:
  - `backend/src/index.ts`: Express app setup, middleware binding, route mounting.

Controllers (map HTTP to services):
  - `toyController.ts`: List & retrieve toys — demo only; no inventory logic.
  - `toyTypeController.ts`: Toy type listing.
  - `userController.ts`: Registration & login.

Services (business logic):
  - `memoryToyService.ts`: Toy filtering & aggregation.
  - `memoryToyTypeService.ts`: Toy type retrieval.
  - `userService.ts`: User creation / authentication (plain-text password prototype constraint).

Repositories (in-memory prototype):
  - `memoryToyRepository.ts` / `memoryToyTypeRepository.ts` / `memoryUserRepository.ts`.

Middleware:
  - `requestLogger.ts`: Basic observability (supports non-functional logging).
  - `errorHandler.ts`: Central error JSON (ERR-01, ERR-02; ERR-03 partial).

Validators:
  - `toyValidator.ts`, `toyTypeValidator.ts`: Structural validation (ERR-02 alignment).

Types:
  - `types/toy.ts`, `types/toyType.ts`, `types/user.ts`: Domain contracts.

Routes:
  - `toyRoutes.ts`, `toyTypeRoutes.ts`, `userRoutes.ts`: Map resource paths to controllers.

### 3.3 Testing Assets
Unit Tests:
  - `userService.test.ts`, `userController.test.ts`.
End-to-End:
  - `user-story-add-toy.spec.ts` (add-to-cart flow).
User Story Doc:
  - `user-stories/add-toy.md`.
Pending (Not Implemented):
  - Expanded toy/cart service coverage.

### 3.4 Cross-Cutting Concerns 
- Error Handling: Central middleware unifies JSON structure (limited granularity currently).
- Logging: Basic request logging.
- Typing: Domain model interfaces in backend and frontend `types` directories.
- State Management: React Context (Auth / Cart / Orders).

### 3.5 Roles & Access
Role mapping mirrors `requirements.md` §5.
  - Anonymous: browse catalog, filter, view details, manage cart.
  - Registered: all anonymous actions plus view mock orders (ORD-01 mock read-only).
  - Internal (services): data orchestration (in-memory prototype only).

## 4. Architecture
### 4.1 Overview
The system uses a conventional layered backend and a component + context-driven frontend. Communication occurs over RESTful JSON endpoints (no GraphQL or websockets currently). The backend is stateless (no sessions persisted) and relies on in-memory structures. The frontend manages user identity purely client-side after a successful login response.

Simplified high-level diagram:
```
[User Browser]
    | (HTTP via Axios)
[Next.js Frontend Pages & Components]
    | (API abstraction: api.ts)
[Express Controllers]
    | (invoke)
[Services]
    | (delegate)
[Repositories (In-Memory Arrays)]
```

### 4.2 Backend Layer Responsibilities
- Controller Layer: Translate HTTP to domain operations; parse params/body, call services, map results to HTTP responses and status codes.
- Service Layer: Encapsulate business rules (validation orchestration, filtering, combination of repository calls). Provides a stable API surface to controllers; prepares for future persistence changes.
- Repository Layer: Data CRUD over in-memory collections. Future replacement candidate for a database implementation (e.g., PostgreSQL, MongoDB, or Prisma ORM adapter).

### 4.3 Frontend Layer Responsibilities
- Pages: Route-level composition; fetch data on render (server or client depending on implementation strategy) and provide layout boundaries.
- Components: Pure visual or interactive building blocks reusable across pages.
- Contexts: Global shared state and side-effect orchestration (e.g., login mutates AuthContext; cart modifications update derived totals).
- API Library: Central point for Axios configuration (base URL, interceptors for auth, future error normalization).

### 4.4 Data Models (Conceptual – current contract)
- Toy: `{ id, name, toyTypeId, description, detailDescription, price, imageUrl? }`
- ToyType: `{ id, name, description?, icon? }`
- User: `{ id, username, password }` (plain text in-memory prototype)
- CartItem (frontend only): `{ toyId, quantity }`
- Order (mock): `{ id, userId, items[], createdAt }` (non-persistent)

Note:
  - `description` is for list/summary; `detailDescription` is for the detail page.
  - The term "descriptions" in `requirements.md` §10 (acceptance criteria) maps to the pair (`description`, `detailDescription`).
  - Optional nested `toyType` is a convenience projection (not guaranteed).
  - `icon` is an optional UI display attribute, not a required field.

### 4.4.1 Concrete Backend Type Definitions
The following reflect the current TypeScript interfaces in `backend/src/types/` (in-memory implementation). These should be treated as the source of truth for API payload design until a formal OpenAPI/JSON Schema spec is added.

```ts
// toy.ts
export interface Toy {
  id: number;
  name: string;
  description: string;
  detailDescription: string;
  price: number;
  toyTypeId: number;
  toyType?: {
    id: number;
    name: string;
    description: string;
    icon?: string;
  };
}

export interface CreateToyRequest {
  name: string;
  description: string;
  detailDescription: string;
  price: number;
  toyTypeId: number;
}

export interface UpdateToyRequest {
  name?: string;
  description?: string;
  detailDescription?: string;
  price?: number;
  toyTypeId?: number;
}

// toyType.ts
export interface ToyType {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

export interface CreateToyTypeRequest {
  name: string;
  description: string;
  icon?: string;
}

export interface UpdateToyTypeRequest {
  name?: string;
  description?: string;
  icon?: string;
}

// user.ts
export interface User {
  id: number;
  username: string;
  password: string; // NOTE: plain text in-memory; MUST be hashed when persistence/auth is hardened
}
```

Key Notes:
- `detailDescription` extends `description` for detail page rendering.
- Optional embedded `toyType` object is a convenience projection.
- Request vs Update interfaces separate required vs partial fields.
- Plain-text password storage is a known prototype limitation.

### 4.5 Error & Validation Flow (current behavior)
1. Request reaches controller.
2. Controller invokes validator (if present) for structural checks.
3. Service executes business logic and may throw typed errors.
4. Error middleware normalizes JSON. Currently only basic distinction between validation and generic system errors (ERR-03 partial; no fine-grained codes yet).

### 4.6 Security (current prototype)
Prototype constraints (aligned with `requirements.md` non-functional summary): plain-text passwords (no hashing/salting), no token/session mechanism, no fine-grained authorization. These are accepted limitations of the in-memory prototype.

### 4.7 Layer Substitution Note
Layering (Controller → Service → Repository) permits a future persistence replacement without altering higher layers (descriptive only; not a roadmap commitment).

## 5. Workflows (implemented behavior only)
### 5.1 User Registration
1. Submit registration form.
2. Call `POST /users/register`.
3. Controller validates and delegates to service.
4. Service checks uniqueness.
5. Writes to memory and returns user object (password stored only in memory).
6. Frontend updates AuthContext.

### 5.2 User Login
1. User submits credentials.
2. Call `POST /users/login`.
3. Service validates username/password.
4. Returns user object; frontend stores in AuthContext (no token mechanism).
5. Orders page conditionally renders based on presence of user object.

### 5.3 Browse & Filter Toys
1. Home requests `GET /toys`.
2. Filtering: if full dataset cached client-side, filter locally; otherwise may request by type parameter (implementation dependent).
3. Render with `ToyCard` components.

### 5.4 View Toy Details
1. Visit `/toys/[id]` → `GET /toys/:id`.
2. Returns `detailDescription` and optional nested `toyType`.
3. Page offers add-to-cart action.

### 5.5 Add Item to Cart
1. User clicks add.
2. If item exists increment quantity; else insert new.
3. Cart (and badge) re-renders.
4. Client memory only (no persistence).

### 5.6 View Cart & Adjust Quantities
1. `/cart` reads CartContext.
2. Quantity adjustments/removals update state; any total shown is client-calculated (not a mandated requirement field).

### 5.7 Orders (mock display)
Displays in-memory mock order list only (ORD-01); no order creation flow, no new records added.

### 5.8 End-to-End Test Flow (Add Toy)
1. Navigate to catalog.
2. Add toy to cart.
3. Assert cart reflects addition.
4. Serves as regression guard for core add-to-cart interaction.

## 6. (Section Removed)
Future / unimplemented items intentionally omitted per request.

## 7. Limitations (consolidated)
- In-memory data: lost on restart.
- Plain-text passwords; no token.
- Orders: mock display only.
- Error classification granularity limited (ERR-03 partial).

## 7.1 (Section Removed)
Traceability matrix removed per request to drop explicit requirement markers.
## 8. Summary
Aligned with `requirements.md`: describes only currently implemented functionality and structure; contains no future expansion commitments.
