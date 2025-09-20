variable "cloudflare_api_token" {
  description = "Token API para gestionar recursos Cloudflare"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "ID de cuenta Cloudflare"
  type        = string
}

variable "domain" {
  description = "Dominio raíz para la SaaS"
  type        = string
}

variable "origin_ip" {
  description = "IP pública del ingress/Traefik"
  type        = string
}

variable "r2_bucket" {
  description = "Nombre del bucket R2"
  type        = string
}

variable "supabase_access_token" {
  description = "Token de servicio Supabase"
  type        = string
  sensitive   = true
}

variable "supabase_project_ref" {
  description = "Referencia del proyecto Supabase"
  type        = string
}

variable "supabase_region" {
  description = "Región Supabase"
  type        = string
  default     = "us-east-1"
}

variable "database_password" {
  description = "Password para usuario postgres"
  type        = string
  sensitive   = true
}
