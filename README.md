## 📋 Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js** v18 or later installed
- **npm** v9 or later (or yarn/pnpm)
- Git installed

## 🛠️ Installation

### 1. Clone the repository

git clone https://github.com/your-username/your-repo.git
cd your-repo

### 2. Install root dependencies
npm install

### 3. Install dependencies for each application

cd apps/betfinal && npm install && cd ../..
cd apps/cosmoswin && npm install && cd ../..

## 🚀 Running the Applications

### Option 1: Run a single application
# For betfinal application
cd apps/betfinal
npm run dev

# For cosmoswin application
cd apps/cosmoswin
npm run dev

## 🌐 Application Features

### Language Switching (English/Arabic)
To change the language:
1. Use the dropdown button in the header to select either English or Arabic
2. Alternatively, modify the URL directly:
   - Change `base-url/en` to `base-url/ar` for Arabic
   - Change `base-url/ar` to `base-url/en` for English

### Deposit Feature
To make a deposit:
1. Log in using a selected user from the available user list
2. Locate and click the "Deposit" button
3. A modal will appear with a deposit form
4. Enter the desired deposit amount
5. Submit the form to add the amount to the user's balance
