# MongoDB Starter – Developer Directory

A developer directory built on [Next.js](https://nextjs.org/) and [MongoDB Atlas](https://www.mongodb.com/atlas/database), deployed on [Vercel](https://vercel.com/) with the [Vercel + MongoDB integration](https://vercel.com/integrations/mongodbatlas).

![](/public/og.png)

Featured on the [MongoDB World](https://www.mongodb.com/world-2022) keynote.

## Deployment Instructions

You will need to create a [GitHub OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to use this starter. Here are the steps:

1. Go to https://github.com/settings/developers and create a new OAuth application
2. Name your application **"MongoDB Starter"**
3. Set the homepage URL to **`https://vercel.app`** for now (we'll change this later)
4. Set the authorization callback URL to **`https://vercel.app/api/auth/callback/github`** for now (we'll change this later)
5. Click "Register application".
6. Once the application is created, copy the "Client ID". This will be your **`GITHUB_CLIENT_ID`**.
7. Generate a new client secret and copy that too. This will be your **`GITHUB_CLIENT_SECRET`**.
8. Generate a random secret [here](https://generate-secret.vercel.app/32). This will be your **`NEXTAUTH_SECRET`**.
9. Click on this button below to clone and deploy this template to Vercel.

  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fmongodb-starter&project-name=mongodb-nextjs&repository-name=mongodb-nextjs&demo-title=MongoDB%20Developer%20Directory&demo-description=Log%20in%20with%20GitHub%20to%20create%20a%20directory%20of%20contacts.&demo-url=https%3A%2F%2Fmongodb.vercel.app%2F&demo-image=https%3A%2F%2Fmongodb.vercel.app%2Fog.png&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH&env=GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,NEXTAUTH_SECRET&envDescription=Instructions%20on%20how%20to%20configure%20these%20env%20vars:&envLink=https://github.com/vercel/mongodb-starter/blob/main/.env.example)

10. Once your application is deployed, **edit the homepage & callback URLs in your GitHub OAuth App to match your deployment URL**.

## Demo

https://mongodb.vercel.app

## Vercel + MongoDB Integration

https://vercel.com/integrations/mongodbatlas

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Vercel](https://vercel.com/)

## Security

This starter includes several security enhancements:

### Dependency Security
- **Next.js >=13.5.11**: Mitigates authorization bypass vulnerabilities and other security issues
- **NextAuth.js >=4.24.13**: Fixes magic link email verification vulnerabilities (CVE-2022-39263, CVE-2022-35924)
- **Secure Dependencies**: Updated transitive dependencies to fix:
  - Prototype pollution in JSON5 (CVE-2022-46175)
  - ReDoS vulnerability in minimatch (CVE-2022-3517)

### Authentication Security
- OAuth state parameter validation for CSRF protection
- Database session strategy for secure session management
- Secure cookie configuration with httpOnly and sameSite flags
- Production-grade cookie security with `__Secure-` prefix

### Authorization Layer
- Next.js middleware provides request-level authorization checks
- API route protection with session validation
- Username verification for user data modifications
- Proper redirect handling for unauthenticated access

### Best Practices
- Environment variables for sensitive configuration
- Secure session management with NextAuth.js
- Protection against common web vulnerabilities (CSRF, XSS, Session Fixation)
