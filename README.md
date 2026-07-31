# Calculator

A production-ready React Native calculator app for Android with a clean white-and-blue theme, animations, sound feedback, haptic feedback, persistent calculation history, and settings.

## Features

- Modern calculator display and keypad with operator precedence
- Animations on button presses and result transitions
- Soft click sound on button presses (toggleable)
- Light haptic feedback on supported devices (toggleable)
- Persistent calculation history with copy, reuse, and delete
- Settings screen for sound, haptic, and history management
- Divide-by-zero and invalid input handling
- Copy result to clipboard
- Offline, fast, and low-memory operation

## Installation

### Prerequisites

- Node.js >= 22
- npm >= 9
- Java 17 (for Android builds)
- Android SDK with Android 14 (API 36) target
- Watchman (optional, for macOS)

### Setup

```sh
# Clone the repository
git clone <repository-url>
cd Calculator

# Install dependencies
npm install

# Install Android dependencies
cd android && ./gradlew dependencies
```

## Build Instructions

### Development Build

```sh
# Start Metro bundler
npm start

# Run on Android
npm run android
```

### Release APK

```sh
# Build the release APK
cd android && ./gradlew assembleRelease --no-daemon

# The APK is located at:
# android/app/build/outputs/apk/release/app-release.apk
```

## Folder Structure

```
Calculator/
├── android/              # Android native project
│   ├── app/
│   │   ├── build.gradle
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       ├── java/com/calculator/
│   │       └── res/
│   ├── build.gradle
│   ├── gradle/
│   ├── gradle.properties
│   ├── settings.gradle
│   └── gradlew
├── ios/                  # iOS native project
├── src/
│   ├── assets/           # Static assets (sounds, images)
│   ├── components/       # Reusable UI components
│   │   ├── AppHeader.tsx
│   │   ├── Button/
│   │   ├── Display/
│   │   ├── HistoryItem/
│   │   └── Keyboard/
│   ├── constants/        # Colors, spacing, fonts
│   ├── screens/          # Screen-level components
│   │   ├── CalculatorScreen/
│   │   ├── HistoryScreen/
│   │   └── SettingsScreen/
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utilities (engine, storage, sound, haptics)
├── __tests__/            # Jest test files
├── App.tsx               # App entry point
├── babel.config.js       # Babel configuration
├── metro.config.js       # Metro bundler configuration
├── package.json
└── tsconfig.json
```

## GitHub Actions

The repository includes a GitHub Actions workflow for building the Release APK on every push and manual dispatch.

### Workflow Location

`.github/workflows/android-build.yml`

### What It Does

1. Triggers on push to `main`/`master` and manual dispatch
2. Sets up Java 17 (Temurin)
3. Sets up Node.js LTS
4. Installs dependencies with `npm ci`
5. Caches Gradle and npm dependencies
6. Builds the Release APK with `./gradlew assembleRelease`
7. Uploads the APK as a workflow artifact

### No Secrets Required

The release build uses the debug signing configuration included in the project, so no keystore secrets are required.

## License

MIT
