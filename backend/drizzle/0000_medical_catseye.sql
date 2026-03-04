CREATE TABLE "candidates" (
	"id" integer PRIMARY KEY NOT NULL,
	"fullName" varchar(255),
	"jobTitle" varchar(255),
	"email" varchar(255),
	"phone" varchar(50),
	"location" varchar(255),
	"gitHubURL" varchar(512),
	"linkedInURL" varchar(512),
	"websiteURL" varchar(512),
	"imageURL" varchar(512),
	"bio" text
);
--> statement-breakpoint
CREATE TABLE "certifications" (
	"candidateId" integer PRIMARY KEY NOT NULL,
	"certificationName" varchar(255),
	"issuer" text,
	"Date" timestamp,
	"credentianlURL" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "education" (
	"candidateId" integer PRIMARY KEY NOT NULL,
	"institution" varchar(255),
	"degree" varchar(255),
	"field" varchar(255),
	"start_date" timestamp,
	"end_date" timestamp,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "expericenes" (
	"candidateId" integer PRIMARY KEY NOT NULL,
	"role" varchar(255),
	"company" varchar(255),
	"start_date" timestamp,
	"end_date" timestamp,
	"currentltyWorkHere" boolean,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"candidateId" integer PRIMARY KEY NOT NULL,
	"projectTitle" varchar(255),
	"description" text,
	"techStack" text,
	"gitHubURL" varchar(512),
	"liveURL" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "recommendations" (
	"candidateId" integer PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"role" text,
	"recommendation" text
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"candidateId" integer PRIMARY KEY NOT NULL,
	"skillName" varchar(255),
	"category" integer,
	"level" integer,
	"description" text
);
