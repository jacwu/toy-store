# Toy Store Application Requirements

Version: 1.0 (Current Prototype State)
Last Updated: 2025-10-12
Status: Implemented Feature Set (Unimplemented / future items removed per cleanup)

## 1. Purpose
This document defines the functional and non-functional requirements of the Toy Store prototype. It reflects the current in-memory implementation and serves as a foundation for future hardening (persistence, authentication security, order processing).

## 2. Scope
The application is a simplified e-commerce experience focused on browsing toys, basic user account handling, managing a client-side shopping cart, and displaying placeholder order data. No real payment, inventory, or secure authentication is implemented yet.

## 3. Stakeholders
- End User / Shopper – browses and adds toys to a cart.
- Authenticated User – registers/logs in to personalize experience (prototype only).
- Developer / Maintainer – extends features, replaces in-memory layers with persistent services.
- QA / Tester – validates core flows (unit + Playwright end-to-end tests).

## 4. Definitions & Glossary
| Term | Definition |
|------|------------|
| Toy | A product item with descriptive and pricing metadata. |
| Toy Type | Category grouping of toys (e.g., Educational, Remote Control). |
| Cart | Client-maintained list of toy selections and quantities. |
| Order (Mock) | Non-persistent representation of a checkout result (prototype). |
| In-Memory Repository | Data structure stored in process RAM; reset on restart. |
| Context (Frontend) | React Context provider for shared state (Auth, Cart, Orders). |

## 5. User Roles
| Role | Description | Permissions |
|------|-------------|-------------|
| Anonymous User | Not logged in. | Browse catalog, filter, view details, add to cart (local), view cart. |
| Registered User | Logged in (prototype session). | All anonymous actions + view mock orders page. |
| System (Internal) | Services & repositories. | Manage data transformations and retrieval. |

## 6. Assumptions
- Single currency (no multi-currency formatting logic yet).
- Prices are static and tax-inclusive (no tax rules applied).
- Cart state is not persisted across browser sessions unless the page remains open (no localStorage persistence assumed unless implemented elsewhere).
- Unique identification handled by incremental numeric IDs in-memory.
- No concurrency or race condition handling required at current scale.

## 7. Functional Requirements
### 7.1 Catalog & Toy Browsing
| ID | Requirement | Priority |
|----|-------------|----------|
| CAT-01 | System shall list all toys with name, type, price, short description, image (if available), and the date when the toy was added into the shop. | High |
| CAT-02 | User shall view an individual toy detail page including extended description. | High |
| CAT-03 | User shall filter toys by toy type. | High |

### 7.2 Forum
| ID | Requirement | Priority |
|----|-------------|----------|
| FRM-01 | System shall provide a forum page where registered users can publish (post) their shopping experiences / toy reviews. | Medium |
| FRM-02 | Forum posts shall include at minimum: id, author (username), createdAt, title (optional), content (experience text), and optional references to toy ids. | Medium |
| FRM-03 | Anonymous users shall be able to read forum posts but not create them. | Medium |
| FRM-04 | Registered users shall be able to create, edit (their own), and delete (their own) posts in the forum. | Low |
| FRM-05 | System shall display forum posts in reverse chronological order (newest first). | Low |

> Note: Forum feature captured here as a planned enhancement (added 2025-10-12); implementation tracking is intentionally excluded from this requirements-focused document.

### 7.3 Toy Types
| ID | Requirement | Priority |
|----|-------------|----------|
| TTYPE-01 | System shall provide a list of all toy types. | High |
| TTYPE-02 | Toy records shall reference a toy type by ID. | High |

### 7.4 User Registration & Authentication (Prototype)
| ID | Requirement | Priority |
|----|-------------|----------|
| AUTH-01 | User shall register with username + password. | High |
| AUTH-02 | User shall login with username + password. | High |
| AUTH-03 | System shall return user object on successful login. | High |
| AUTH-04 | System shall not hash passwords (prototype constraint). | High |

### 7.5 Shopping Cart
| ID | Requirement | Priority |
|----|-------------|----------|
| CART-01 | User shall add a toy to the cart. | High |
| CART-02 | User shall remove a toy from the cart. | High |
| CART-03 | User shall update quantity of a toy in the cart. | High |
| CART-04 | System shall display current cart contents. | High |
| CART-05 | Cart shall be maintained client-side only. | High |

### 7.6 Orders
| ID | Requirement | Priority |
|----|-------------|----------|
| ORD-01 | User (logged in) shall view a list of past orders. | Medium |

### 7.7 Navigation & Layout
| ID | Requirement | Priority |
|----|-------------|----------|
| NAV-01 | System shall provide a global navigation bar. | High |
| NAV-02 | Navbar shall link to Home, Cart, Login/Register, Orders, About. | High |
| NAV-03 | Navbar should reflect authentication state (e.g., show user or logout). | Medium |

### 7.8 Performance & Feedback
| ID | Requirement | Priority |
|----|-------------|----------|
| PERF-01 | System should show a loading indicator during async operations. | Medium |
| PERF-02 | System should handle small catalog (<500 items) without pagination. | Medium |

### 7.9 Error Handling
| ID | Requirement | Priority |
|----|-------------|----------|
| ERR-01 | Backend shall centralize error responses via middleware. | High |
| ERR-02 | Validation errors shall produce structured error output. | High |
| ERR-03 | System should differentiate validation vs system errors with status codes. | Medium |

### 7.10 Testing
| ID | Requirement | Priority |
|----|-------------|----------|
| TEST-01 | System shall include unit tests for user service. | High |
| TEST-02 | System shall include unit tests for user controller. | High |
| TEST-03 | System shall include an end-to-end test for adding a toy to the cart. | High |
| TEST-04 | System should expand service test coverage (toys, cart logic once backendified). | Medium |

### 7.11 Internationalization (i18n)
Removed at this stage (no implemented i18n features retained in scope summary).

### 7.12 Accessibility
Basic semantic structure and some alt text present; formal accessibility tracking removed in this trimmed version.

### 7.13 Security (Prototype Constraints)
Password logging avoided. Other hardening items omitted in this implemented-only extract.

## 8. Non-Functional Summary (Implemented)
Technology: TypeScript across stack.
Architecture: Layered (controllers → services → repositories).
Maintainability: Clear separation & typed interfaces.
Performance: Adequate for small catalog (<500 toys).
Scalability: Repository abstraction enables future persistence.
Reliability: In-memory reset on restart (accepted prototype limitation).
Observability: Basic request logging.
Testability: Unit (user service/controller) + E2E (add-to-cart).
UX: Responsive browsing, cart interactions.

## 9. Constraints
In-memory only persistence; no external auth or payment integration; local development focus.


## 10. Acceptance Criteria (Representative Examples)
- CAT-01: When requesting the catalog endpoint, response contains an array with required toy fields (id, name, price, toyTypeId, descriptions).
- AUTH-01: Posting valid new username/password returns 201 (or 200) with created user excluding password echo (future).
- CART-01: Adding same toy twice increments its quantity client-side.
- ERR-01: Throwing a service-level error returns structured JSON handled by `errorHandler` middleware.
- TEST-03: Playwright test passes demonstrating add-to-cart scenario.

## 11. Traceability Matrix (Trimmed)
Feature to requirement mapping for implemented items retained informally; removed matrix rows for unimplemented features as part of cleanup.
