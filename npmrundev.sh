#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Start backend
cd "$SCRIPT_DIR/backend" || exit
npm run dev &
BACKEND_PID=$!

# Start frontend
cd "$SCRIPT_DIR/frontend" || exit
npm run dev &
FRONTEND_PID=$!

# Start prisma studio
cd "$SCRIPT_DIR/backend" || exit
npx prisma studio &
STUDIO_PID=$!

wait $BACKEND_PID
wait $FRONTEND_PID
wait $STUDIO_PID
