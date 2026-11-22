CREATE TABLE "groups" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"sport" text NOT NULL,
	"city" text,
	"state" text,
	"country" text,
	"description" text NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"links" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"image" text,
	"banner" text,
	"owner_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
