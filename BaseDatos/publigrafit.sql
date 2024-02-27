-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-02-2024 a las 15:00:34
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
(1, 'Publicidad'),
(2, 'Papelería'),
(3, 'Papelería'),
(4, 'Documentos');

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
(1, '21939559', 'MARIA', 'GOEZ', '3187549154', 'Cra 56a # 61-24', 'jaimegarcia00@hotmail.com', 'CC', 1);

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

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id_compra`, `fk_proveedor`, `cantidad`, `fecha`, `total`) VALUES
(89, 1, 0, '2024-01-04', 834425),
(90, 2, 0, '2024-01-04', 954975),
(100, 3, 0, '2024-02-23', 1190),
(101, 4, 0, '2024-02-24', 595);

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

--
-- Volcado de datos para la tabla `detalle_compras`
--

INSERT INTO `detalle_compras` (`id_detalle_compra`, `fk_compra`, `fk_insumo`, `cantidad`, `precio`, `iva`, `subtotal`) VALUES
(93, 89, 1, 3, 100, 0, 300),
(94, 90, 2, 5, 500, 0, 2500),
(95, 90, 3, 10, 80000, 0, 800000),
(105, 100, 1, 5, 200, 0, 1000),
(106, 101, 14, 5, 100, 0, 500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_fichas_tecnicas`
--

CREATE TABLE `detalle_fichas_tecnicas` (
  `id_detalle_ft` int(11) NOT NULL,
  `fk_insumo` int(11) DEFAULT NULL,
  `fk_ficha_tecnica` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` float(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_fichas_tecnicas`
--

INSERT INTO `detalle_fichas_tecnicas` (`id_detalle_ft`, `fk_insumo`, `fk_ficha_tecnica`, `cantidad`, `precio`) VALUES
(5, 1, 155, 5, 50),
(38, 1, 198, 1, 100),
(49, 1, 201, 5, 60),
(50, 2, 201, 4, 100),
(51, 3, 201, 6, 80000),
(52, 4, 201, 10, 15000),
(53, 1, 180, 10, 50),
(56, 2, 203, 1, 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ventas`
--

CREATE TABLE `detalle_ventas` (
  `id_detalle_venta` int(6) NOT NULL,
  `fk_venta` int(6) NOT NULL,
  `fk_producto` int(4) NOT NULL,
  `cantidad` int(5) NOT NULL,
  `precio` float(10,0) NOT NULL,
  `subtotal` float(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_ventas`
--

INSERT INTO `detalle_ventas` (`id_detalle_venta`, `fk_venta`, `fk_producto`, `cantidad`, `precio`, `subtotal`) VALUES
(18, 19, 72, 1, 15000, 15000),
(19, 20, 72, 11, 15000, 165000),
(20, 21, 72, 1, 15000, 15000),
(21, 22, 72, 6, 15000, 90000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichas_tecnicas`
--

CREATE TABLE `fichas_tecnicas` (
  `id_ft` int(4) NOT NULL,
  `nombre_ficha` varchar(50) NOT NULL,
  `imagen_producto_final` varchar(255) NOT NULL,
  `costo_final_producto` float NOT NULL,
  `detalle` varchar(500) NOT NULL,
  `mano_obra` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fichas_tecnicas`
--

INSERT INTO `fichas_tecnicas` (`id_ft`, `nombre_ficha`, `imagen_producto_final`, `costo_final_producto`, `detalle`, `mano_obra`, `estado`) VALUES
(155, 'Prueba1', 'vtkyAQp6k.jpeg', 200, 'Descripción de la ficha técnica', 5000, 1),
(180, 'Cuaderno', 'vtkyAQp6k.jpeg', 5100, 'Esto es una prueba de ', 4000, 1),
(198, 'estoes2', 'vtkyAQp6k.jpeg', 5100, 'Blabla', 600, 1),
(201, 'Valla', 'FdKsdSrDS.jpeg', 4630700, 'Esto es una prueba', 400, 1),
(203, 'danieprueba', '5snKxA8XE.png', 2600, 'Pruebas y mas', 5000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos`
--

CREATE TABLE `insumos` (
  `id_insumo` int(4) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio` float NOT NULL,
  `cantidad` int(5) NOT NULL,
  `estado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `insumos`
--

INSERT INTO `insumos` (`id_insumo`, `nombre`, `precio`, `cantidad`, `estado`) VALUES
(1, 'Papel Bond', 150, 10, 1),
(2, 'Sellastrip', 100, 95, 1),
(3, 'Guillotinas', 80000, 94, 1),
(4, 'Plumígrafos', 15000, 90, 1),
(14, 'prueba', 100, 94, 1);

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
('002Usuario', 'Usuario'),
('005Ficha', 'FichaTecnica'),
('007produc', 'Producto'),
('008Cliente', 'Cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(4) NOT NULL,
  `fk_categoria` int(4) NOT NULL,
  `precio` float NOT NULL,
  `cantidad` int(5) NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `fk_ft` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `fk_categoria`, `precio`, `cantidad`, `estado`, `fk_ft`) VALUES
(72, 1, 15000, 31, 1, 155);

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
(3, 'Alguien', '0', 1),
(4, 'Exito', '0', 1);

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
(247, 'Administrador', '2024-02-15', 1),
(249, 'Vendedora', '2024-02-23', 1);

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
(456, 247, '0001Rol', 27),
(457, 247, '0003Compra', 27),
(458, 247, '0004Insumo', 27),
(459, 247, '0006Venta', 27),
(460, 247, '002Usuario', 27),
(461, 247, '005Ficha', 27),
(462, 247, '007produc', 27),
(463, 247, '008Cliente', 27),
(468, 249, '0001Rol', 28),
(469, 249, '0003Compra', 28),
(470, 249, '0004Insumo', 28);

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
(27, 'CC', 1036134760, 'DANIEL EMILIO', 'CRUZ GARCIA', 'danielsenju1999@gmail.com', '$2b$10$Rqk5BouybtP4WWHMNhrLmun1/4YbGq4BqrurZ4Dt021fiYUbh1eUu', 1),
(28, 'CC', 21939559, 'MARIA GILMA', 'GOEZ', 'algomas00@hotmail.com', '$2b$10$xz8NVSIHrPB2XuqXaFM/neK/rvtH/QVi/cUUs02EK1zUEzfGeS9du', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(6) NOT NULL,
  `fk_id_cliente` int(11) NOT NULL,
  `metodo_pago` varchar(20) NOT NULL,
  `fecha` date NOT NULL,
  `total` float(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `fk_id_cliente`, `metodo_pago`, `fecha`, `total`) VALUES
(19, 1, 'Efectivo', '2024-02-05', 17850),
(20, 1, 'Efectivo', '2024-02-06', 196350),
(21, 1, 'Efectivo', '2024-02-07', 17850),
(22, 1, 'Efectivo', '2024-02-23', 107100);

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
-- Indices de la tabla `detalle_fichas_tecnicas`
--
ALTER TABLE `detalle_fichas_tecnicas`
  ADD PRIMARY KEY (`id_detalle_ft`),
  ADD KEY `fk_ficha_tecnica` (`fk_ficha_tecnica`),
  ADD KEY `fk_insumo` (`fk_insumo`);

--
-- Indices de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD PRIMARY KEY (`id_detalle_venta`),
  ADD KEY `fk_venta` (`fk_venta`),
  ADD KEY `fk_producto` (`fk_producto`);

--
-- Indices de la tabla `fichas_tecnicas`
--
ALTER TABLE `fichas_tecnicas`
  ADD PRIMARY KEY (`id_ft`);

--
-- Indices de la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD PRIMARY KEY (`id_insumo`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id_permiso`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `fk_categoria` (`fk_categoria`),
  ADD KEY `fk_ft` (`fk_ft`);

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
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `fk_dni_cliente` (`fk_id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id_compra` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT de la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  MODIFY `id_detalle_compra` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT de la tabla `detalle_fichas_tecnicas`
--
ALTER TABLE `detalle_fichas_tecnicas`
  MODIFY `id_detalle_ft` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  MODIFY `id_detalle_venta` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `fichas_tecnicas`
--
ALTER TABLE `fichas_tecnicas`
  MODIFY `id_ft` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=204;

--
-- AUTO_INCREMENT de la tabla `insumos`
--
ALTER TABLE `insumos`
  MODIFY `id_insumo` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `id_rol` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=250;

--
-- AUTO_INCREMENT de la tabla `rol_x_permisos`
--
ALTER TABLE `rol_x_permisos`
  MODIFY `id_rol_x_permiso` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=471;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
-- Filtros para la tabla `detalle_fichas_tecnicas`
--
ALTER TABLE `detalle_fichas_tecnicas`
  ADD CONSTRAINT `detalle_fichas_tecnicas_ibfk_1` FOREIGN KEY (`fk_insumo`) REFERENCES `insumos` (`id_insumo`),
  ADD CONSTRAINT `fk_ficha_tecnica` FOREIGN KEY (`fk_ficha_tecnica`) REFERENCES `fichas_tecnicas` (`id_ft`);

--
-- Filtros para la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD CONSTRAINT `fk_producto` FOREIGN KEY (`fk_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `fk_venta` FOREIGN KEY (`fk_venta`) REFERENCES `ventas` (`id_venta`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`fk_categoria`) REFERENCES `categorias` (`id_categoria`),
  ADD CONSTRAINT `fk_ft` FOREIGN KEY (`fk_ft`) REFERENCES `fichas_tecnicas` (`id_ft`);

--
-- Filtros para la tabla `rol_x_permisos`
--
ALTER TABLE `rol_x_permisos`
  ADD CONSTRAINT `fk_permiso` FOREIGN KEY (`fk_permiso`) REFERENCES `permisos` (`id_permiso`),
  ADD CONSTRAINT `fk_rol` FOREIGN KEY (`fk_rol`) REFERENCES `rols` (`id_rol`),
  ADD CONSTRAINT `rol_x_permisos_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`fk_id_cliente`) REFERENCES `clientes` (`id_cliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
