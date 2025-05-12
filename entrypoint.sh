#!/usr/bin/env bash
set -e

cd /app

if [ ${NODE_ENV} != "production" ]; then
    npm install
    npm run dev
else
    npm run start
fi
