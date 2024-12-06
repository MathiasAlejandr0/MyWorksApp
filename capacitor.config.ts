import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'MyWorksApp',
  webDir: 'www', // Asegúrate de que este valor sea correcto
  bundledWebRuntime: false,
  plugins: {
    Camera: {
      enabled: true,
    },
  },
};

export default config;
