CREATE DATABASE covid;

CREATE TABLE requests (
    request_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    request VARCHAR(255),
    response JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)