-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-01-2024 a las 17:03:36
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
  `proveedor` varchar(50) NOT NULL,
  `cantidad` int(5) NOT NULL,
  `fecha` date NOT NULL,
  `total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id_compra`, `proveedor`, `cantidad`, `fecha`, `total`) VALUES
(1, 'QuimiNet', 1000, '2023-06-16', 119000),
(2, 'GranPapel', 400, '2023-05-13', 238000),
(3, 'CGráficas', 5, '2023-05-19', 476000),
(8, 'GranPapel', 50, '2023-06-30', 4760000);

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
(1, 1, 1, 1000, 100, 0.19, 100000),
(2, 2, 2, 400, 500, 0.19, 200000),
(3, 3, 3, 5, 80, 0.19, 400000),
(6, 8, 3, 50, 80000, 0.19, 4000000);

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
(12, 13, 1, 1, 1000000, 1000000),
(13, 14, 2, 10, 20000, 200000),
(14, 15, 1, 3, 1000000, 3000000),
(15, 16, 1, 1, 1000000, 1000000),
(16, 16, 2, 1, 20000, 20000),
(17, 16, 52, 1, 200, 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichas_tecnicas`
--

CREATE TABLE `fichas_tecnicas` (
  `id_ft` int(4) NOT NULL,
  `fk_insumo` int(4) NOT NULL,
  `cantidad_insumo` int(5) NOT NULL,
  `costo_insumo` float NOT NULL,
  `imagen_producto_final` longblob NOT NULL,
  `costo_final_producto` float NOT NULL,
  `detalle` varchar(500) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fichas_tecnicas`
--

INSERT INTO `fichas_tecnicas` (`id_ft`, `fk_insumo`, `cantidad_insumo`, `costo_insumo`, `imagen_producto_final`, `costo_final_producto`, `detalle`, `estado`) VALUES
(1, 1, 40, 650000, '', 1000000, 'Elaboración de Pendones', 1),
(2, 2, 105, 12000, '', 20000, 'Elaboración de Cuadernos Argollados', 1),
(3, 3, 120, 5000, '', 7000, 'Elaboración de Talonarios', 1),
(4, 4, 2, 5000, '', 7000, 'Elaboración de Folletos', 1);

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
(1, 'Papel Bond', 100, 4, 1),
(2, 'Sellastrip', 500, 400, 1),
(3, 'Guillotinas', 80000, 5, 1),
(4, 'Plumígrafos', 15000, 15, 1);

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
  `nombre_producto` varchar(50) NOT NULL,
  `precio` float NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `cantidad` int(5) NOT NULL,
  `estado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `fk_categoria`, `nombre_producto`, `precio`, `imagen`, `cantidad`, `estado`) VALUES
(1, 1, 'Pendón', 1000000, 'imagen.jpg', 1, 1),
(2, 2, 'Cuaderno Argollado', 20000, 'imagen.jpg', 9, 1),
(52, 1, 'algomas', 200, '', 49, 1);

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
(130, 'Vendedor', '2024-01-02', 1),
(131, 'Administrador', '2024-01-02', 1);

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
(292, 131, '0001Rol', 27),
(293, 131, '0003Compra', 27),
(294, 131, '0004Insumo', 27),
(295, 131, '0006Venta', 27),
(296, 131, '002Usuario', 27),
(297, 131, '005Ficha', 27),
(298, 131, '007produc', 27),
(299, 131, '008Cliente', 27),
(300, 130, '0003Compra', 28),
(301, 130, '0004Insumo', 28),
(302, 130, '0006Venta', 28);

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
(27, 'CC', 1036134760, 'DANIEL EMILIO', 'CRUZ GARCIA', 'danielsenju1999@gmail.com', '$2b$10$RhrHO97o78I4zhPnv2CW3eFwwqGbe71gZSrY8ReOYJeWlz70I83Di', 1),
(28, 'CC', 21939559, 'MARIA GILMA', 'GOEZ', 'algo00@hotmail.com', '$2b$10$xz8NVSIHrPB2XuqXaFM/neK/rvtH/QVi/cUUs02EK1zUEzfGeS9du', 1);

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
(13, 1, 'Efectivo', '2023-12-06', 1190000),
(14, 1, 'Efectivo', '2023-12-06', 238000),
(15, 1, 'Efectivo', '2023-12-13', 3570000),
(16, 1, 'Efectivo', '2023-12-13', 1214038);

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
  ADD PRIMARY KEY (`id_compra`);

--
-- Indices de la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  ADD PRIMARY KEY (`id_detalle_compra`),
  ADD KEY `fk_compra` (`fk_compra`),
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
  ADD PRIMARY KEY (`id_ft`),
  ADD KEY `fk_insumo2` (`fk_insumo`);

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
  ADD KEY `fk_categoria` (`fk_categoria`);

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
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id_compra` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  MODIFY `id_detalle_compra` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  MODIFY `id_detalle_venta` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `fichas_tecnicas`
--
ALTER TABLE `fichas_tecnicas`
  MODIFY `id_ft` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `insumos`
--
ALTER TABLE `insumos`
  MODIFY `id_insumo` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `id_rol` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT de la tabla `rol_x_permisos`
--
ALTER TABLE `rol_x_permisos`
  MODIFY `id_rol_x_permiso` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=303;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  ADD CONSTRAINT `fk_compra` FOREIGN KEY (`fk_compra`) REFERENCES `compras` (`id_compra`),
  ADD CONSTRAINT `fk_insumo` FOREIGN KEY (`fk_insumo`) REFERENCES `insumos` (`id_insumo`);

--
-- Filtros para la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD CONSTRAINT `fk_producto` FOREIGN KEY (`fk_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `fk_venta` FOREIGN KEY (`fk_venta`) REFERENCES `ventas` (`id_venta`);

--
-- Filtros para la tabla `fichas_tecnicas`
--
ALTER TABLE `fichas_tecnicas`
  ADD CONSTRAINT `fk_insumo2` FOREIGN KEY (`fk_insumo`) REFERENCES `insumos` (`id_insumo`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`fk_categoria`) REFERENCES `categorias` (`id_categoria`);

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
