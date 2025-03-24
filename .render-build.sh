#!/bin/sh
echo "Installing dependencies..."
npm install --force
echo "Building project..."
npm rebuild sqlite3 --build-from-source
