CREATE TABLE "tasks" (
		"id" serial primary key, 
		"task" varchar(120) not null,
		"completed" varchar(1) not null
);

INSERT INTO "tasks" ("task", "completed")
VALUES ('Brush teeth', 'N'), ('Take Shower', 'N');