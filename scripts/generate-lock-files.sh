#!/bin/bash
set -e

echo "🔧 Generating complete package-lock.json files..."
echo ""

# Root directory
echo "📦 Generating root package-lock.json..."
if [ -f "package-lock.json" ]; then
    echo "   Removing incomplete lock file..."
    rm package-lock.json
fi

echo "   Running npm install..."
npm install

if grep -q "\"resolved\":" package-lock.json; then
    RESOLVED_COUNT=$(grep -c "\"resolved\":" package-lock.json)
    echo "   ✅ Generated complete lock file with $RESOLVED_COUNT resolved packages"
else
    echo "   ❌ Lock file appears incomplete!"
    exit 1
fi

echo ""

# Workers API directory  
echo "🔨 Generating workers/api/package-lock.json..."
cd workers/api

if [ -f "package-lock.json" ]; then
    echo "   Removing incomplete lock file..."
    rm package-lock.json
fi

echo "   Running npm install..."
npm install

if grep -q "\"resolved\":" package-lock.json; then
    RESOLVED_COUNT=$(grep -c "\"resolved\":" package-lock.json)
    echo "   ✅ Generated complete lock file with $RESOLVED_COUNT resolved packages"
else
    echo "   ❌ Lock file appears incomplete!"
    exit 1
fi

cd ../..

echo ""
echo "✨ Done! Both lock files have been generated."
echo ""
echo "Next steps:"
echo "  1. Review the changes: git diff package-lock.json workers/api/package-lock.json"
echo "  2. Test the build: npm ci && npm run build"
echo "  3. Test workers: cd workers/api && npm ci"
echo "  4. Commit: git add package-lock.json workers/api/package-lock.json"
echo "  5. Push: git commit -m 'Generate complete package-lock.json files' && git push"
