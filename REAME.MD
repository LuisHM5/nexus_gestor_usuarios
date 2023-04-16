### Requiere tener los programas o herramientas instaladas

1. Composer
2. Node
3. NPM
4. PHP
5. MYSQL

# Base de datos

Correr script en

```
nexus_gestor_usuarios\users_api_restfull_php_laravel\sql\DB_USUARIOS
```

# Backend API php laravel

### Instalar dependencias

```
composer install
```

### Iniciar servidor api

```
php artisan serve
```

# Frontend Reactjs

```
npm install
```

### Iniciar servidor front

```
npm run dev
```

### usuarios de prueba son

```
[
            [
                'nombre' => 'Luis Hernández Macías',
                'usuario' => 'admin',
                'correo' => 'admin@gmail.com',
                'contraseña' => 'adminadmin',
                'admin' => true,
            ],
            [
                'nombre' => 'Leonel Gonzalez Erives',
                'usuario' => 'sacredblades',
                'correo' => 'blades@gmail.com',
                'contraseña' => '12345678',
                'admin' => true,
            ],
            [
                'nombre' => 'Alejandro Ramirez',
                'usuario' => 'test',
                'correo' => 'test@gmail.com',
                'contraseña' => 'adminadmin',
                'admin' => false,
            ],
            [
                'nombre' => 'Alejandro Ramirez 2',
                'usuario' => 'test2',
                'correo' => 'test2@gmail.com',
                'contraseña' => 'adminadmin',
                'admin' => false,
            ],
```
