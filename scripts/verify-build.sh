#!/bin/bash

# Verify Build Script - Checks build output for common issues
# This script ensures the build is production-ready

set -e

echo "🔍 Verifying build output..."

# Check if dist directory exists
if [ ! -d "dist" ]; then
  echo "❌ Error: dist directory not found"
  exit 1
fi

echo "✅ dist directory exists"

# Check for index.html
if [ ! -f "dist/index.html" ]; then
  echo "❌ Error: index.html not found in dist"
  exit 1
fi

echo "✅ index.html exists"

# Check for assets directory
if [ ! -d "dist/assets" ]; then
  echo "❌ Error: assets directory not found in dist"
  exit 1
fi

echo "✅ assets directory exists"

# Check for at least one JS file
JS_COUNT=$(find dist/assets -name "*.js" -type f | wc -l)
if [ "$JS_COUNT" -eq 0 ]; then
  echo "❌ Error: No JavaScript files found in dist/assets"
  exit 1
fi

echo "✅ Found $JS_COUNT JavaScript file(s)"

# Check for at least one CSS file
CSS_COUNT=$(find dist/assets -name "*.css" -type f | wc -l)
if [ "$CSS_COUNT" -eq 0 ]; then
  echo "⚠️  Warning: No CSS files found in dist/assets"
else
  echo "✅ Found $CSS_COUNT CSS file(s)"
fi

# Check index.html references
if ! grep -q '<script' dist/index.html; then
  echo "❌ Error: No script tags found in index.html"
  exit 1
fi

echo "✅ index.html contains script references"

# Display build summary
echo ""
echo "📊 Build Summary:"
echo "  Total files: $(find dist -type f | wc -l)"
echo "  JavaScript files: $JS_COUNT"
echo "  CSS files: $CSS_COUNT"
echo "  Build size: $(du -sh dist | cut -f1)"

echo ""
echo "✅ Build verification complete!"
