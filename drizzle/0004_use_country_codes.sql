-- Countries are now ISO 3166-1 alpha-2 codes picked from a list (src/data/places.ts).
UPDATE "groups" SET "country" = 'US' WHERE "country" IN ('USA', 'United States');
