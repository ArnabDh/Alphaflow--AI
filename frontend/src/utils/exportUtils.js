import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export const exportToExcel = (tasks) => {
  const worksheet = XLSX.utils.json_to_sheet(
    tasks.map(task => ({
      ID: task._id,
      Department: task.department,
      'Task Name': task.taskName,
      Priority: task.priority,
      Type: task.type,
      'Assigned SP': task.assignedSP,
      'Actual SP': task.actualSP,
      Status: task.status,
      'Due Date': new Date(task.dueDate).toLocaleDateString(),
      Comment: task.comment,
      Overdue: new Date(task.dueDate) < new Date() ? 'Yes' : 'No',
      'Completion Date': task.completionDate 
        ? new Date(task.completionDate).toLocaleDateString() 
        : '-'
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(data, 'tasks.xlsx');
};

export const exportToPDF = async (tasks) => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();

  const headers = [
    'ID', 'Department', 'Task', 'Priority', 'Type', 
    'Assigned SP', 'Actual SP', 'Status', 'Due Date'
  ];

  const data = tasks.map(task => [
    task._id,
    task.department,
    task.taskName,
    task.priority,
    task.type,
    task.assignedSP,
    task.actualSP,
    task.status,
    new Date(task.dueDate).toLocaleDateString()
  ]);

  doc.autoTable({
    head: [headers],
    body: data,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [37, 99, 235] }
  });

  doc.save('tasks.pdf');
}; 