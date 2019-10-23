# Migration `20191023120553-init`

This migration has been generated at 10/23/2019, 12:05:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20191023120553-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,34 @@
+generator photon {
+  provider = "photonjs"
+}
+
+datasource db {
+  provider = "sqlite"
+  url      = "file:dev.db"
+}
+
+model User {
+  id         String  @default(cuid()) @id
+  firstname  String
+  lastname   String
+  email      String 
+  articles   Article[]
+  password   String
+}
+
+model Article {
+  id          String   @default(cuid()) @id
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+  title       String
+  url         String
+  creator     User[]
+  categories  Category[] 
+}
+
+model Category {
+ id        String   @default(cuid()) @id
+ type      String @unique
+ articles  Article[]
+}
+
```

## Photon Usage

You can use a specific Photon built for this migration (20191023120553-init)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191023120553-init'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
