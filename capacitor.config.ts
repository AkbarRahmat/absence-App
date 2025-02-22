import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'absence-App',
  webDir: 'www',
  server: {
    allowNavigation: ["pembelajaran.ubpkarawang.ac.id"], // Tambahkan ini
    cleartext: true
  },
  plugins: {
    PrivacyScreen: {
      enable: true,
      imageName: "Splashscreen",
      contentMode: "scaleAspectFit",
      preventScreenshots: false,
    },
  },
};

export default config;
