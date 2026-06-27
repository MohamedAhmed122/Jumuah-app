CREATE TABLE `cached_announcements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`data` text NOT NULL,
	`fetched_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cached_locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`data` text NOT NULL,
	`fetched_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `prayer_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`prayer` text NOT NULL,
	`prayed` integer NOT NULL,
	`logged_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `qada_counters` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`prayer` text NOT NULL,
	`count` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `quiz_scores` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`score` integer NOT NULL,
	`total` integer DEFAULT 20 NOT NULL
);
