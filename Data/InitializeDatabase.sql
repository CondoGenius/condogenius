-- escreva um script SQL para usar o banco de dados genius
-- e criar a tabela de usuários com os atributos: email, senha, is_active, e role_id

-- use genius;

ALTER DATABASE genius DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS roles
(
    id   INTEGER AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users
(
    id         INTEGER AUTO_INCREMENT PRIMARY KEY,
    email      NVARCHAR(255) UNIQUE NOT NULL,
    password   NVARCHAR(255)        NOT NULL,
    is_active  BOOLEAN              NOT NULL,
    role_id    INTEGER              NOT NULL,
    created_at DATETIME             NOT NULL,
    updated_at DATETIME             NOT NULL,
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
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT           NOT NULL,
    title       NVARCHAR(255) NOT NULL,
    description NVARCHAR(255) NOT NULL,
    date        DATETIME      NOT NULL,
    end_date    DATETIME      NOT NULL,
    hour        NVARCHAR(255) NOT NULL,
    duration    NVARCHAR(255) NOT NULL,
    created_at  DATETIME      NOT NULL,
    updated_at  DATETIME      NOT NULL
);


CREATE TABLE IF NOT EXISTS delivery_control
(
    id           INTEGER AUTO_INCREMENT PRIMARY KEY,
    status       NVARCHAR(255) NOT NULL,
    user_id      INTEGER       NOT NULL,
    delivered_at DATETIME      NOT NULL DEFAULT NOW(),
    received_at  DATETIME               DEFAULT NOW(),
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
    status         boolean  NOT NULL,
    created_at     DATETIME NOT NULL,
    FOREIGN KEY (common_area_id) REFERENCES common_area (id),
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);

CREATE TABLE IF NOT EXISTS posts
(
    id          INTEGER AUTO_INCREMENT PRIMARY KEY,
    resident_id INTEGER       NOT NULL,
    title       NVARCHAR(255) NOT NULL,
    content     NVARCHAR(255) NOT NULL,
    fixed       BOOLEAN       NOT NULL,
    created_at  DATETIME      NOT NULL,
    updated_at  DATETIME      NOT NULL,
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);


CREATE TABLE IF NOT EXISTS comments
(
    id          INTEGER AUTO_INCREMENT PRIMARY KEY,
    post_id     INTEGER       NOT NULL,
    resident_id INTEGER       NOT NULL,
    content     NVARCHAR(255) NOT NULL,
    created_at  DATETIME      NOT NULL,
    updated_at  DATETIME      NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id),
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);


CREATE TABLE IF NOT EXISTS poll
(
    id          INTEGER AUTO_INCREMENT PRIMARY KEY,
    post_id     INTEGER       NOT NULL,
    title       NVARCHAR(255) NOT NULL,
    description NVARCHAR(255) NOT NULL,
    created_at  DATETIME      NOT NULL,
    updated_at  DATETIME      NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

CREATE TABLE IF NOT EXISTS poll_options
(
    id         INTEGER AUTO_INCREMENT PRIMARY KEY,
    poll_id    INTEGER       NOT NULL,
    title      NVARCHAR(255) NOT NULL,
    created_at DATETIME      NOT NULL,
    updated_at DATETIME      NOT NULL,
    FOREIGN KEY (poll_id) REFERENCES poll (id)
);

-- OPTEI POR CRIAR UMA TABELA DE VOTOS PARA QUE POSSA SER FEITO UM HISTÓRICO DE VOTOS, SEM QUE SEJA NECESSARIO DESSERIALIZAÇÃO PRA FAZER CONSULTAS
CREATE TABLE IF NOT EXISTS poll_votes
(
    id             INTEGER AUTO_INCREMENT PRIMARY KEY,
    poll_option_id INTEGER  NOT NULL,
    resident_id    INTEGER  NOT NULL,
    created_at     DATETIME NOT NULL,
    updated_at     DATETIME NOT NULL,
    FOREIGN KEY (poll_option_id) REFERENCES poll_options (id),
    FOREIGN KEY (resident_id) REFERENCES residents (id)
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

CREATE TABLE IF NOT EXISTS fast_list
(
    id         INTEGER AUTO_INCREMENT PRIMARY KEY,
    name       NVARCHAR(255) NOT NULL,
    phone      NVARCHAR(255) NOT NULL,
    user_id    INTEGER       NOT NULL,
    status     BOOLEAN       NOT NULL,
    created_at DATETIME      NOT NULL,
    updated_at DATETIME      NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
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

INSERT INTO roles (name)
VALUES ('Admin'),
       ('Resident');

INSERT INTO users(email, password, is_active, role_id)
VALUES ('admin@condogenius.com.br', '$2a$08$ADN2NQayLDfUlWDRPOUTgu6w3KMUsTmnLYf07vxRLYZ0s592hb7f2', 1, 1);

INSERT INTO users(email, password, is_active, role_id)
VALUES ('maria@email.com', '$2a$08$ADN2NQayLDfUlWDRPOUTgu6w3KMUsTmnLYf07vxRLYZ0s592hb7f2', 1, 2);

INSERT INTO users(email, password, is_active, role_id)
VALUES ('carlos@email.com', '$2a$08$ADN2NQayLDfUlWDRPOUTgu6w3KMUsTmnLYf07vxRLYZ0s592hb7f2', 1, 2);

INSERT INTO administrators (user_id, cpf, email, name, last_name)
VALUES (1, '10412515090', 'admin@condogenius.com.br', 'Hellen', 'Gurgacz');

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (101, 1, 'A', 'Apartment 101', NOW(), NOW());

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (202, 2, 'B', 'Apartment 202', NOW(), NOW());

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (303, 3, 'C', 'Apartment 303', NOW(), NOW());

INSERT INTO residences (number, floor, block, complement, created_at, updated_at)
VALUES (303, 3, 'D', 'Apartment 304', NOW(), NOW());

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
VALUES (1, 1, '12345678900', 'joao@email.com', 'lalalla', 'João', 'Silva', '+55 11 1234-5678', NOW(), NOW(), 1,
        "2000-01-31");

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (2, 2, '98765432100', 'maria@email.com', 'lalalala', 'Maria', 'Luz', '+55 11 1234-5678', NOW(), NOW(), 1,
        "2000-01-31");

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (3, 3, '11122233344', 'carlos@email.com', 'lalalala', 'Carlos', 'Martinez', '+55 11 9876-5432', NOW(), NOW(), 1,
        '1995-08-15');

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (null, 4, '55566677788', 'ana@email.com', 'lalalala', 'Ana', 'Pereira', '+55 11 5555-1234', NOW(), NOW(), 1,
        '1988-03-22');

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (null, 5, '99900011122', 'pedro@email.com', 'lalalala', 'Pedro', 'Ferreira', '+55 11 9876-8765', NOW(), NOW(), 1,
        '1990-12-10');

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (null, 6, '33322211144', 'laura@email.com', 'lalalala', 'Laura', 'Rodriguez', '+55 11 8765-4321', NOW(), NOW(),
        1, '1993-05-28');

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (null, 7, '77788899911', 'gabriel@email.com', 'lalalala', 'Gabriel', 'Santos', '+55 11 7777-9876', NOW(), NOW(),
        1, '1986-09-17');

INSERT INTO residents (user_id, residence_id, cpf, email, device_token, name, last_name, contact, created_at,
                       updated_at, is_active, birthday)
VALUES (null, 8, '44455566677', 'isabela@email.com', 'lalalala', 'Isabela', 'Oliveira', '+55 11 5555-6789', NOW(),
        NOW(), 1, '1998-11-03');


INSERT INTO delivery_control (status, user_id, residence_id)
VALUES ('Na portaria', 1, 2);

INSERT INTO delivery_control (status, user_id, residence_id)
VALUES ('Na portaria', 1, 3);

INSERT INTO delivery_control (status, user_id, residence_id)
VALUES ('Entregue', 1, 2);

INSERT INTO meetings (user_id, title, description, date, hour, created_at, updated_at)
VALUES (1, 'Reunião do Conselho', 'Discussão de assuntos financeiros', '2023-11-10', '15:00', NOW(), NOW());

INSERT INTO meetings (user_id, title, description, date, hour, created_at, updated_at)
VALUES (1, 'Assembleia Geral', 'Revisão das regras da comunidade', '2023-11-15', '18:30', NOW(), NOW());

INSERT INTO meetings (user_id, title, description, date, hour, created_at, updated_at)
VALUES (1, 'Reunião do Comitê de Segurança', 'Discussão de preocupações de segurança', '2023-11-20', '16:45', NOW(),
        NOW());

INSERT INTO meetings (user_id, title, description, date, hour, created_at, updated_at)
VALUES (1, 'Reunião do Comitê de Pais', 'Planejamento de eventos para crianças', '2023-11-25', '14:00', NOW(), NOW());


INSERT INTO `genius`.`complaints` (`id`, `resident_id`, `description`, `residence_to_complaint_id`, `status`,
                                   `created_at`, `updated_at`)
VALUES (1, 2, 'Crianças jogando bola até tarde da noite todos os dias, atingindo meu quintal.', 2, 'analysis',
        '2023-10-25 17:53:56', '0000-00-00 00:00:00');

INSERT INTO `genius`.`complaints` (`id`, `resident_id`, `description`, `residence_to_complaint_id`, `status`,
                                   `created_at`, `updated_at`)
VALUES (2, 2, 'Música até tarde muito alta no vizinho.', 2, 'notified', '2023-10-25 17:53:56', '0000-00-00 00:00:00');

INSERT INTO `genius`.`complaints` (`id`, `resident_id`, `description`, `residence_to_complaint_id`, `status`,
                                   `created_at`, `updated_at`)
VALUES (3, 3, 'Barulho alto vindo do apartamento ao lado.', 3, 'disapproved ', '2023-10-25 18:10:00',
        '0000-00-00 00:00:00');


