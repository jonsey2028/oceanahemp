OceanaHemp.com Deployment Guide
SiteGround Shared Hosting

============================
QUICK SUMMARY
============================

The entire site has been built as a static export. The out/ folder
contains all HTML, CSS, JS, and assets needed to run the site.
No Node.js server required — just upload the files.


============================
PREREQUISITES
============================

1. SiteGround account (already set up)
   Email: misterjones.kj@gmail.com
   Domain: oceanahemp.com

2. Access method (pick one):
   A. SiteGround Site Tools > File Manager (web UI)
   B. SFTP/SSH via SiteGround (preferred for speed)
   C. SiteGround auto installer (not recommended — no Node needed)


============================
DEPLOYMENT STEPS
============================

STEP 1: Build the static export (already done)
------------------------------------------------
cd /Users/kerryjones/oceanahemp
npm run build

This generates the out/ directory with all static files.
Current output: 126 files, 3.6MB, 11 HTML pages.


STEP 2: Connect to SiteGround
------------------------------
Option A: Site Tools File Manager
  1. Log in at https://my.siteground.com
  2. Go to Site Tools for oceanahemp.com
  3. Navigate to Site > File Manager
  4. Open the public_html folder

Option B: SFTP (recommended for bulk upload)
  1. In Site Tools, go to Site > FTP Accounts
  2. Create or find your FTP credentials
  3. Connect with an SFTP client (Cyberduck, FileZilla, etc.)
     Host: oceanahemp.com (or server hostname from SiteGround)
     Port: 18765 (SiteGround SFTP port)
     Username: (from Site Tools > FTP Accounts)
     Password: (set in Site Tools)


STEP 3: Upload files
---------------------
1. DELETE everything currently in public_html/ (back up first if needed)
2. Upload ALL contents of the out/ folder into public_html/
   - NOT the out/ folder itself, but the files INSIDE it
   - So public_html/index.html, public_html/_next/, etc.
3. Verify the file structure looks like:

   public_html/
     index.html
     404.html
     _not-found.html
     about.html
     cart.html
     contact.html
     learn.html
     quiz.html
     shop.html
     shop/
       cbd-pain-cream.html
       pet-cbd-tincture.html
     _next/
       static/   (JS, CSS, fonts, images)


STEP 4: Configure .htaccess for clean URLs
--------------------------------------------
SiteGround uses Apache. Create/edit public_html/.htaccess with:

RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Clean URLs: /about -> /about.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ /$1.html [L,QSA]

# Handle /shop/cbd-pain-cream style URLs
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
# Try with .html extension for subdirectory pages
RewriteCond %{DOCUMENT_ROOT}/$1.html -f
RewriteRule ^([^/]+/[^/]+)$ /$1.html [L,QSA]


STEP 5: Set up custom 404
---------------------------
The static export includes 404.html. In .htaccess add:

ErrorDocument 404 /404.html


STEP 6: Verify
---------------
1. Visit https://oceanahemp.com — homepage should load
2. Test all pages:
   /about
   /shop
   /shop/pet-cbd-tincture
   /shop/cbd-pain-cream
   /learn
   /quiz
   /cart
   /contact
3. Check that images load (Unsplash placeholders)
4. Test the quiz flow end to end
5. Test the promo code OCEANA15 on the cart page


============================
QUICK UPLOAD VIA TERMINAL
============================

If you have SSH access from your Mac, you can use scp:

# First, find your SiteGround SSH details from Site Tools > SSH Keys
# Then:

scp -P 18765 -r out/* user@server_hostname:~/public_html/

Or use rsync for smarter sync (only changed files):

rsync -avz --delete -e "ssh -p 18765" out/ user@server_hostname:~/public_html/


============================
REBUILDING AFTER CHANGES
============================

After any code changes:

1. cd /Users/kerryjones/oceanahemp
2. npm run build
3. Re-upload the out/ folder contents to public_html/

The site is pure static HTML/CSS/JS — no server process needed.


============================
TROUBLESHOOTING
===============================

Issue: Pages return 404
Fix: Make sure .htaccess clean URL rules are in place
     and files were uploaded to the ROOT of public_html/

Issue: Images not loading
Fix: Check that _next/static/ folder uploaded completely
     The Unsplash remote images may load slowly on first visit

Issue: CSS looks broken
Fix: Clear browser cache. Verify _next/static/ uploaded fully.

Issue: Quiz or Cart JS not working
Fix: Check browser console for errors. Make sure all _next/
     chunks uploaded completely (no partial transfers).


============================
CURRENT SITE PAGES
===============================

Route                  File                              Type
/                      index.html                        Static
/about                 about.html                        Static
/cart                  cart.html                         Static
/contact               contact.html                      Static
/learn                 learn.html                        Static
/quiz                  quiz.html                         Static
/shop                  shop.html                         Static
/shop/pet-cbd-tincture shop/pet-cbd-tincture.html        SSG
/shop/cbd-pain-cream   shop/cbd-pain-cream.html          SSG

Promo code: OCEANA15 = 15% off
Free shipping threshold: $75+