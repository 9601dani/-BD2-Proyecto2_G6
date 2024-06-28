const Order = require("../models/Orders");
const Books = require("../models/Books");
const Users = require("../models/Users");

const createOrder = async (req, res) => {
  try {
    const { id_usuario, libros, direccion_envio } = req.body;
    if (!id_usuario || !libros) {
      return res.status(400).json({
        ok: false,
        message: "Campos incompletos, debe enviar id_usuario y arreglo de libros",
      });
    }

    const validStock = await validateStock(libros);

    if (validStock.length > 0 || false) {
      return res.status(400).json({
        ok: false,
        message: "Sin stock suficiente de los siguientes libros",
        books: validStock,
      });
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("es-ES");

    const total_price = await calculateTotalPrice(libros);

    if (!(await updateStock(libros))) {
      return res
        .status(500)
        .json({ ok: false, message: "Error al actualizar stock" });
    }


    // para los libros generados
    const libroIds = libros.map(libro => libro.libro._id);
    const nombres = libros.map(libro => libro.libro.titulo);

    await new Order({
      fecha_pedido: formattedDate,
      estado: "En proceso",
      precio_total: total_price,
      id_usuario,
      direccion_envio,
      libros: libros,
      metodo_pago: "Efectivo",
    }).save();

    res.status(200).json({ ok: true, message: "Pedido realizado exitosamente" , libroIds, nombres});
  } catch (error) {
    res
      .status(500)
      .json({
      ok: false, message: "Error al crear el pedido",error: error.message});
  }
};
async function validateStock(books) {
  try {
    let withoutStock = [];
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const bookDB = await Books.findById(book.libro._id);
      if (bookDB.cantidad_stock < book.cantidad) {
        withoutStock.push(bookDB.titulo);
      } 
    }

    return withoutStock;
  } catch (error) {
    return false;
  }
}

async function calculateTotalPrice(books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    total += book.sub_total;
  }

  return total;
}

async function updateStock(books) {
  try {
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const updated = await Books.updateOne(
        {
          _id: book.libro._id,
        },
        {
           $inc: { cantidad_stock: -book.cantidad },
        }
      );

      if (updated.matchedCount !== 1) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function updateStock(books) {
  try {
    for (let i = 0; i < books.length; i++) {
      const book = books[i];

      const updated = await Books.updateOne(
        {
          _id: book.id_libro,
        },
        {
          $inc: { cantidad_stock: -book.cantidad },
        }
      );

      if (updated.matchedCount !== 1) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
}

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({
        ok: false,
        message: "Error al obtener los pedidos",
        error: error.message,
      });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id_pedido);

    if (!order) {
      res
        .status(404)
        .json({ ok: false, message: "Pedido no encontrado" });
    }

    res.status(200).json(order);
  } catch (error) {
    res
      .status(400)
      .json({ 
        ok: false,
        message: "Error al obtener el id del pedido", 
        error: error.message });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id_pedido,
      { estado: req.body.estado },
      { new: true }
    );

    if (!updatedOrder) {
      res
        .status(404)
        .json({ 
          ok: false,
          message: "Pedido no encontrado" });
    }

    res.status(200).json({ ok: true, message: "Pedido actualizado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ 
        ok: false, 
        message: "Error al actualizar el estado del pedido" });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id_usuario);

    if (!user) {
      res
        .status(404)
        .json({ ok: false, message: "Usuario no encontrado" });
    }

    const orders = await Order.find({ id_usuario: req.params.id_usuario });

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({
        ok: false,
        message: "Error al obtener los pedidos del usuario",
        error: error.message
      });
  }
};

const getOrdersByStatus = async(req, res)=>{
  try {
    
    const orders = await Order.find({estado: req.params.estado});

    res
      .status(200)
      .json({
        orders
      })

  } catch (error) {
    res
      .status(500)
      .json({
        ok: false,
        message: "Error al obtener los pedidos según el estado",
        error: error.message
      });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderById,
  getOrdersByUser,
  getOrdersByStatus
};
