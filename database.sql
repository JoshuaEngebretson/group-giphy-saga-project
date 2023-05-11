-- CREATE DATABASE "giphy_search_favorites";

-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key

-- Category table
CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

-- Table for favorites that references the category id
CREATE TABLE favorite (
	id SERIAL PRIMARY KEY,
	title VARCHAR (100) NOT NULL,
	image_path VARCHAR NOT NULL,
	category_id INTEGER REFERENCES category
);