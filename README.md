# KodoTrading: A Modern Trading and Social Platform

[![License: TBD](https://img.shields.io/badge/License-TBD-yellow.svg)](LICENSE.md)

KodoTrading is a cutting-edge trading and social platform that seamlessly blends the real-time insights of Benzinga with the dynamic community features of StockTwits. Built with a fluid, intuitive UI featuring customizable light and dark modes, and leveraging React, TypeScript, and Vite for a modern development experience.

## ✨ Key Features

* **Social Feed:** Post, comment, and share content with images, videos, and stock tickers, fostering a dynamic trading community.
* **Portfolio Tracker:** Track your stock holdings with real-time updates, providing essential insights for informed trading decisions.
* **Live Chat:** Real-time messaging with WebSocket support, enabling instant communication and collaboration.
* **Web3 Integration:** Wallet connection, NFT marketplace, and decentralized identity, exploring the future of trading.
* **OAuth Authentication:** Sign up and log in securely with Google, X, and Kodoverse (placeholder).
* **Accessibility:** ARIA labels, keyboard navigation, and accessibility audit with `react-axe` to ensure inclusivity.
* **Performance:** Lazy loading, error boundaries, and optimized builds with Vite for a smooth user experience.
* **Adaptive Light/Dark Modes:** Switch between a crisp, clean light mode and a sophisticated dark mode with a captivating palette of dark red (#8B0000), deep onyx (#353839), and pristine white (#FFFFFF) accents.
* **Seamless Fluid Design:** Navigate with ease through a responsive layout inspired by the smooth transitions and user-friendly experience of platforms like Threads and Facebook.
* **Robust Tech Stack (Planned):**
    * **Frontend:** React (TypeScript) + Angular + Angular Material - Building a fast, responsive, and feature-rich user interface.
    * **Database:** PostgreSQL - Ensuring reliable and scalable data management for financial transactions.
    * **Backend:** Motoko, Python, Go - Utilizing the power of Motoko for decentralized features, Python for data analysis, and Go for high-performance real-time data processing.

## 🚀 Getting Started

### 🛠️ Prerequisites

* Node.js (v16 or higher) - [https://nodejs.org/](https://nodejs.org/)
* npm or yarn
* Firebase project for OAuth (Google and X)
* Angular CLI (`npm install -g @angular/cli`)

### 📦 Installation

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/yourusername/kodotrading.git](https://github.com/yourusername/kodotrading.git)
    cd kodotrading
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Firebase:**

    * Create a Firebase project and enable Google and Twitter (X) authentication.
    * Update `src/firebase.ts` with your Firebase configuration.

4.  **Run the Development Server (React):**

    ```bash
    npm run dev -- --force
    ```

    * Open the app at `http://localhost:5173`.

5.  **Run the Application (Angular):**

    ```bash
    ng serve --open
    ```

    * Your browser will automatically open at `http://localhost:4200`.

## 🧑‍💻 Development

* **Theme Toggle:** Implemented in `ThemeService` and `AppComponent` for easy theme switching.
* **Next Steps:**
    * Develop a dynamic social feed component, similar to StockTwits, for real-time market discussions.
    * Create comprehensive user profile pages, inspired by Benzinga, to provide detailed user insights and interactions.

## 📜 Available Scripts

* `npm run dev`: Start the development server (React).
* `npm run build`: Build the app for production (React).
* `npm run test`: Run unit tests with Vitest (React).
* `npm run lint`: Run ESLint to check for code quality issues (React).

## 🤝 Contributing

We welcome contributions! Feel free to submit issues or pull requests to enhance KodoTrading.

## 📄 License

(To Be Determined - Update with your chosen license)