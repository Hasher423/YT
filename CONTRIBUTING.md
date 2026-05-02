# 🤝 Contributing to YT — Full-Stack Video Platform

First off, thank you for considering contributing to **YT**! This is an open-source YouTube clone built with the MERN stack, and every contribution — no matter how small — makes it better.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Good First Issues](#good-first-issues)
- [Development Guidelines](#development-guidelines)
- [Environment Setup](#environment-setup)

---

## 📜 Code of Conduct

By participating in this project, you agree to keep discussions respectful and constructive. Be kind, be helpful, and focus on the code.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v16+
- **npm** v8+
- **Git**
- A **MongoDB Atlas** account (free tier works)
- A **Cloudinary** account (free tier works)

### Fork & Clone

```bash
# 1. Fork the repo on GitHub (click the Fork button)

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/YT.git
cd YT

# 3. Add the original repo as upstream
git remote add upstream https://github.com/Hasher423/YT.git
```

### Backend Setup

```bash
cd Backend
npm install

# Copy the example env file
cp .env.example .env
```

Fill in your `.env` file:

```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

```bash
# Start backend
npm run dev
# Runs on http://localhost:3000
```

### Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file in the Frontend directory:

```env
VITE_BACKEND_URI=http://localhost:3000
```

```bash
# Start frontend
npm run dev
# Runs on http://localhost:5173
```

---

## 📁 Project Structure

```
YT/
├── Frontend/
│   └── src/
│       ├── Components/     # Reusable UI components (VideoCard, Comments, etc.)
│       ├── Pages/          # Route-level page components
│       ├── Redux/          # Redux Toolkit store, slices
│       ├── Context/        # React Context providers
│       └── utils/          # Helper functions
│
└── Backend/
    ├── Controllers/        # Route handler logic
    ├── Models/             # Mongoose schemas
    ├── Routes/             # Express route definitions
    ├── Services/           # Business logic layer
    ├── Middlewares/        # Auth and other middleware
    └── Config/             # Cloudinary, Multer config
```

When adding new features, follow this pattern:
- **Backend:** `Routes → Controller → Service → Model`
- **Frontend:** `Page → Component → Redux slice (if global state needed)`

---

## 🛠️ How to Contribute

### 1. Find or Create an Issue

- Browse [open issues](https://github.com/Hasher423/YT/issues)
- Look for issues labeled `good first issue` or `help wanted`
- If you want to work on something not listed, **open an issue first** and describe what you want to do — this avoids duplicate work

### 2. Get Assigned

- Comment on the issue: *"I'd like to work on this"*
- Wait to be assigned before starting work

### 3. Create a Branch

```bash
# Always branch off from main
git checkout main
git pull upstream main
git checkout -b your-branch-name
```

### 4. Make Your Changes

- Follow the [Development Guidelines](#development-guidelines) below
- Test your changes locally before submitting

### 5. Push & Open a PR

```bash
git add .
git commit -m "feat: your descriptive message"
git push origin your-branch-name
```

Then open a Pull Request on GitHub against the `main` branch.

---

## 🌿 Branch Naming Convention

Use the following prefixes:

| Type | Format | Example |
|------|--------|---------|
| New feature | `feat/short-description` | `feat/video-playlist` |
| Bug fix | `fix/short-description` | `fix/comment-delete-crash` |
| UI improvement | `ui/short-description` | `ui/mobile-sidebar` |
| Documentation | `docs/short-description` | `docs/api-endpoints` |
| Refactor | `refactor/short-description` | `refactor/video-service` |
| Tests | `test/short-description` | `test/auth-middleware` |

---

## ✍️ Commit Message Guidelines

Follow the **Conventional Commits** format:

```
<type>: <short summary>
```

**Types:**

| Type | When to use |
|------|-------------|
| `feat` | Adding a new feature |
| `fix` | Fixing a bug |
| `ui` | UI/styling changes |
| `docs` | Documentation only |
| `refactor` | Code restructuring (no feature/fix) |
| `perf` | Performance improvement |
| `chore` | Build process, deps update |

**Examples:**

```bash
feat: add video playlist support
fix: resolve like button not toggling on re-render
ui: improve mobile responsiveness of SideBar
docs: add socket event documentation
refactor: extract upload logic into videoUpload.service.js
```

**Rules:**
- Use lowercase
- Keep the summary under 72 characters
- Use present tense ("add feature" not "added feature")

---

## 🔃 Pull Request Process

1. **Title** — Follow the same format as commit messages (e.g., `feat: add watch history page`)
2. **Description** — Fill out the PR template:
   - What does this PR do?
   - Which issue does it close? (use `Closes #123`)
   - Screenshots (for UI changes)
   - How did you test it?
3. **Keep PRs small** — One feature or fix per PR. Large PRs are harder to review and slower to merge.
4. **Don't commit `.env` files** — Ever.
5. **Respond to review comments** within a reasonable time.

### PR Template

When opening a PR, use this format:

```markdown
## 📝 Description
Brief description of what this PR does.

## 🔗 Related Issue
Closes #ISSUE_NUMBER

## 🧪 How to Test
1. Step one
2. Step two

## 📸 Screenshots (if UI change)
[attach screenshots]

## ✅ Checklist
- [ ] Code runs locally without errors
- [ ] No .env files committed
- [ ] Followed branch naming convention
- [ ] Commit messages follow guidelines
```

---

## 🌱 Good First Issues

New to the codebase? Here are areas perfect for first contributions:

- **UI Fixes** — Improve responsiveness on mobile screens
- **Loading States** — Add skeleton loaders to video cards
- **Error Handling** — Add better error messages on failed uploads
- **Code Cleanup** — Remove unused imports, console.logs
- **Documentation** — Improve inline code comments
- **Accessibility** — Add `alt` tags, ARIA labels to components
- **`.env.example`** — Keep it updated when new env vars are added

Look for issues tagged [`good first issue`](https://github.com/Hasher423/YT/issues?q=is%3Aopen+label%3A%22good+first+issue%22) on the issues page.

---

## 💻 Development Guidelines

### General

- Keep components small and focused — one responsibility per component
- Prefer named exports over default exports for components
- Remove all `console.log` statements before submitting a PR
- Don't leave commented-out code in your PR

### Frontend (React + Redux)

- Use **Redux Toolkit slices** for global state (videos, comments)
- Use **local state (`useState`)** for UI-only state (modals, toggles)
- Components go in `src/Components/`, pages go in `src/Pages/`
- Use **Tailwind CSS** utility classes for styling — avoid inline styles
- Use **Axios** for all API calls (already configured)

### Backend (Node.js + Express)

- Follow the existing **Routes → Controller → Service** pattern
- Business logic belongs in **Services**, not Controllers
- Controllers should only handle request/response
- Use **async/await** with try/catch for all async operations
- Validate request inputs before processing
- Never expose sensitive data (passwords, tokens) in API responses

### Database (MongoDB + Mongoose)

- Define all schemas in `Backend/Models/`
- Use Mongoose **virtuals and indexes** where appropriate
- Don't store sensitive data in plain text

---

## 🔒 Security

- **Never commit** API keys, secrets, or `.env` files
- If you discover a security vulnerability, please report it privately via [SECURITY.md](./SECURITY.md) — do **not** open a public issue

---

## 📬 Questions?

If you're stuck or have questions:

- Open a [GitHub Discussion](https://github.com/Hasher423/YT/discussions) or comment on the relevant issue
- Email the maintainer: [hasher423@gmail.com](mailto:hasher423@gmail.com)

---

**Happy coding! 🚀 — Built with ❤️ by [Hasher423](https://github.com/Hasher423)**
