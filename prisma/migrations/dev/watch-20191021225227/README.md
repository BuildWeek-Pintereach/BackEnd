# Migration `watch-20191021225227`

This migration has been generated at 10/21/2019, 10:52:27 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "lift"."new_User" (
  "id" TEXT NOT NULL   ,
  "password" TEXT NOT NULL DEFAULT ''  ,
  "username" TEXT NOT NULL DEFAULT ''  ,
  PRIMARY KEY ("id")
);

INSERT INTO "new_User" ("id","username") SELECT "id","username" from "User"

DROP TABLE "lift"."User";

ALTER TABLE "lift"."new_User" RENAME TO "User";

CREATE UNIQUE INDEX "lift"."User.username" ON "User"("username")

PRAGMA "lift".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration watch-20191021225212..watch-20191021225227
--- datamodel.dml
+++ datamodel.dml
@@ -3,15 +3,16 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:dev.db"
 }
 model User {
   id         String  @default(cuid()) @id
   username   String @unique
   articles   Article[]
+  password   String
 }
 model Article {
   id          String   @default(cuid()) @id
```

## Photon Usage

You can use a specific Photon built for this migration (watch-20191021225227)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/watch-20191021225227'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
