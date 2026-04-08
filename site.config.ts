import { SiteConfig } from './types/config';

const config: SiteConfig = {
  "theme": {
    "fonts": {
      "body": "Merriweather",
      "heading": "Inter"
    },
    "colors": {
      "accent": "#E9EDC9",
      "primary": "#D4A373",
      "secondary": "#CCD5AE"
    },
    "cardStyle": "shadow",
    "borderRadius": "md"
  },
  "author": {
    "bio": "",
    "name": "yu"
  },
  "integrations": {
    "ads": {
      "adsenseClientId": ""
    },
    "analytics": {
      "googleAnalyticsId": ""
    },
    "pinterest": {
      "username": ""
    },
    "newsletter": {
      "apiKey": "",
      "provider": ""
    }
  }
};

export default config;
