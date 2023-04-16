import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generarPDF(datos) {
  const headers = [["ID", "Nombre", "Fecha", "Hora de entrada", "Hora de salida"]];

  let datosFinales = [];
  datos.forEach((element) => {
    datosFinales.push([element.codigo, element.nombre, element.fecha, element.entrada, element.salida]);
  });

  const doc = new jsPDF({
    orientation: "p",
    unit: "pt",
    format: "a4",
  });

  // Añadir el título
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Reporte de entradas y salidas", doc.internal.pageSize.width / 2, 30, { align: "center" });

  // Añadir la fecha de reporte
  doc.setFontSize(8);
  const fechaReporte = `Fecha de creacion: ${new Date().toLocaleDateString()}`;
  const fechaReporteWidth = doc.getTextDimensions(fechaReporte).w;
  doc.text(fechaReporte, doc.internal.pageSize.width - fechaReporteWidth - 20, 50, {
    align: "left",
  });

  autoTable(doc, {
    head: headers,
    body: datosFinales,
    startY: 80,
  });

  return doc.save("reporte.pdf");
}
