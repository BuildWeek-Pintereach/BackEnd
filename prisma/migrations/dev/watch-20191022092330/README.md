# Migration `watch-20191022092330`

This migration has been generated at 10/22/2019, 9:23:30 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "lift"."User" (
  "email" TEXT NOT NULL DEFAULT ''  ,
  "firstname" TEXT NOT NULL DEFAULT ''  ,
  "id" TEXT NOT NULL   ,
  "lastname" TEXT NOT NULL DEFAULT ''  ,
  "password" TEXT NOT NULL DEFAULT ''  ,
  PRIMARY KEY ("id")
);

CREATE TABLE "lift"."Article" (
  "createdAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  "id" TEXT NOT NULL   ,
  "title" TEXT NOT NULL DEFAULT ''  ,
  "updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  "url" TEXT NOT NULL DEFAULT ''  ,
  PRIMARY KEY ("id")
);

CREATE TABLE "lift"."Category" (
  "id" TEXT NOT NULL   ,
  "type" TEXT NOT NULL DEFAULT ''  ,
  PRIMARY KEY ("id")
);

CREATE TABLE "lift"."_ArticleToUser" (
  "A" TEXT    REFERENCES "Article"(id) ON DELETE CASCADE,
  "B" TEXT    REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE TABLE "lift"."_ArticleToCategory" (
  "A" TEXT    REFERENCES "Article"(id) ON DELETE CASCADE,
  "B" TEXT    REFERENCES "Category"(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX "lift"."Category.type" ON "Category"("type")

CREATE UNIQUE INDEX "lift"."_ArticleToUser_AB_unique" ON "_ArticleToUser"("A","B")

CREATE UNIQUE INDEX "lift"."_ArticleToCategory_AB_unique" ON "_ArticleToCategory"("A","B")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..watch-20191022092330
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

You can use a specific Photon built for this migration (watch-20191022092330)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/watch-20191022092330'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
