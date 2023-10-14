-- escreva um script SQL para usar o banco de dados genius
-- e criar a tabela de usuários com os atributos: email, senha, is_active, e role_id


-- use genius;

CREATE TABLE IF NOT EXISTS roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS  users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    role_id INTEGER NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE IF NOT EXISTS residences (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    number INTEGER NOT NULL,
    floor INTEGER NOT NULL,
    block INTEGER NOT NULL,
    complement VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS residents (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER,
	residence_id INTEGER NOT NULL, 
	cpf VARCHAR(255) NOT NULL, 
	email VARCHAR(255) NOT NULL, 
	name VARCHAR(255) NOT NULL, 
	last_name VARCHAR(255) NOT NULL, 
	contact VARCHAR(255) NOT NULL,
    birthday DATETIME NOT NULL,
	created_at DATETIME,
	updated_at DATETIME, 
	is_active BOOLEAN NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (residence_id) REFERENCES residences (id)
);

CREATE TABLE IF NOT EXISTS delivery_control (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(255) NOT NULL,
    deliveredAt DATETIME NOT NULL DEFAULT NOW(),
    received DATETIME NOT NULL DEFAULT NOW(),
    resident_id INTEGER NOT NULL,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME ON UPDATE NOW(),
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);

CREATE TABLE IF NOT EXISTS common_area (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL,
    business_hour VARCHAR(255) NOT NULL,
    status boolean NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS reserve_common_area (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    common_area_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    reserve_date DATETIME NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (common_area_id) REFERENCES common_area (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS check_in_common_area (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    common_area_id INTEGER NOT NULL,
    resident_id INTEGER NOT NULL,
    status boolean NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (common_area_id) REFERENCES common_area (id),
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);

CREATE TABLE IF NOT EXISTS posts (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    resident_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    fixed BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);


CREATE TABLE IF NOT EXISTS comments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    post_id INTEGER NOT NULL,
    resident_id INTEGER NOT NULL,
    content VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id),
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);


CREATE TABLE IF NOT EXISTS poll (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    post_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

CREATE TABLE IF NOT EXISTS poll_options (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    poll_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (poll_id) REFERENCES poll (id)
);

-- OPTEI POR CRIAR UMA TABELA DE VOTOS PARA QUE POSSA SER FEITO UM HISTÓRICO DE VOTOS, SEM QUE SEJA NECESSARIO DESSERIALIZAÇÃO PRA FAZER CONSULTAS
CREATE TABLE IF NOT EXISTS poll_votes (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    poll_option_id INTEGER NOT NULL,
    resident_id INTEGER NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (poll_option_id) REFERENCES poll_options (id),
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);

CREATE TABLE IF NOT EXISTS complaints (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    description VARCHAR(255) NOT NULL,
    user_to_complaint_id INTEGER NOT NULL,
    status varchar(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (user_to_complaint_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    type_id INTEGER NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS fast_list (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE TABLE IF NOT EXISTS events (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    notify BOOLEAN NOT NULL,
    date DATETIME NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS guest_list (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    event_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO roles (name) VALUES ('Admin'), ('Resident');

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (101, 1, 'A', 'Apartment 101', NOW(), NOW());

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (202, 2, 'B', 'Apartment 202', NOW(), NOW());

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (303, 3, 'C', 'Apartment 303', NOW(), NOW());

INSERT INTO residents (user_id, residence_id, cpf, email, name, last_name, contact, created_at, updated_at, is_active, birthday)
VALUES (null, 1, '12345678900', 'joao@email.com', 'João', 'Silva', '+55 11 1234-5678', NOW(), NOW(), 1, "2000-01-31");


INSERT INTO residents (user_id, residence_id, cpf, email, name, last_name, contact, created_at, updated_at, is_active, birthday)
VALUES (null, 2, '98765432100', 'maria@email.com', 'Maria', 'Luz', '+55 11 1234-5678', NOW(), NOW(), 1, "2000-01-31");

INSERT INTO delivery_control (status, resident_id) VALUES ('Na portaria', 1);