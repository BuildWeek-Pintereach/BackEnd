# Migration `20191023131236-yolo`

This migration has been generated at 10/23/2019, 1:12:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "lift"."new_User" (
  "email" TEXT NOT NULL DEFAULT ''  ,
  "firstname" TEXT NOT NULL DEFAULT ''  ,
  "friends" TEXT NOT NULL DEFAULT ''  ,
  "id" TEXT NOT NULL   ,
  "lastname" TEXT NOT NULL DEFAULT ''  ,
  "password" TEXT NOT NULL DEFAULT ''  ,
  PRIMARY KEY ("id")
);

INSERT INTO "new_User" ("email","firstname","id","lastname","password") SELECT "email","firstname","id","lastname","password" from "User"

DROP TABLE "lift"."User";

ALTER TABLE "lift"."new_User" RENAME TO "User";

PRAGMA "lift".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191023120553-init..20191023131236-yolo
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:dev.db"
 }
 model User {
   id         String  @default(cuid()) @id
@@ -13,8 +13,9 @@
   lastname   String
   email      String 
   articles   Article[]
   password   String
+  friends    String
 }
 model Article {
   id          String   @default(cuid()) @id
```

## Photon Usage

You can use a specific Photon built for this migration (20191023131236-yolo)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191023131236-yolo'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
