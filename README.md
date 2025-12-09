# @usestreamline/auth

Basic authentication and request utilities used by Streamline services.

This package is designed for cookie-based authentication with strict, mandatory CSRF enforcement.

---

## Installation

```sh
npm install @usestreamline/auth
```

---

## Security Requirements (Required Reading)

All protected endpoints **require**:

- An authenticated session using HTTP-only cookies
- A valid CSRF token included with every state-changing request

Requests missing a CSRF token will be rejected.

This behavior is intentional and exists to prevent cross-site request forgery attacks.

---

## Authentication Model

This library assumes a browser-based authentication flow where:

- Authentication is handled via HTTP-only cookies
- Cookies are automatically sent with each request
- The client is responsible for providing a CSRF token

Expected cookies:

- accessToken
- refreshToken

---

## CSRF Protection

Because cookies are sent automatically by browsers, this library enforces CSRF protection on all authenticated endpoints.

### When a CSRF Token Is Required

A CSRF token **must** be included for all state-changing HTTP methods, including:

- POST
- PUT
- PATCH
- DELETE

Requests using these methods without a valid CSRF token will fail.

---

## Required Header

```http
X-CSRF-Token: <csrf-token>
```

The CSRF token must be obtained from a trusted, same-origin source such as an initial HTML render, bootstrap payload, or dedicated endpoint, and attached to each request manually.

---

## Example Usage

```ts
import { authFetch } from '@usestreamline/auth';

await authFetch('/v1/portfolio', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify({
    name: 'My Portfolio'
  })
});
```

---

## Intended Usage

This package is intended for browser-based clients interacting with Streamline-backed APIs.

Server-to-server usage is not recommended unless CSRF enforcement is explicitly handled.

---

## What This Library Enforces

- Cookie-based authentication
- Mandatory CSRF validation
- Explicit client responsibility for CSRF tokens

---

## What This Library Does Not Do

- Automatically inject CSRF tokens
- Read CSRF tokens from cookies
- Allow unauthenticated or token-less state changes

---

## License

MIT
