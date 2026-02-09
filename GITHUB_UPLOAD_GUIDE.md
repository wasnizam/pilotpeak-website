# GitHub Upload Guide for PilotPeak Website

## Step-by-Step Instructions

### Option 1: Upload to Existing Repository (Recommended)

If you already have a GitHub repository for PilotPeak:

#### Step 1: Add Remote (if not already added)
```bash
cd "/Users/wasnizam/Desktop/APPS 2026/PilotPeak/PilotPeak"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
```

Replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPOSITORY_NAME` with your repository name

#### Step 2: Push to GitHub
```bash
git push -u origin main
```

If you're on a different branch:
```bash
git push -u origin YOUR_BRANCH_NAME
```

---

### Option 2: Create New GitHub Repository

#### Step 1: Create Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `PilotPeak` (or `pilotpeak-website`)
4. Description: "Professional landing page for PilotPeak - Fatigue Management for Aviation Professionals"
5. Choose: **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have files)
7. Click **"Create repository"**

#### Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
cd "/Users/wasnizam/Desktop/APPS 2026/PilotPeak/PilotPeak"

# Add remote (replace YOUR_USERNAME and REPOSITORY_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git

# Push to GitHub
git push -u origin main
```

---

### Option 3: Upload Only Website Files (Separate Repository)

If you want the website in a separate repository:

#### Step 1: Create New Repository for Website Only

1. Go to GitHub and create a new repository named `pilotpeak-website`
2. Make it **Public** (if you want to use GitHub Pages)

#### Step 2: Initialize and Push Website Files

```bash
# Navigate to Website directory
cd "/Users/wasnizam/Desktop/APPS 2026/PilotPeak/PilotPeak/Website"

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: PilotPeak professional landing page"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/pilotpeak-website.git

# Push
git push -u origin main
```

---

## Enable GitHub Pages (Optional - Free Hosting)

After uploading, you can host the website for free on GitHub Pages:

1. Go to your GitHub repository
2. Click **Settings** → **Pages** (in left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/Website` (or `/` if website files are in root)
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/REPOSITORY_NAME`

**Note**: If files are in `/Website` folder, you may need to move them to root or configure the path.

---

## Troubleshooting

### Authentication Issues

If you get authentication errors:

**Option A: Use Personal Access Token**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` permissions
3. Use token as password when pushing

**Option B: Use SSH**
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/REPOSITORY_NAME.git
```

### Push Rejected

If push is rejected:
```bash
# Pull first, then push
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Check Current Status
```bash
git status
git remote -v
git log --oneline -5
```

---

## Files Being Uploaded

The following website files will be uploaded:
- ✅ `Website/index.html` - Main landing page
- ✅ `Website/styles.css` - All styling
- ✅ `Website/script.js` - Interactive features
- ✅ `Website/privacy.html` - Privacy Policy
- ✅ `Website/terms.html` - Terms of Service
- ✅ `Website/README.md` - Documentation

---

## Next Steps After Upload

1. **Verify Files**: Check GitHub repository to ensure all files are there
2. **Test Locally**: Clone repository and test website
3. **Enable GitHub Pages**: If you want free hosting
4. **Custom Domain** (Optional): Add your domain in GitHub Pages settings
5. **Update Links**: Replace any placeholder URLs with actual links

---

## Quick Commands Reference

```bash
# Check status
git status

# Add files
git add Website/

# Commit
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Check remote
git remote -v

# View commit history
git log --oneline
```

---

**Need Help?** If you encounter any issues, check:
- GitHub documentation: https://docs.github.com
- Git documentation: https://git-scm.com/doc
