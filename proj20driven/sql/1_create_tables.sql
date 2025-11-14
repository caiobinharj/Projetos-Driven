-- sql/1_create_tables.sql
CREATE TABLE "carriers" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "phones" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"number" TEXT NOT NULL UNIQUE,
	"description" TEXT NOT NULL,
	"document" VARCHAR(11) NOT NULL,
	"carrierId" INTEGER NOT NULL REFERENCES "carriers"("id")
);

CREATE TABLE "recharges" (
	"id" SERIAL PRIMARY KEY,
	"phoneId" INTEGER NOT NULL REFERENCES "phones"("id"),
	"amount" INTEGER NOT NULL,
	"timestamp" TIMESTAMP NOT NULL DEFAULT NOW()
);