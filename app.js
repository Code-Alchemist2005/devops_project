const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'data', 'employees.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

// Helper: read employees
function readEmployees() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

// Helper: write employees
function writeEmployees(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all employees (API)
app.get('/api/employees', (req, res) => {
  const employees = readEmployees();
  const search = req.query.search ? req.query.search.toLowerCase() : '';
  const filtered = search
    ? employees.filter(e =>
        e.name.toLowerCase().includes(search) ||
        e.department.toLowerCase().includes(search) ||
        e.role.toLowerCase().includes(search)
      )
    : employees;
  res.json(filtered);
});

// POST add employee
app.post('/api/employees', (req, res) => {
  const employees = readEmployees();
  const newEmployee = {
    id: Date.now().toString(),
    name: req.body.name,
    role: req.body.role,
    department: req.body.department,
    email: req.body.email,
    status: req.body.status || 'Active',
    joinDate: new Date().toISOString().split('T')[0]
  };
  employees.push(newEmployee);
  writeEmployees(employees);
  res.json({ success: true, employee: newEmployee });
});

// DELETE employee
app.delete('/api/employees/:id', (req, res) => {
  let employees = readEmployees();
  employees = employees.filter(e => e.id !== req.params.id);
  writeEmployees(employees);
  res.json({ success: true });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Employee Management System running on http://localhost:${PORT}`);
});