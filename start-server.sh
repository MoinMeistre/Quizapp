#!/bin/bash

# Quizapp Development Server Startup Script

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
WEB_DIR="$PROJECT_DIR/src/web"
PORT="${1:-8000}"
HOST="${2:-localhost}"

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo -e "${RED}PHP is not installed. Please install PHP 7.2 or higher.${NC}"
    exit 1
fi

# Check PHP version
PHP_VERSION=$(php -r 'echo phpversion();')
echo -e "${GREEN}PHP version: $PHP_VERSION${NC}"

# Create data directory if it doesn't exist
mkdir -p "$PROJECT_DIR/data"
chmod 755 "$PROJECT_DIR/data"

# Check file permissions
if [ ! -w "$PROJECT_DIR/data" ]; then
    echo -e "${YELLOW}Warning: data directory may not be writable. Attempting to fix...${NC}"
    chmod 755 "$PROJECT_DIR/data"
fi

# Clean any previous instances
pkill -f "php.*$PORT" 2>/dev/null

# Start the PHP development server
echo -e "${GREEN}Starting Quizapp development server...${NC}"
echo -e "${GREEN}Server running at: http://$HOST:$PORT${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""

cd "$WEB_DIR"
php -S "$HOST:$PORT"
