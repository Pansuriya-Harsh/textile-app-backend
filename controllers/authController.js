const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const FinancialYear = require("../models/FinancialYear");

const getFinancialYearLabel = (date = new Date()) => {
  const year =
    date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1;
  return `${year}-${(year + 1).toString().slice(-2)}`;
};

// Register user
exports.register = async (req, res) => {
  // console.log("Register hit")
  try {
    const { company, password } = req.body;

    const existingUser = await User.findOne({ company });
    if (existingUser) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ company, password: hashedPassword });
    await user.save();

    // Automatically create the current financial year for the user
    const year = getFinancialYearLabel();
    await FinancialYear.create({
      userId: user._id,
      year,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { company, password } = req.body;

    const user = await User.findOne({ company });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({
        token,
        user: { company: user.company },
        message: "Login successful",
      });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
