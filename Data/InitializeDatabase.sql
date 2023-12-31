-- escreva um script SQL para usar o banco de dados genius
-- e criar a tabela de usuários com os atributos: email, senha, is_active, e role_id

-- use genius;
CREATE DATABASE IF NOT EXISTS genius CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE genius;

SET GLOBAL time_zone = 'America/Sao_Paulo';

CREATE TABLE IF NOT EXISTS roles
(
    id   INTEGER AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS condominiums
(
    id         INTEGER AUTO_INCREMENT PRIMARY KEY,
    name       NVARCHAR(255) NOT NULL,
    phone      NVARCHAR(255) NOT NULL,
    email      NVARCHAR(255) NOT NULL,
    address    NVARCHAR(255) NOT NULL,
    created_at DATETIME      NOT NULL,
    updated_at DATETIME      NOT NULL
);

CREATE TABLE IF NOT EXISTS users
(
    id             INTEGER AUTO_INCREMENT PRIMARY KEY,
    email          NVARCHAR(255) UNIQUE NOT NULL,
    password       NVARCHAR(255)        NOT NULL,
    is_active      BOOLEAN              NOT NULL,
    role_id        INTEGER              NOT NULL,
    condominium_id INTEGER              NOT NULL,
    created_at     DATETIME             NOT NULL,
    updated_at     DATETIME             NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE IF NOT EXISTS administrators
(
    id         INTEGER AUTO_INCREMENT PRIMARY KEY,
    cpf        NVARCHAR(255) NOT NULL,
    email      NVARCHAR(255) NOT NULL,
    name       Nvarchar(255) NOT NULL,
    last_name  Nvarchar(255) NOT NULL,
    user_id    INTEGER,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME ON UPDATE NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS residences
(
    id         INTEGER AUTO_INCREMENT PRIMARY KEY,
    number     INTEGER       NOT NULL,
    floor      INTEGER       NOT NULL,
    block      INTEGER       NOT NULL,
    complement NVARCHAR(255) NOT NULL,
    created_at DATETIME      NOT NULL,
    updated_at DATETIME      NOT NULL
);

CREATE TABLE IF NOT EXISTS residents
(
    id           INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id      INTEGER,
    residence_id INTEGER       NOT NULL,
    cpf          NVARCHAR(255) NOT NULL,
    email        NVARCHAR(255) NOT NULL,
    name         NVARCHAR(255) NOT NULL,
    last_name    NVARCHAR(255) NOT NULL,
    contact      NVARCHAR(255) NOT NULL,
    birthday     DATETIME      NOT NULL,
    device_token VARCHAR(400),
    created_at   DATETIME,
    updated_at   DATETIME,
    is_active    BOOLEAN       NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (residence_id) REFERENCES residences (id)
);

CREATE TABLE IF NOT EXISTS meetings
(
    id          INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id     INTEGER,
    title       NVARCHAR(255) NOT NULL,
    description NVARCHAR(255) NOT NULL,
    date        DATETIME      NOT NULL,
    end_date    DATETIME      NOT NULL,
    hour        NVARCHAR(255) NOT NULL,
    duration    NVARCHAR(255) NOT NULL,
    created_at  DATETIME      NOT NULL,
    updated_at  DATETIME      NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE TABLE IF NOT EXISTS delivery_control
(
    id           INTEGER AUTO_INCREMENT PRIMARY KEY,
    status       NVARCHAR(255) NOT NULL,
    user_id      INTEGER       NOT NULL,
    delivered_at DATETIME,
    received_at  DATETIME      NOT NULL DEFAULT NOW(),
    residence_id INTEGER       NOT NULL,
    created_at   DATETIME      NOT NULL DEFAULT NOW(),
    updated_at   DATETIME ON UPDATE NOW(),
    FOREIGN KEY (residence_id) REFERENCES residences (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS common_area
(
    id            INTEGER AUTO_INCREMENT PRIMARY KEY,
    name          NVARCHAR(255) NOT NULL,
    capacity      INTEGER       NOT NULL,
    business_hour NVARCHAR(255) NOT NULL,
    is_active     boolean       NOT NULL,
    image         text,
    created_at    DATETIME      NOT NULL DEFAULT NOW(),
    updated_at    DATETIME      NOT NULL ON UPDATE NOW()
);

CREATE TABLE IF NOT EXISTS reserve_common_area
(
    id             INTEGER AUTO_INCREMENT PRIMARY KEY,
    common_area_id INTEGER  NOT NULL,
    resident_id    INTEGER  NOT NULL,
    reserve_date   DATETIME NOT NULL,
    created_at     DATETIME NOT NULL DEFAULT NOW(),
    updated_at     DATETIME ON UPDATE NOW(),
    FOREIGN KEY (common_area_id) REFERENCES common_area (id),
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);

CREATE TABLE IF NOT EXISTS guest_list
(
    id         INTEGER AUTO_INCREMENT PRIMARY KEY,
    name       NVARCHAR(255),
    cpf        NVARCHAR(255),
    reserve_id INTEGER  NOT NULL,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME ON UPDATE NOW(),
    FOREIGN KEY (reserve_id) REFERENCES reserve_common_area (id)
);

CREATE TABLE IF NOT EXISTS check_in_common_area
(
    id             INTEGER AUTO_INCREMENT PRIMARY KEY,
    common_area_id INTEGER  NOT NULL,
    resident_id    INTEGER  NOT NULL,
    created_at     DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (common_area_id) REFERENCES common_area (id),
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);

CREATE TABLE IF NOT EXISTS posts
(
    id          INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER       NOT NULL,
    content     NVARCHAR(255) NOT NULL,
    fixed       BOOLEAN       NOT NULL,
    created_at  DATETIME      NOT NULL,
    updated_at  DATETIME      NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE TABLE IF NOT EXISTS comments
(
    id          INTEGER AUTO_INCREMENT PRIMARY KEY,
    post_id     INTEGER       NOT NULL,
    user_id INTEGER       NOT NULL,
    content     NVARCHAR(255) NOT NULL,
    created_at  DATETIME      NOT NULL,
    updated_at  DATETIME      NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE TABLE IF NOT EXISTS polls
(
    id          INTEGER AUTO_INCREMENT PRIMARY KEY,
    post_id     INTEGER       NOT NULL,
    title       NVARCHAR(255) NOT NULL,
    content NVARCHAR(255) NOT NULL,
    created_at  DATETIME      NOT NULL,
    updated_at  DATETIME      NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS poll_options
(
    id                  INTEGER AUTO_INCREMENT PRIMARY KEY,
    poll_id             INTEGER       NOT NULL,
    title               NVARCHAR(255) NOT NULL,
    percentage_of_votes INTEGER,
    quantity_of_votes   INTEGER,
    created_at          DATETIME      NOT NULL,
    updated_at          DATETIME      NOT NULL,
    FOREIGN KEY (poll_id) REFERENCES polls (id)
);

-- OPTEI POR CRIAR UMA TABELA DE VOTOS PARA QUE POSSA SER FEITO UM HISTÓRICO DE VOTOS, SEM QUE SEJA NECESSARIO DESSERIALIZAÇÃO PRA FAZER CONSULTAS
CREATE TABLE IF NOT EXISTS poll_votes
(
    id             INTEGER AUTO_INCREMENT PRIMARY KEY,
    poll_id        INTEGER  NOT NULL,   
    poll_option_id INTEGER  NOT NULL,
    user_id    INTEGER  NOT NULL,
    created_at     DATETIME NOT NULL,
    updated_at     DATETIME NOT NULL,
    FOREIGN KEY (poll_option_id) REFERENCES poll_options (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS complaints
(
    id                        INTEGER AUTO_INCREMENT PRIMARY KEY,
    resident_id               INTEGER      NOT NULL,
    description               text         NOT NULL,
    residence_to_complaint_id INTEGER      NOT NULL,
    status                    varchar(255) NOT NULL,
    created_at                DATETIME     NOT NULL DEFAULT NOW(),
    updated_at                DATETIME     NOT NULL ON UPDATE NOW(),
    FOREIGN KEY (resident_id) REFERENCES residents (id),
    FOREIGN KEY (residence_to_complaint_id) REFERENCES residences (id)
);

CREATE TABLE IF NOT EXISTS notifications
(
    id         INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id    INTEGER       NOT NULL,
    title      NVARCHAR(255) NOT NULL,
    type       NVARCHAR(255) NOT NULL,
    type_id    INTEGER       NOT NULL,
    created_at DATETIME      NOT NULL,
    updated_at DATETIME      NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS fast_lists
(
    id         INTEGER AUTO_INCREMENT PRIMARY KEY,
    name       NVARCHAR(255) NOT NULL,
    contact      NVARCHAR(255) NOT NULL,
    status     BOOLEAN       NOT NULL,
    type       NVARCHAR(255) NOT NULL,
    created_at DATETIME      NOT NULL,
    updated_at DATETIME      NOT NULL
);


CREATE TABLE IF NOT EXISTS events
(
    id          INTEGER AUTO_INCREMENT PRIMARY KEY,
    title       NVARCHAR(255) NOT NULL,
    description NVARCHAR(255) NOT NULL,
    image       NVARCHAR(255) NOT NULL,
    notify      BOOLEAN       NOT NULL,
    date        DATETIME      NOT NULL,
    created_at  DATETIME      NOT NULL,
    updated_at  DATETIME      NOT NULL
);

CREATE TABLE IF NOT EXISTS passord_reset_tokens
(
    id         INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id    INTEGER       NOT NULL,
    token      NVARCHAR(255) NOT NULL,
    created_at DATETIME      NOT NULL,
    updated_at DATETIME      NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO roles (name)
VALUES ('Admin'),
       ('Resident');

INSERT INTO condominiums (name, phone, email, address, created_at, updated_at)
VALUES ('Condomínio Genius', '+55 11 1234-5678', 'condominio.contact@genius.com', 'Rua Genius, 123, São Paulo, SP',
        NOW(), NOW());

INSERT INTO users(email, password, is_active, role_id, condominium_id)
VALUES ('admin@condogenius.com.br', '$2a$08$ADN2NQayLDfUlWDRPOUTgu6w3KMUsTmnLYf07vxRLYZ0s592hb7f2', 1, 1, 1);

INSERT INTO users(email, password, is_active, role_id, condominium_id)
VALUES ('gurgaczzhellen@gmail.com', '$2a$08$ADN2NQayLDfUlWDRPOUTgu6w3KMUsTmnLYf07vxRLYZ0s592hb7f2', 1, 2, 1);

INSERT INTO users(email, password, is_active, role_id, condominium_id)
VALUES ('rapha_2gtba@hotmail.com', '$2a$08$ADN2NQayLDfUlWDRPOUTgu6w3KMUsTmnLYf07vxRLYZ0s592hb7f2', 1, 2, 1);

INSERT INTO users(email, password, is_active, role_id, condominium_id)
VALUES ('igor.m99@hotmail.com', '$2a$08$ADN2NQayLDfUlWDRPOUTgu6w3KMUsTmnLYf07vxRLYZ0s592hb7f2', 1, 2, 1);

INSERT INTO fast_lists (name, contact, status, type, created_at, updated_at) 
VALUES ('Gas Company', '41 99678-8651', 1, 'gas', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO fast_lists (name, contact, status, type, created_at, updated_at) 
VALUES ('Emergência', '911', 1, 'emergencia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO fast_lists (name, contact, status, type, created_at, updated_at) 
VALUES ('Hospital Erastinho', '41 9872-1782', 1, 'hospitais', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO fast_lists (name, contact, status, type, created_at, updated_at) 
VALUES ('Polícia', '999', 1, 'ermegencia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO administrators (user_id, cpf, email, name, last_name)
VALUES (1, '10412515090', 'admin@condogenius.com.br', 'Hellen', 'Gurgacz');

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (101, 1, 'A', 'Apartment 101', NOW(), NOW());

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (202, 2, 'B', 'Apartment 202', NOW(), NOW());

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (303, 3, 'C', 'Apartment 303', NOW(), NOW());

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (304, 3, 'D', 'Apartment 304', NOW(), NOW());

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (404, 4, 'C', 'Apartment 404', NOW(), NOW());

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (405, 4, 'C', 'Apartment 405', NOW(), NOW());

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (203, 2, 'B', 'Apartment 203', NOW(), NOW());

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (100, 1, 'A', 'Apartment 100', NOW(), NOW());

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (2, 2, '98765432100', 'gurgaczzhellen@gmail.com', 'lalalala', 'Hellen', 'Gurgacz', '+55 11 1234-5678', NOW(), NOW(), 1,
        "2000-01-31");

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (3, 3, '11122233344', 'rapha_2gtba@hotmail.com', 'fT8LTrRjSEec71ZGZ8HjrF:APA91bGc3xwrLVMraOaQLb4K6IU5rVaxIMQSaUP-_6xKDS7r90_bR4_qNtLI5I8bYjbhznFa-9KOskjVQO4mfx3y5zfQlMjPEeJYXLyu5XZnO1xNIggMHpQsbgsNd8DGt79MNOfFiv9Z', 'Raphael', 'Marangoni', '+55 11 9876-5432', NOW(), NOW(), 1,
        '1995-08-15');

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (4, 4, '55566677788', 'igor.m99@hotmail.com', 'coj9r6SPTeGhzktthAsHHR:APA91bEpsNkgBIXr3S8-JcBJuJfwHfTjBzSSs5oE1xl_ImZ71yqvQmX-uLZwxj-Mp7hctjcYVISyMdSQ9qXs6S3daypUvHQkeWj9M-WuoGv1H_YFEzA3ZIBcmp1tzc2E1BBQlqq6YRf7', 'Igor', 'Mucharski', '+55 11 5555-1234', NOW(), NOW(), 1,
        '1999-03-23');

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (null, 5, '99900011122', 'escobar@email.com', 'lalalala', 'Leandro', 'Escobar', '+55 11 9876-8765', NOW(), NOW(), 1,
        '1990-12-10');

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (null, 6, '33322211144', 'briatore@email.com', 'lalalala', 'Geucimar', 'Briatore', '+55 11 8765-4321', NOW(), NOW(),
        1, '1993-05-28');

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (null, 7, '77788899911', 'inocencio@email.com', 'lalalala', 'Fábio', 'Inocêncio', '+55 11 7777-9876', NOW(), NOW(),
        1, '1986-09-17');


INSERT INTO delivery_control (status, user_id, residence_id)
VALUES ('Na portaria', 1, 2);

INSERT INTO delivery_control (status, user_id, residence_id)
VALUES ('Na portaria', 1, 3);

INSERT INTO delivery_control (status, user_id, residence_id, delivered_at)
VALUES ('Entregue', 1, 2, NOW());

INSERT INTO meetings (user_id, title, description, date, hour, duration, created_at, updated_at)
VALUES (1, 'Reunião do Conselho', 'Discussão de assuntos financeiros', '2023-11-10', '15:00', '02:00', NOW(), NOW());

INSERT INTO meetings (user_id, title, description, date, hour, duration, created_at, updated_at)
VALUES (1, 'Assembleia Geral', 'Revisão das regras da comunidade', '2023-11-15', '18:30', '01:00',  NOW(), NOW());

INSERT INTO meetings (user_id, title, description, date, hour, duration, created_at, updated_at)
VALUES (1, 'Reunião do Comitê de Segurança', 'Discussão de preocupações de segurança', '2023-11-20', '16:45', '00:30', NOW(),
        NOW());

INSERT INTO meetings (user_id, title, description, date, hour, duration, created_at, updated_at)
VALUES (1, 'Reunião do Comitê de Pais', 'Planejamento de eventos para crianças', '2023-11-25', '14:00', '02:00', NOW(), NOW());


INSERT INTO `genius`.`complaints` (`id`, `resident_id`, `description`, `residence_to_complaint_id`, `status`,
                                   `created_at`, `updated_at`)
VALUES (1, 2, 'Crianças jogando bola até tarde da noite todos os dias, atingindo meu quintal.', 2, 'analysis',
        '2023-10-25 17:53:56', '0000-00-00 00:00:00');

INSERT INTO `genius`.`complaints` (`id`, `resident_id`, `description`, `residence_to_complaint_id`, `status`,
                                   `created_at`, `updated_at`)
VALUES (2, 2, 'Música até tarde muito alta no vizinho.', 2, 'notified', '2023-10-25 17:53:56', '0000-00-00 00:00:00');

INSERT INTO `genius`.`complaints` (`id`, `resident_id`, `description`, `residence_to_complaint_id`, `status`,
                                   `created_at`, `updated_at`)
VALUES (3, 3, 'Barulho alto vindo do apartamento ao lado.', 3, 'disapproved', '2023-10-25 18:10:00',
        '0000-00-00 00:00:00');