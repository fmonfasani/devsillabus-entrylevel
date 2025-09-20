terraform {
  required_version = ">= 1.5.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.31"
    }
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "supabase" {
  access_token = var.supabase_access_token
  project_ref  = var.supabase_project_ref
}

resource "cloudflare_zone" "main" {
  account_id = var.cloudflare_account_id
  zone       = var.domain
}

resource "cloudflare_record" "app" {
  zone_id = cloudflare_zone.main.id
  name    = "app"
  value   = var.origin_ip
  type    = "A"
  proxied = true
  ttl     = 1
}

resource "cloudflare_r2_bucket" "assets" {
  account_id = var.cloudflare_account_id
  name       = var.r2_bucket
  location   = "us-east-1"
}

resource "supabase_project" "saas" {
  name               = "saas-devops"
  region             = var.supabase_region
  database_password  = var.database_password
  raw_sql            = file("${path.module}/sql/policies.sql")
}
