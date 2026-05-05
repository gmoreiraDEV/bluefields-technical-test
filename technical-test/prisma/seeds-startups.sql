BEGIN;

DELETE FROM "StartupUpdate";
DELETE FROM "Startup";

INSERT INTO "Startup" ("id", "name", "segment", "stage", "bluefieldsOwner", "riskLevel", "createdAt", "updatedAt")
VALUES
  ('stp_nimbuspay', 'NimbusPay', 'Fintech B2B', 'Seed', 'Marina Costa', 'GREEN', NOW(), NOW()),
  ('stp_heliosai', 'Helios AI', 'SaaS de IA', 'Series A', 'Lucas Ferreira', 'YELLOW', NOW(), NOW()),
  ('stp_farmgrid', 'FarmGrid', 'AgTech', 'Pre-Seed', 'Ana Ribeiro', 'GREEN', NOW(), NOW()),
  ('stp_logiflow', 'LogiFlow', 'Logística', 'Seed', 'Pedro Martins', 'RED', NOW(), NOW()),
  ('stp_caresync', 'CareSync', 'HealthTech', 'Series A', 'Marina Costa', 'YELLOW', NOW(), NOW()),
  ('stp_greenledger', 'GreenLedger', 'Climate Tech', 'Seed', 'João Souza', 'GREEN', NOW(), NOW()),
  ('stp_retailmind', 'RetailMind', 'Retail Tech', 'Pre-Seed', 'Lucas Ferreira', 'YELLOW', NOW(), NOW()),
  ('stp_workmesh', 'WorkMesh', 'HR Tech', 'Seed', 'Ana Ribeiro', 'GREEN', NOW(), NOW());

COMMIT;
