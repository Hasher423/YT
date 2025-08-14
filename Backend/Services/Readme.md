# Cloudinary Chunked Buffer Upload

This module provides a function to upload large video or image buffers to [Cloudinary](https://cloudinary.com) using **Node.js streams** to avoid timeouts and allow chunked uploads.

It is useful when:
- You have a file in memory as a `Buffer` (e.g., uploaded through an API).
- You want to upload in **chunks** instead of sending the whole file at once.
- You want to track **upload progress**.

---

## Features
- 📦 **Buffer-based** upload (no need to save to disk).
- 📤 **Chunked uploads** using `Readable` streams.
- ⏱ **Timeout-safe** for large files.
- 📊 Built-in **progress logging** (can be adapted for Socket.io).

---

## Installation

Install dependencies:

```bash
npm install cloudinary
