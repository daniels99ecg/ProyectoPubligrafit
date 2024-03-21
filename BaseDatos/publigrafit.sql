-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-03-2024 a las 03:45:02
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `publigrafit`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(4) NOT NULL,
  `categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `categoria`) VALUES
(1, 'Pintura'),
(2, 'Papelería'),
(3, 'Papelería'),
(4, 'Documentos'),
(16, 'algomas'),
(17, 'almasdos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `documento` varchar(15) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `tipo_documento` varchar(2) NOT NULL,
  `estado` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `documento`, `nombre`, `apellido`, `telefono`, `direccion`, `email`, `tipo_documento`, `estado`) VALUES
(1, '21939559', 'MARIA', 'GOEZ', '3187549154', 'Cra 56a # 61-24', 'jaimegarcia00@hotmail.com', 'CC', 1),
(3, '1036134760', 'Daniel Emilio', 'Cruz Garcia', '3145527066', 'Medellin', 'danielsenju1999@gmail.com', 'CC', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id_compra` int(4) NOT NULL,
  `fk_proveedor` int(11) NOT NULL,
  `cantidad` int(5) NOT NULL,
  `fecha` date NOT NULL,
  `total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compras`
--

CREATE TABLE `detalle_compras` (
  `id_detalle_compra` int(6) NOT NULL,
  `fk_compra` int(4) NOT NULL,
  `fk_insumo` int(4) NOT NULL,
  `cantidad` int(5) NOT NULL,
  `precio` float NOT NULL,
  `iva` float NOT NULL,
  `subtotal` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ordenes`
--

CREATE TABLE `detalle_ordenes` (
  `id_detalle_ft` int(11) NOT NULL,
  `fk_insumo` int(11) DEFAULT NULL,
  `fk_ficha_tecnica` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` float(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos`
--

CREATE TABLE `insumos` (
  `id_insumo` int(4) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio` float NOT NULL,
  `cantidad` int(5) NOT NULL,
  `fk_categoria` int(11) NOT NULL,
  `fk_presentacion` int(11) NOT NULL,
  `estado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `insumos`
--

INSERT INTO `insumos` (`id_insumo`, `nombre`, `precio`, `cantidad`, `fk_categoria`, `fk_presentacion`, `estado`) VALUES
(44, 'Papel Iris', 100, 110, 16, 1, 1),
(47, 'Papel de algo', 100, 100, 2, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes`
--

CREATE TABLE `ordenes` (
  `id_ft` int(4) NOT NULL,
  `nombre_ficha` varchar(50) NOT NULL,
  `fk_cliente` int(11) NOT NULL,
  `imagen_producto_final` varchar(255) NOT NULL,
  `costo_final_producto` float NOT NULL,
  `detalle` varchar(500) NOT NULL,
  `mano_obra` int(11) NOT NULL,
  `operacion` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id_permiso` varchar(20) NOT NULL,
  `nombre_permiso` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id_permiso`, `nombre_permiso`) VALUES
('0001Rol', 'Rol'),
('0003Compra', 'Compra'),
('0004Insumo', 'Insumo'),
('0006Venta', 'Venta'),
('0009Dash', 'Dashboard'),
('002Usuario', 'Usuario'),
('005Ficha', 'Ordenes'),
('007produc', 'Producto'),
('008Cliente', 'Cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presentaciones`
--

CREATE TABLE `presentaciones` (
  `id_presentacion` int(11) NOT NULL,
  `nombre_presentacion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `presentaciones`
--

INSERT INTO `presentaciones` (`id_presentacion`, `nombre_presentacion`) VALUES
(1, '2 Kilos'),
(2, '1 Kilo'),
(3, '1/4 ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id_proveedores` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `telefono` varchar(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_proveedores`, `nombre`, `telefono`, `estado`) VALUES
(1, 'Exito', '1234567890', 1),
(2, 'Alguien', '4444444', 1),
(11, 'Prueba', '0', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE `rols` (
  `id_rol` int(4) NOT NULL,
  `nombre_rol` varchar(20) NOT NULL,
  `fecha` date NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rols`
--

INSERT INTO `rols` (`id_rol`, `nombre_rol`, `fecha`, `estado`) VALUES
(254, 'Administrador', '2024-02-27', 1),
(266, 'Vendedora', '2024-02-29', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_x_permisos`
--

CREATE TABLE `rol_x_permisos` (
  `id_rol_x_permiso` int(10) NOT NULL,
  `fk_rol` int(4) NOT NULL,
  `fk_permiso` varchar(10) NOT NULL,
  `fk_usuario` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol_x_permisos`
--

INSERT INTO `rol_x_permisos` (`id_rol_x_permiso`, `fk_rol`, `fk_permiso`, `fk_usuario`) VALUES
(503, 254, '0001Rol', 27),
(504, 254, '005Ficha', 27),
(505, 254, '0003Compra', 27),
(506, 254, '0004Insumo', 27),
(507, 254, '002Usuario', 27),
(508, 254, '0006Venta', 27),
(509, 254, '007produc', 27),
(510, 254, '008Cliente', 27),
(514, 254, '0009Dash', 27),
(546, 266, '0003Compra', 55),
(547, 266, '0004Insumo', 55),
(548, 266, '0006Venta', 55);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(4) NOT NULL,
  `tipo_documento` varchar(255) NOT NULL,
  `documento` int(255) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `email` varchar(40) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `tipo_documento`, `documento`, `nombres`, `apellidos`, `email`, `contrasena`, `estado`) VALUES
(27, 'Cc', 1036134760, 'DANIEL EMILIO', 'CRUZ GARCIA', 'danielsenju1999@gmail.com', '$2b$10$Rqk5BouybtP4WWHMNhrLmun1/4YbGq4BqrurZ4Dt021fiYUbh1eUu', 1),
(55, 'Cc', 21939559, 'MARIA', 'GOEZ', 'algo00@hotmail.com', '$2b$10$/hVW0p3ZB5veWzkVBYzyCO7j12OoIvqiJvlNHqER/TK2Rteqpl.Zu', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id_compra`),
  ADD KEY `fk_proveedor` (`fk_proveedor`);

--
-- Indices de la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  ADD PRIMARY KEY (`id_detalle_compra`),
  ADD KEY `fk_compra` (`fk_compra`),
  ADD KEY `fk_insumo` (`fk_insumo`);

--
-- Indices de la tabla `detalle_ordenes`
--
ALTER TABLE `detalle_ordenes`
  ADD PRIMARY KEY (`id_detalle_ft`),
  ADD KEY `fk_ficha_tecnica` (`fk_ficha_tecnica`),
  ADD KEY `fk_insumo` (`fk_insumo`);

--
-- Indices de la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD PRIMARY KEY (`id_insumo`),
  ADD KEY `fk_categoria` (`fk_categoria`),
  ADD KEY `fk_presentacion` (`fk_presentacion`);

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD PRIMARY KEY (`id_ft`),
  ADD KEY `fk_cliente` (`fk_cliente`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id_permiso`);

--
-- Indices de la tabla `presentaciones`
--
ALTER TABLE `presentaciones`
  ADD PRIMARY KEY (`id_presentacion`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id_proveedores`);

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `rol_x_permisos`
--
ALTER TABLE `rol_x_permisos`
  ADD PRIMARY KEY (`id_rol_x_permiso`),
  ADD KEY `fk_rol` (`fk_rol`),
  ADD KEY `fk_permiso` (`fk_permiso`),
  ADD KEY `fk_usuario` (`fk_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id_compra` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT de la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  MODIFY `id_detalle_compra` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT de la tabla `detalle_ordenes`
--
ALTER TABLE `detalle_ordenes`
  MODIFY `id_detalle_ft` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=261;

--
-- AUTO_INCREMENT de la tabla `insumos`
--
ALTER TABLE `insumos`
  MODIFY `id_insumo` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  MODIFY `id_ft` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=253;

--
-- AUTO_INCREMENT de la tabla `presentaciones`
--
ALTER TABLE `presentaciones`
  MODIFY `id_presentacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `id_rol` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=267;

--
-- AUTO_INCREMENT de la tabla `rol_x_permisos`
--
ALTER TABLE `rol_x_permisos`
  MODIFY `id_rol_x_permiso` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=549;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`fk_proveedor`) REFERENCES `proveedores` (`id_proveedores`);

--
-- Filtros para la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  ADD CONSTRAINT `fk_compra` FOREIGN KEY (`fk_compra`) REFERENCES `compras` (`id_compra`),
  ADD CONSTRAINT `fk_insumo` FOREIGN KEY (`fk_insumo`) REFERENCES `insumos` (`id_insumo`);

--
-- Filtros para la tabla `detalle_ordenes`
--
ALTER TABLE `detalle_ordenes`
  ADD CONSTRAINT `detalle_ordenes_ibfk_1` FOREIGN KEY (`fk_insumo`) REFERENCES `insumos` (`id_insumo`),
  ADD CONSTRAINT `fk_ficha_tecnica` FOREIGN KEY (`fk_ficha_tecnica`) REFERENCES `ordenes` (`id_ft`);

--
-- Filtros para la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD CONSTRAINT `insumos_ibfk_1` FOREIGN KEY (`fk_categoria`) REFERENCES `categorias` (`id_categoria`),
  ADD CONSTRAINT `insumos_ibfk_2` FOREIGN KEY (`fk_presentacion`) REFERENCES `presentaciones` (`id_presentacion`);

--
-- Filtros para la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD CONSTRAINT `ordenes_ibfk_1` FOREIGN KEY (`fk_cliente`) REFERENCES `clientes` (`id_cliente`);

--
-- Filtros para la tabla `rol_x_permisos`
--
ALTER TABLE `rol_x_permisos`
  ADD CONSTRAINT `fk_permiso` FOREIGN KEY (`fk_permiso`) REFERENCES `permisos` (`id_permiso`),
  ADD CONSTRAINT `fk_rol` FOREIGN KEY (`fk_rol`) REFERENCES `rols` (`id_rol`),
  ADD CONSTRAINT `rol_x_permisos_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
