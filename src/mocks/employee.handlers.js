import { http, HttpResponse } from "msw";

let employees = [
  {
    id: "EMP001",
    fullName: "Rahul Sharma",
    gender: "Male",
    dob: "1995-05-12",
    state: "Karnatak",
    status: "Active",
    profileImage: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "EMP002",
    fullName: "Priya Yadav",
    gender: "Female",
    dob: "1997-11-08",
    state: "Madhya Pradesh",
    status: "Inactive",
    profileImage: "https://i.pravatar.cc/150?img=2",
  },
];

const generateEmployeeId = () => {
  if (employees.length === 0) return "EMP001";

  const lastId = employees[employees.length - 1].id;
  const lastNumber = parseInt(lastId.replace("EMP", ""), 10);

  const nextNumber = lastNumber + 1;
  return `EMP${String(nextNumber).padStart(3, "0")}`;
};

export const employeeHandlers = [
  http.get("/api/employees", () => {
    return HttpResponse.json(employees);
  }),

  http.post("/api/employees", async ({ request }) => {
    const body = await request.json();

    const newEmployee = {
      ...body,
      id: generateEmployeeId(),
    };

    employees.push(newEmployee);

    return HttpResponse.json(newEmployee, { status: 201 });
  }),

  http.put("/api/employees/:id", async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json();

    employees = employees.map((emp) =>
      emp.id === id ? { ...emp, ...updates } : emp
    );

    const updated = employees.find((e) => e.id === id);
    return HttpResponse.json(updated);
  }),

  http.delete("/api/employees/:id", ({ params }) => {
    const { id } = params;
    employees = employees.filter((emp) => emp.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),
];
