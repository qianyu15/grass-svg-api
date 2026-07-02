

# 🐍 Snake API

A lightweight API that generates a GitHub contributions snake SVG without requiring GitHub Actions or workflow setup.

Instead of configuring CI/CD pipelines, this service dynamically generates the SVG using `snk` and serves it directly via HTTP.

Because sometimes automation should just… already exist.

---

## 🚀 Features

* Generate GitHub contributions snake SVG on demand
* No GitHub Actions required
* Simple HTTP API interface
* Daily caching for performance
* Works with any GitHub username

---

## 📡 Usage

### Endpoint

```
GET /api/snake?user=<github_username>
```

### Example

```
GET /api/snake?user=octocat
```

### Response

Returns an SVG image:

```http
Content-Type: image/svg+xml
```

---

## 🧠 Why this exists

Normally, the GitHub contributions snake is generated using GitHub Actions workflows.

That involves:

* Writing YAML files
* Waiting for CI runs
* Debugging permissions
* Watching logs like it’s 2009 again

This project replaces all of that with a single API call.

No workflows. No YAML. No suffering.

Just snake.

---

## ⚙️ How it works

1. Receives username via query
2. Runs `snk` CLI to generate SVG
3. Reads generated file
4. Returns SVG response
5. Caches result for 24h

---

## 🧱 Tech Stack

* Node.js
* `snk` CLI
* Serverless function (Vercel / similar)
* File-based caching

---

## ⚠️ Notes

* This is not an official GitHub API
* Heavy usage may be slow due to CLI execution
* Cache helps, but don’t abuse it like it owes you money

---

## 🐍 Philosophy

If GitHub Actions is “automation done properly”
this project is “automation done immediately”

Sometimes shipping matters more than setting up CI rituals.
