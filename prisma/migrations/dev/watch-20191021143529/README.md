# Migration `watch-20191021143529`

This migration has been generated at 10/21/2019, 2:35:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "lift"."User.username" ON "User"("username")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration watch-20191021143519..watch-20191021143529
--- datamodel.dml
+++ datamodel.dml
@@ -3,14 +3,14 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:dev.db"
 }
 model User {
   id         String  @default(cuid()) @id
-  username   String 
+  username   String @unique
   articles   Article[]
 }
 model Article {
```

## Photon Usage

You can use a specific Photon built for this migration (watch-20191021143529)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/watch-20191021143529'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
