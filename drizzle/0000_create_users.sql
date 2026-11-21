CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"email" text NOT NULL,
	"email_notifications" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
