Reporting a Vulnerability (Private)

If you discover a security vulnerability, please report it privately so we can fix it before it becomes public.

How to Report

Email: hasher423@gmail.com

Or open a Private Security Advisory on GitHub:
Security → Advisories → New Draft Advisory

What to Include

Description of the vulnerability
Steps to reproduce
Proof of concept (if available)
Expected vs actual behavior
Impact and affected areas
Response Time
Acknowledgement within 48 hours
Initial assessment within 5 days
Fix timeline shared after assessment
Please do not publicly disclose the vulnerability until a fix is released.
Public Disclosure After Fix
After a vulnerability is fixed, we will:
Publish a public GitHub Release Note
Create a public issue labeled "security-fixed"
Credit the reporter 
Document the patch for transparency
Security Guidelines for Contributors
Do not commit .env files or secrets
Validate and sanitize all inputs
Use HTTPS for all API communication
Apply rate limiting on sensitive routes
Avoid storing sensitive data in JWTs
Keep dependencies updated
Follow OWASP best practices
Review pull requests for potential security issues
