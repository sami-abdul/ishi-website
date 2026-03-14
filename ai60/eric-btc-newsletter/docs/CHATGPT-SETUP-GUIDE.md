# What I Need From You

## ChatGPT Auth Tokens

I need tokens from your ChatGPT subscription so the agent can use GPT-5.4 on your existing $20/month plan. No extra API costs.

Open Terminal (Cmd + Space, type "Terminal", hit Enter) and run these one at a time:

```
brew install openclaw/tap/openclaw
```

```
openclaw auth login --provider openai
```

A browser window opens. Sign into your ChatGPT account and click "Authorize." Once the terminal says "Login successful", run:

```
cat ~/.openclaw/auth.json
```

Copy the entire output and send it to me on Upwork.

You can uninstall after I confirm it's working:
```
brew uninstall openclaw && rm -rf ~/.openclaw
```

---

## Other Credentials

| What | Where to Find It |
|------|-----------------|
| Beehiiv API Key | Beehiiv > Settings > Integrations > API |
| Beehiiv Publication ID | Same page, under your publication name (starts with "pub_") |
| Discord User ID | Discord Settings > Advanced > enable Developer Mode, then right-click your name > Copy User ID |
| Affiliate Links | Your Kraken, Coinbase, Ledger referral URLs |
| Preferred newsletter days | Default is Mon/Wed/Fri |
