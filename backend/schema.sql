CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS device (
    id SERIAL PRIMARY KEY,
    serial_code VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES category(id)
);


CREATE TABLE IF NOT EXISTS component (
    id SERIAL PRIMARY KEY,
    serial_code VARCHAR(255),
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS device_component (
    device_id INTEGER NOT NULL REFERENCES device(id),
    component_id INTEGER NOT NULL REFERENCES component(id),
    PRIMARY KEY (device_id, component_id)
);

CREATE TABLE IF NOT EXISTS diagnostic (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    device_id INTEGER NOT NULL REFERENCES device(id)
);

CREATE TABLE IF NOT EXISTS issue (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    diagnostic_id INTEGER NOT NULL REFERENCES diagnostic(id),
    component_id INTEGER REFERENCES component(id)
);

CREATE TABLE IF NOT EXISTS solution (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    issue_id INTEGER NOT NULL REFERENCES issue(id)
);