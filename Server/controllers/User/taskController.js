const Todo = require("../../models/Todo.model");
module.exports = {
  createTodo: async (req, res) => {
    try {
      const todo = await Todo.create({ ...req.body, userId: req.user._id });
      res.status(201).json({ success: true, data: todo });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  getAllTodo: async (req, res) => {
    try {
      // Pagination parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Search and filter parameters
      const { startDate, endDate, category, priority } = req.query;
      const filter = {};

      if (startDate) {
        filter.startDate = { $gte: new Date(startDate) };
      }

      if (endDate) {
        filter.endDate = { $lte: new Date(endDate) };
      }

      if (category) {
        filter.category = category;
      }

      if (priority) {
        filter.priority = priority;
      }

      const todo = await Todo.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ startDate: "asc" }); // You can change the sorting order as needed

      res.status(200).json({ success: true, data: todo });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getTodoById: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res
          .status(404)
          .json({ success: false, error: "Todo not found" });
      }
      res.status(200).json({ success: true, data: todo });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateTodo: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!todo) {
        return res
          .status(404)
          .json({ success: false, error: "Todo not found" });
      }
      res.status(200).json({ success: true, data: todo });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
