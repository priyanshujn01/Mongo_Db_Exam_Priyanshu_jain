db.orders.insertMany([
  {
    _id: 1,
    customer: "Meena",
    item: "Coffee",
    qty: 2,
    price: 120,
    status: "delivered"
  },
  {
    _id: 2,
    customer: "Ravi",
    item: "Sandwich",
    qty: 1,
    price: 180,
    status: "delivered"
  },
  {
    _id: 3,
    customer: "Meena",
    item: "Sandwich",
    qty: 2,
    price: 180,
    status: "cancelled"
  },
  {
    _id: 4,
    customer: "Karthik",
    item: "Coffee",
    qty: 3,
    price: 120,
    status: "delivered"
  },
  {
    _id: 5,
    customer: "Ravi",
    item: "Coffee",
    qty: 1,
    price: 120,
    status: "delivered"
  },
  {
    _id: 6,
    customer: "Meena",
    item: "Cake",
    qty: 1,
    price: 250,
    status: "delivered"
  },
  {
    _id: 7,
    customer: "Karthik",
    item: "Cake",
    qty: 2,
    price: 250,
    status: "pending"
  }
]);
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  },
  {
    $sort: {
      count: -1
    }
  }
]);
db.orders.aggregate([
  {
    $match: {
      status: "delivered"
    }
  },
  {
    $project: {
      _id: 0,
      customer: 1,
      item: 1,
      qty: 1
    }
  }
]);
db.orders.aggregate([
  {
    $match: {
      status: "delivered"
    }
  },
  {
    $group: {
      _id: "$item",
      totalQty: { $sum: "$qty" },
      revenue: {
        $sum: {
          $multiply: ["$qty", "$price"]
        }
      }
    }
  },
  {
    $sort: {
      revenue: -1
    }
  }
]);
db.orders.aggregate([
  {
    $match: {
      status: "delivered"
    }
  },
  {
    $group: {
      _id: "$customer",
      orders: { $sum: 1 },
      totalSpend: {
        $sum: {
          $multiply: ["$qty", "$price"]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      customer: "$_id",
      orders: 1,
      totalSpend: 1
    }
  },
  {
    $sort: {
      totalSpend: -1
    }
  }
]);
db.orders.aggregate([
  {
    $match: {
      status: "delivered"
    }
  },
  {
    $group: {
      _id: "$customer",
      orders: { $sum: 1 },
      totalSpend: {
        $sum: {
          $multiply: ["$qty", "$price"]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      customer: "$_id",
      totalSpend: 1
    }
  },
  {
    $sort: {
      totalSpend: -1
    }
  },
  {
    $limit: 1
  }
]);
db.books.insertMany([
    {
        _id: 1,
        title: "Database Systems",
        author: "Elmasri",
        copies: 5,
        status: "available"
    },
    {
        _id: 2,
        title: "Operating Systems",
        author: "Silberschatz",
        copies: 3,
        status: "available"
    },
    {
        _id: 3,
        title: "Computer Networks",
        author: "Tanenbaum",
        copies: 0,
        status: "unavailable"
    },
    {
        _id: 4,
        title: "Old Almanac 1990",
        author: "Unknown",
        copies: 0,
        status: "unavailable"
    },
    {
        _id: 5,
        title: "Torn Notes",
        author: "Unknown",
        copies: 0,
        status: "damaged"
    },
    {
        _id: 6,
        title: "Water-damaged Atlas",
        author: "Unknown",
        copies: 1,
        status: "damaged"
    }
]);
db.books.updateOne(
    { title: "Operating Systems" },
    { $inc: { copies: 2 } }
);
db.books.updateOne(
    { title: "Database Systems" },
    { $inc: { copies: -1 } }
);
db.books.updateOne(
    { title: "Artificial Intelligence" },
    {
        $set: {
            author: "Russell",
            copies: 4,
            status: "available"
        }
    },
    { upsert: true }
);
db.books.updateOne(
    { title: "Computer Networks" },
    {
        $set: { status: "available" },
        $inc: { copies: 3 }
    }
);
db.books.deleteOne(
    { title: "Old Almanac 1990" }
);