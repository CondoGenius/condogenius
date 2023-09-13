-- escreva um script SQL para usar o banco de dados genius
-- e criar a tabela de usuários com os atributos: email, senha, is_active, e role_id


-- use genius;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE residents (
    user_id (int) NOT NULL FOREIGN KEY,
	residence_id (int) NOT NULL, 
	cpf_cnpj varchar(20) NOT NULL, 
	email varchar(255) NOT NULL, 
	name varchar(255) NOT NULL, 
	last_name varchar(255) NOT NULL, 
	contact varchar(20) NOT NULL, 
	created_at datetime,
	updated_at datetime, 
	is_active boolean NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
)

CREATE TABLE residences (
    id SERIAL PRIMARY KEY,
    number INTEGER NOT NULL,
    floor INTEGER NOT NULL,
    block INTEGER NOT NULL,
    complement VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
);

CREATE TABLE delivery_control (
    id SERIAL PRIMARY KEY,
    resident_id INTEGER NOT NULL FOREIGN KEY,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    received BOOLEAN NOT NULL,
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);

CREATE TABLE common_area (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL,
    business_hour VARCHAR(255) NOT NULL,
    status boolean NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE reserve_common_area (
    id SERIAL PRIMARY KEY,
    common_area_id INTEGER NOT NULL FOREIGN KEY,
    user_id INTEGER NOT NULL FOREIGN KEY,
    reserve_date DATETIME NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (common_area_id) REFERENCES common_area (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE check_in_common_area (
    id SERIAL PRIMARY KEY,
    common_area_id INTEGER NOT NULL FOREIGN KEY,
    resident_id INTEGER NOT NULL FOREIGN KEY,
    status boolean NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (common_area_id) REFERENCES common_area (id),
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    resident_id INTEGER NOT NULL FOREIGN KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    fixed BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);


CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL FOREIGN KEY,
    resident_id INTEGER NOT NULL FOREIGN KEY,
    content VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id),
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);


CREATE TABLE poll (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL FOREIGN KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

CREATE TABLE poll_options (
    id SERIAL PRIMARY KEY,
    poll_id INTEGER NOT NULL FOREIGN KEY,
    title VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (poll_id) REFERENCES poll (id)
);

-- OPTEI POR CRIAR UMA TABELA DE VOTOS PARA QUE POSSA SER FEITO UM HISTÓRICO DE VOTOS, SEM QUE SEJA NECESSARIO DESSERIALIZAÇÃO PRA FAZER CONSULTAS
CREATE TABLE poll_votes (
    id SERIAL PRIMARY KEY,
    poll_option_id INTEGER NOT NULL FOREIGN KEY,
    resident_id INTEGER NOT NULL FOREIGN KEY,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (poll_option_id) REFERENCES poll_options (id),
    FOREIGN KEY (resident_id) REFERENCES residents (id)
);

CREATE TABLE complaints (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL FOREIGN KEY,
    description VARCHAR(255) NOT NULL,
    user_to_complaint_id INTEGER NOT NULL FOREIGN KEY,
    status varchar(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (user_to_complaint_id) REFERENCES users (id)
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL FOREIGN KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    type_id INTEGER NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE fast_list (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL FOREIGN KEY,
    status BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    notify BOOLEAN NOT NULL,
    date DATETIME NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE guest_list (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL FOREIGN KEY,
    user_id INTEGER NOT NULL FOREIGN KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);
)