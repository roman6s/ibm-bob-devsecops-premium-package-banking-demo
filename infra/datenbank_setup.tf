# Terraform Konfiguration für die Konten-Datenbank (PostgreSQL)

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1" # Frankfurt (Standard für deutsche Finanzinstitute)
}

# Demo-Schwachstelle 4 (IaC / Fehlkonfiguration):
# 1. Unverschlüsselte Festplatte (storage_encrypted = false)
# 2. Öffentlich erreichbare Datenbank (publicly_accessible = true)
# Wird von Bob DevSecOps (KICS & Trivy Scanner) sofort rot markiert.
resource "aws_db_instance" "konten_datenbank" {
  identifier          = "konten-datenbank-prod"
  engine              = "postgres"
  engine_version      = "15.4"
  instance_class      = "db.t4g.medium"
  allocated_storage   = 50
  
  # SICHERHEITSRISIKO: Verschlüsselung deaktiviert!
  storage_encrypted   = false
  
  # SICHERHEITSRISIKO: Öffentlich erreichbar im Internet!
  publicly_accessible = true
  
  db_name             = "kontendb"
  username            = "dbadmin"
  password            = "REPLACE_WITH_SECURE_VAULT_SECRET_123" # Demo-Platzhalter
  
  skip_final_snapshot = true
}

# SICHERHEITSRISIKO: Offene Firewall für die ganze Welt (0.0.0.0/0)
resource "aws_security_group" "datenbank_firewall" {
  name        = "konten-datenbank-sg"
  description = "Zugriff auf Konten-Datenbank"

  ingress {
    description = "Offener PostgreSQL Port"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Offen für jeden Angreifer
  }
}
