# Migration `watch-20191021225212`

This migration has been generated at 10/21/2019, 10:52:12 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "lift"."Category.type" ON "Category"("type")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration watch-20191021143529..watch-20191021225212
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
@@ -24,8 +24,8 @@
 }
 model Category {
  id        String   @default(cuid()) @id
- type      String 
+ type      String @unique
  articles  Article[]
 }
```

## Photon Usage

You can use a specific Photon built for this migration (watch-20191021225212)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/watch-20191021225212'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
