SHUKART AYURVEDA WEBSITE
========================

FOLDER STRUCTURE (keep it exactly like this)

shukart-ayurveda/
  index.html                       the website (open this to view it)
  README.txt                       this file
  assets/
    images/
      logo.webp                    full round logo (banner)
      logo-mark.webp               SK monogram (header, footer, browser tab icon)
      doctor.webp                  Dr. Shushma Sharma's photo
      banner-poster-desktop.webp   still image shown while the desktop video loads
      banner-poster-mobile.webp    still image shown while the phone video loads
    video/
      banner-desktop.mp4           16:9 mortar and pestle clip (computers, tablets in landscape)
      banner-mobile.mp4            9:16 leaves clip (phones)
  google-apps-script/
    google-sheet-script.gs         paste into Google Sheets > Extensions > Apps Script
                                   (NOT uploaded to the website host)

IMPORTANT
- Do not rename or move files inside "assets". The website looks for them by these exact names.
- When publishing, upload index.html and the whole assets folder together.
- Upload of google-apps-script is not needed; it lives inside your Google Sheet.

QUICK EDITS (open index.html in Notepad, use Ctrl+F)
- Phone number:      search  phone: ""      and type the number between the quotes, e.g. "+91 98765 43210"
- WhatsApp button:   search  whatsapp: ""   and type the number with country code, no + or spaces, e.g. "919876543210"
- Google Sheet form: search  sheetUrl: ""   and paste your Apps Script Web App link (ends in /exec)
- Change the doctor photo: replace assets/images/doctor.webp with a new photo of the same name.
- Change a banner video: replace the .mp4 in assets/video with a new one of the same name.
