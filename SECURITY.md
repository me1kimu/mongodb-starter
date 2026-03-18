# Security Policy

## Supported Versions

This project is actively maintained with security updates.

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Security Measures

### Addressed Vulnerabilities

This starter application has been hardened against the following security vulnerabilities:

#### 1. Authorization Bypass in Next.js Middleware
- **Status**: Mitigated
- **CVE**: GHSA-7gfc-8cq8-jh5f
- **Mitigation**:
  - Implemented Next.js middleware (`middleware.ts`) for request-level authorization
  - Added session validation before processing protected routes
  - Enhanced API route protection with proper session checks

#### 2. NextAuth.js Email Verification Vulnerabilities
- **Status**: Fixed
- **CVEs**: CVE-2022-39263, CVE-2022-35924
- **Details**: NextAuth.js before 4.10.3 and 3.29.10 could send verification requests (magic links) to unwanted emails
- **Fix**: Updated to next-auth@4.24.13

#### 3. Prototype Pollution in JSON5
- **Status**: Fixed
- **CVE**: CVE-2022-46175
- **Details**: JSON5 before 2.2.2 vulnerable to prototype pollution via Parse Method
- **Fix**: Updated to json5@2.2.3

#### 4. ReDoS in minimatch
- **Status**: Fixed
- **CVE**: CVE-2022-3517
- **Details**: minimatch had a ReDoS via repeated wildcards with non-matching literal in pattern
- **Fix**: Updated to minimatch@3.1.5

#### 5. SSRF in ip Package
- **Status**: Not Applicable
- **Details**: The `ip` package is not used in this project, so the SSRF vulnerability does not affect this codebase

#### 6. OAuth Security Checks
- **Status**: Implemented
- **Details**: Missing proper state, nonce and PKCE checks for OAuth authentication
- **Fix**:
  - NextAuth.js 4.24.13 handles state parameter validation automatically
  - Database session strategy ensures session integrity
  - Secure cookie configuration with httpOnly, sameSite, and secure flags

### Security Features

#### Authentication
- GitHub OAuth integration with NextAuth.js
- Database-backed session management
- Secure cookie configuration:
  - `httpOnly`: Prevents XSS attacks from accessing cookies
  - `sameSite: 'lax'`: Provides CSRF protection
  - `secure`: Enforced in production for HTTPS-only cookies
  - `__Secure-` prefix in production for additional browser-level protection

#### Authorization
- Request-level middleware validation
- Session-based API route protection
- Username verification for user data modifications
- Proper handling of unauthenticated requests with redirects

#### Data Protection
- Environment variables for sensitive configuration
- MongoDB connection string stored securely
- No credentials in source code

### Environment Configuration

Required environment variables (see `.env.example`):

```
MONGODB_URI=              # MongoDB connection string (keep secret)
GITHUB_CLIENT_ID=         # GitHub OAuth app ID (public)
GITHUB_CLIENT_SECRET=     # GitHub OAuth app secret (keep secret)
NEXTAUTH_SECRET=          # Random secret for NextAuth.js (keep secret)
NEXTAUTH_URL=             # Application URL
```

**Important**: Never commit actual values to source control.

## Reporting a Vulnerability

If you discover a security vulnerability, please report it by:

1. **Do not** disclose the vulnerability publicly
2. Email the maintainer or create a private security advisory on GitHub
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond as quickly as possible and work with you to address the issue.

## Security Best Practices for Deployments

When deploying this application:

1. **Use strong secrets**: Generate cryptographically secure random secrets for `NEXTAUTH_SECRET`
2. **Secure your MongoDB**:
   - Use MongoDB Atlas with IP whitelisting
   - Enable database authentication
   - Use encrypted connections (TLS/SSL)
3. **Configure OAuth properly**:
   - Set correct callback URLs for your production domain
   - Keep client secrets secure
4. **Enable HTTPS**: Always use HTTPS in production
5. **Keep dependencies updated**: Regularly run `npm audit` and update dependencies
6. **Monitor logs**: Watch for suspicious authentication attempts
7. **Implement rate limiting**: Consider adding rate limiting for authentication endpoints

## Regular Maintenance

- Run `npm audit` regularly to check for new vulnerabilities
- Update dependencies with `npm update` and test thoroughly
- Review security advisories for Next.js and NextAuth.js
- Keep Node.js runtime updated on deployment platform

## Additional Resources

- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [NextAuth.js Security](https://next-auth.js.org/configuration/options#security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
