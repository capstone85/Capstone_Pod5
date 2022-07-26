CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    password    TEXT NOT NULL,
    category    TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE store (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    location    TEXT NOT NULL,
    zipcode INT NOT NULL,
    logo        TEXT NOT NULL,
    description TEXT NOT NULL,
    user_id     INT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE product (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    image       TEXT NOT NULL,
    description TEXT NOT NULL,
    price       INT NOT NULL,
    category    TEXT NOT NULL,
    size        TEXT,
    store_id    INT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE
);

CREATE TABLE shoppingCart (
    id          SERIAL PRIMARY KEY,
    user_id     INT NOT NULL,
    product_id  INT NOT NULL,
    quantity    INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

CREATE TABLE checkout (
    id          SERIAL PRIMARY KEY,
    user_id     INT NOT NULL,
    product_id  INT NOT NULL,
    order_id    INT DEFAULT 0,
    status      TEXT DEFAULT 'PROCESSING',
    quantity    INT DEFAULT 1,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

CREATE TABLE wishlist (
    id          SERIAL PRIMARY KEY,
    user_id     INT NOT NULL,
    product_id  INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

CREATE TABLE orderDetails (
    id          SERIAL PRIMARY KEY,
    order_id    INT DEFAULT 0,
    user_id     INT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    address     TEXT NOT NULL,
    zipcode     TEXT NOT NULL,
    city        TEXT NOT NULL,
    number      TEXT NOT NULL,
    email       TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
