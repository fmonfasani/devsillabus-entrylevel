output "supabase_connection_string" {
  description = "Cadena de conexión para la base de datos Supabase"
  value       = supabase_project.saas.database.connection_string
  sensitive   = true
}

output "r2_bucket_name" {
  description = "Nombre del bucket R2 creado"
  value       = cloudflare_r2_bucket.assets.name
}

output "cloudflare_zone_id" {
  description = "ID de la zona de Cloudflare"
  value       = cloudflare_zone.main.id
}
