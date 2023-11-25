const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "user",
      required: [true, "User Id is missing"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    startDate: {
      type: Date,
      required: [true, "start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "end date is required"],
    },
    category: {
      type: String,
      enum: ["Meetings", "Calls", "Emails", "Research", "Writing"],
      required: [true, "category is required"],
    },
    priority: {
      type: String,
      enum: ["High", "low", "Medium"],
      required: [true, "category is required"],
    },

    completed: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

todoSchema.plugin(mongoose_delete, {
  overrideMethods: ["find", "findOne", "findOneAndUpdate", "update"],
});
const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
