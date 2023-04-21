DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios(
    codigo BIGINT(12) PRIMARY KEY NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(30) NOT NULL UNIQUE CHECK (LENGTH(usuario) BETWEEN 4 AND 30),
    correo VARCHAR(100) NOT NULL UNIQUE CHECK (correo REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'),
    contraseña char(64) NOT NULL,
	admin BOOLEAN NOT NULL
);
select * from usuarios;
DROP TABLE IF EXISTS asistencias;
CREATE TABLE asistencias(
	id BIGINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	codigo BIGINT(12) NOT NULL,
    entrada BOOLEAN,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
	FOREIGN KEY (codigo) REFERENCES usuarios (codigo)
);

/* VISTAS */
/*Entrada y salida de un día determinado*/

DROP VIEW IF EXISTS v_entrada_salida;
CREATE VIEW v_entrada_salida AS
SELECT u.codigo, u.nombre, a1.fecha, a1.hora AS entrada, 
       (SELECT MAX(a2.hora) FROM asistencias a2 WHERE a2.codigo = u.codigo AND a2.fecha = a1.fecha AND a2.entrada = false) AS salida
FROM usuarios u
LEFT JOIN asistencias a1 ON u.codigo = a1.codigo AND a1.entrada = true
WHERE a1.fecha IS NOT NULL 
ORDER BY a1.fecha DESC, entrada DESC, salida DESC;




SELECT * FROM v_entrada_salida;


DROP VIEW IF EXISTS v_entrada_salida_hoy;
CREATE VIEW v_entrada_salida_hoy AS
SELECT u.codigo, u.nombre, a1.fecha, a1.hora AS entrada, 
       (SELECT MIN(a2.hora) FROM asistencias a2 WHERE a2.codigo = u.codigo AND a2.fecha = a1.fecha AND a2.hora > a1.hora AND a2.entrada = false) AS salida
FROM usuarios u
LEFT JOIN asistencias a1 ON u.codigo = a1.codigo AND a1.entrada = true AND a1.fecha = CURDATE()
WHERE a1.fecha IS NOT NULL
ORDER BY entrada DESC;

SELECT * FROM v_entrada_salida_hoy;






select CURDATE();
select * from asistencias where codigo=280034563765 order by hora desc;

/* SELECCIONAR DB SYS */
SET GLOBAL time_zone = 'America/Chihuahua';
SET SESSION time_zone = 'America/Chihuahua';
SET @@global.time_zone = 'America/Chihuahua';
SELECT @@global.time_zone, @@session.time_zone;
select * from usuarios;
select * from asistencias where codigo=363705060784;
select * from asistencias;
select curdate();
/* PROCEDIMIENTOS ALMACENADOS */
DROP PROCEDURE IF EXISTS insertar_10_usuarios;
DELIMITER //
CREATE PROCEDURE insertar_10_usuarios()
BEGIN
  DECLARE contador INT DEFAULT 0;

  WHILE contador < 10 DO
    SET contador = contador + 1;
    INSERT INTO usuarios VALUES (100000000004 + contador, CONCAT('usuario', contador), CONCAT('nick', contador), CONCAT('usuario', contador, '@gmail.com'), 'B221D9DBB083A7F33428D7C2A3C3198AE925614D70210E28716CCAA7CD4DDB79', true);
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, true, '2023-04-04', '9:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, false, '2023-04-04', '21:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, true, '2023-04-18', '9:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, false, '2023-04-18', '21:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, true, '2023-04-19', '9:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, false, '2023-04-19', '21:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, true, '2023-03-19', '9:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, false, '2023-03-19', '21:00:00');
  END WHILE;
END //
DELIMITER ;
CALL insertar_10_usuarios();

DROP PROCEDURE IF EXISTS insertar_10_asistencias;
DELIMITER //
CREATE PROCEDURE insertar_10_asistencias()
BEGIN
  DECLARE contador INT DEFAULT 0;

  WHILE contador < 10 DO
    SET contador = contador + 1;
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, true, '2023-04-04', '9:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, false, '2023-04-04', '21:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, true, '2023-04-18', '9:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, false, '2023-04-18', '21:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, true, '2023-04-19', '9:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, false, '2023-04-19', '21:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, true, '2023-02-19', '9:00:00');
	INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000004 + contador, false, '2023-02-19', '21:00:00');
  END WHILE;
END //
DELIMITER ;
CALL insertar_10_asistencias();
/* FUNCIONES */
/*
DROP FUNCTION IF EXISTS generar_codigo;
DELIMITER $$
CREATE FUNCTION generar_codigo() RETURNS BIGINT(12) DETERMINISTIC
BEGIN
  DECLARE codigo BIGINT(12);
  DECLARE intentos INT DEFAULT 0;
  DECLARE max_intentos INT DEFAULT 100; 
  REPEAT
    SET codigo = FLOOR(RAND() * 999999999999);
    SET intentos = intentos + 1;
    IF intentos > max_intentos THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: se han intentado demasiados códigos sin éxito.';
    END IF;
  UNTIL NOT EXISTS(SELECT 1 FROM usuarios WHERE usuarios.codigo = codigo) END REPEAT;

  RETURN codigo;
END$$
DELIMITER ;
*/
select generar_codigo();
select length(generar_codigo());

DROP FUNCTION IF EXISTS generar_codigo;
DELIMITER $$
CREATE FUNCTION generar_codigo() RETURNS BIGINT(12) DETERMINISTIC
BEGIN
  DECLARE codigo BIGINT(12);
  DECLARE intentos INT DEFAULT 0;
  DECLARE max_intentos INT DEFAULT 100; /* Límite máximo de intentos */
  REPEAT
    SET codigo = LPAD(FLOOR(1 + RAND() * 999999999999), 12, '0');
    SET intentos = intentos + 1;
    IF intentos > max_intentos THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: se han intentado demasiados códigos sin éxito.';
    END IF;
  UNTIL NOT EXISTS(SELECT 1 FROM usuarios WHERE usuarios.codigo = codigo) AND LENGTH(codigo) = 12 END REPEAT;

  RETURN codigo;
END$$
DELIMITER ;


/* INSERTS */
/*
insert into usuarios VALUES(100000000001,'Luis Hernández Macías','destructor123','test@gmail.com','B221D9DBB083A7F33428D7C2A3C3198AE925614D70210E28716CCAA7CD4DDB79',true);
insert into usuarios VALUES(100000000002,'Leonel Gonzalez Erives','sacredblades','sacred@gmail.com','B221D9DBB083A7F33428D7C2A3C3198AE925614D70210E28716CCAA7CD4DDB79',true);
insert into usuarios VALUES(100000000003,'test','test','tttt@gmail.com','B221D9DBB083A7F33428D7C2A3C3198AE925614D70210E28716CCAA7CD4DDB79',true);
insert into usuarios VALUES(100000000004,'test2','test2','tttt2@gmail.com','B221D9DBB083A7F33428D7C2A3C3198AE925614D70210E28716CCAA7CD4DDB79',true);
*/
select * from usuarios;
/*
INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000005, true, CURDATE(), '09:00:00');
INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000005, false, CURDATE(), '20:00:00');

INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000006, true, CURDATE(), '09:00:00');
INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000006, false, CURDATE(), '20:00:00');

INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000007, true, CURDATE(), '10:00:00');
INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000007, false, CURDATE(), '18:00:00');
*/
select * from asistencias where year(fecha) = 2022;
INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000008, true, '2022-04-03', '09:00:00');
INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000008, false, '2022-04-03', '20:00:00');

INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000009, true, '2022-04-03', '8:00:00');
INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000009, false, '2022-04-03', '20:00:00');

INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000010, true, '2022-04-03', '8:00:00');
INSERT INTO asistencias (codigo, entrada, fecha, hora) VALUES (100000000010, false, '2022-04-03', '20:00:00');


