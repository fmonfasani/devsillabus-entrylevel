#!/usr/bin/env bash
set -euo pipefail

if ! command -v trivy >/dev/null 2>&1; then
  echo "Trivy no está instalado" >&2
  exit 1
fi

trivy fs --exit-code 1 --severity HIGH,CRITICAL --ignore-unfixed .
