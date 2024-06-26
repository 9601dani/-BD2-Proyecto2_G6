const Order = require("../models/Orders");
const Books = require("../models/Books");

const createOrder = async (req, res) => {
  try {
    const { id_usuario, libros, direccion_envio } = req.body;

    if (!id_usuario || !libros) {
      return res.status(400).json({
        ok: false,
        msj: "Campos incompletos, debe enviar id_usuario y arreglo de libros",
      });
    }

    const validStock = await validateStock(libros);

    console.log("stock valido", validStock);

    //validate stock
    if (validStock.length > 0) {
      return res.status(400).json({
        ok: false,
        msj: "Sin stock suficiente de los siguientes libros",
        books: validStock,
      });
    }

    //create order
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("es-ES");

    //calculate total price
    const total_price = await calculateTotalPrice(libros);

    //update Stock
    if (!(await updateStock(libros))) {
      return res
        .status(500)
        .json({ ok: false, msj: "Error al actualizar stock" });
    }

    await new Order({
      fecha_pedido: formattedDate,
      estado: "En proceso",
      precio_total: total_price,
      id_usuario,
      direccion_envio,
      libros: libros,
      metodo_pago: "Efectivo",
    }).save();

    res.status(200).json({ ok: true, msj: "Pedido realizado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ok:false, msj: "Error al crear el pedido", error: error.message });
  }
};

async function validateStock(books) {
  try {
    let withoutStock = [];
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const bookDB = await Books.findById(book.id_libro);
      if (bookDB.cantidad_stockc < book.cantidad) {
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
    console.error("Error al actualizar el stock:", error);
    return false;
  }
}

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ok:false, msj: "Error getting orders", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id_pedido);

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ok:false, msj: "Error getting order", error: error.message });
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
            return res.status(404).json({ok:false, msj: 'Pedido no encontrado' });
        }

        res.status(200).json({ ok: true, msj: 'Pedido actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ ok: false, msj: 'Error al actualizar el estado del pedido' });
    }

};




const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Orders.find({ id_usuario: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ msj: "Error getting orders", error: error.message });
  }
};




async function updateSalesCustomer(customer) {
  try {
  } catch (error) {
    console.log(error);
  }
}

const getOrdersByDate = async (req, res) => {
  try {
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error getting orders", error: error.message });
  }
};

const getMostSoldBooks = async (req, res) => {
  try {
    res.status(200).json(books);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error getting most sold books", error: error.message });
  }
};

const getMostSoldAuthors = async (req, res) => {
  try {
    res.status(200).json(authors);
  } catch (error) {
    res.status(400).json({
      message: "Error getting most sold authors",
      error: error.message,
    });
  }
};

const getMostSoldCategories = async (req, res) => {
  try {
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({
      message: "Error getting most sold categories",
      error: error.message,
    });
  }
};

const getMostSoldCustomers = async (req, res) => {
  try {
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({
      message: "Error getting most sold customers",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderById,
  getOrdersByUser,
  getOrdersByDate,
  getMostSoldBooks,
  getMostSoldAuthors,
  getMostSoldCategories,
  getMostSoldCustomers,
};
