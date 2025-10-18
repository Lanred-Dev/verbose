# Verbose

A simple Discord bot that keeps track of the most used words in a server.

### Features

-   Tracks the most frequently used words across all messages
-   Displays word usage stats on command
-   Stores all data locally — no database required
-   Easy to self-host

### Requirements

-   [Node.js](https://nodejs.org/) (v20 or newer)

### Installation

```bash
# Clone the repository
git clone https://github.com/Lanred-Dev/verbose.git
cd verbose

# Install dependencies
npm install
```

### Setup

1. Create a bot at the [Discord Developer Portal](https://discord.com/developers/applications).

2. Copy your bot token.

3. Create a `.env` (or use the `template.env` and rename to `.env`) file in the project root:

    ```env
    TRACK_USER_WORDS=true
    DISCORD_TOKEN=your_token_here
    DISCORD_CLIENT_ID=your_client_id_here
    DB_FILE=./data.json
    DB_UPDATE_INTERVAL=180000
    PRESENCE_TYPE=Watching
    PRESENCE_ACTIVITY=your words
    ```

4. Build and run the bot:

    ```bash
    npm run build
    node build/index.js
    ```

### Usage

-   Invite the bot to your server.
-   It will automatically start tracking word usage.
-   Use `/most` to view top words.
