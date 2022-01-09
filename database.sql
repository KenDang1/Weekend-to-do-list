-- Tabke info below 👇

CREATE TABLE "tasks"
    (
        "id" SERIAL PRIMARY KEY,
        "task" VARCHAR (30) NOT NULL,
        "description" VARCHAR(200) NOT NULL,
        "status" BOOLEAN DEFAULT FALSE,
    );

INSERT INTO "tasks"
    ("task", "description")
VALUES
    ('To-Do-App', 'weekend homework');