
const express = require("express")
const { EmployModel } = require("../model/employe.model")
require('dotenv').config()



const EmpRouter = express.Router()

EmpRouter.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;

    const EmpPresent = await EmployModel.findOne({ firstName })

    if (EmpPresent) {
      return res.status(201).json({ message: 'Employee already present' });
    }

    const newEmploye = new EmployModel({
      firstName,
      lastName,
      email,
      department,
      salary,
    });
    await newEmploye.save();
    return res.status(201).json({ message: 'Employee added successfully' });


  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

EmpRouter.get('/dashboard', async (req, res) => {
  try {
    const { page, offset } = req.query;
    const pageSize = 5;

    const totalEmployees = await EmployModel.countDocuments();

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const employees = await EmployModel.find().skip(startIndex).limit(pageSize);

    return res.json({ employees, totalEmployees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});





EmpRouter.patch('/employees/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body


    const emp = await EmployModel.findByIdAndUpdate({ _id: id }, data);
    if (!emp) {
      return res.status(404).json({ message: "employe not found" });
    }
    return res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});





EmpRouter.delete('/employees/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const emp = await EmployModel.findByIdAndDelete({ _id: id });
    if (!emp) {
      return res.status(404).json({ message: "employe not found" });
    }
    return res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

EmpRouter.get('/dashboard/filter', async (req, res) => {
  try {
    const { Department, page } = req.query;
    const pageSize = 5;

    const filteredEmployees = await EmployModel.find({ department: Department })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalEmployees = filteredEmployees.length;

    return res.json({ employees: filteredEmployees, totalEmployees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


EmpRouter.get('/dashboard/sorting', async (req, res) => {
  try {
    const { sortBy, page } = req.query;
    const pageSize = 5;

    const sortedEmployees = await EmployModel.find()
      .sort({ salary: sortBy === 'asc' ? 1 : -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalEmployees = await EmployModel.countDocuments();

    return res.json({ employees: sortedEmployees, totalEmployees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


EmpRouter.get('/dashboard/searching', async (req, res) => {
  try {
    const { search, page } = req.query;
    const pageSize = 5;

    const searchQuery = { firstName: { $regex: search, $options: 'i' } };

    const searchedEmployees = await EmployModel.find(searchQuery)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalEmployees = searchedEmployees.length;

    return res.json({ employees: searchedEmployees, totalEmployees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = EmpRouter


