const pool = require('../db/connection');

// Get all users
const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
};

// Get user by ID
const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

// Create a new user
const createUser = async (user) => {
  const { name, email, dob, age, mobile, phone, gender, hobbies } = user;


  try {   
    const [result] = await pool.query(
      'INSERT INTO users (name, email, dob, age, mobile, phone, gender, hobbies) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, dob, age, mobile, phone, gender, JSON.stringify(hobbies)]
    );
    console.log(result)
    return result.insertId;
  } catch (err) {
   console.log(err)
  }
 
};

// Update a user
const updateUser = async (id, user) => {
  const { name, email, dob, age, mobile, phone, gender, hobbies } = user;
  await pool.query(
    'UPDATE users SET name = ?, email = ?, dob = ?, age = ?, mobile = ?, phone = ?, gender = ?, hobbies = ? WHERE id = ?',
    [name, email, dob, age, mobile, phone, gender, JSON.stringify(hobbies), id]
  );
};

// Delete a user
const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
