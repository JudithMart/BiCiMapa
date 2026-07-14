import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Genera el PDF del reporte mensual general:
 * - Personas únicas por lugar
 * - Usuarios premium: veces premium + retos cumplidos
 *
 * Requiere: npm install jspdf jspdf-autotable
 */
export function generateGeneralMonthlyReportPDF({ visitsByPlace, premiumUsersReport, mes }) {
  const doc = new jsPDF();
  const mesTexto =
    mes || new Date().toLocaleDateString("es-MX", { month: "long", year: "numeric" });

  doc.setFontSize(16);
  doc.text("Reporte mensual - BiCitas", 14, 20);
  doc.setFontSize(11);
  doc.text(`Mes: ${mesTexto}`, 14, 28);

  // Tabla 1: visitas por lugar
  doc.setFontSize(13);
  doc.text("Visitas por lugar (personas únicas)", 14, 40);

  autoTable(doc, {
    startY: 45,
    head: [["Lugar", "Personas que visitaron"]],
    body: visitsByPlace.map((v) => [v.lugar, v.personas]),
    headStyles: { fillColor: [160, 45, 90] }, // ajusta al color primary de tu marca
  });

  const nextY = doc.lastAutoTable.finalY + 15;

  // Tabla 2: usuarios premium
  doc.setFontSize(13);
  doc.text("Usuarios premium", 14, nextY);

  autoTable(doc, {
    startY: nextY + 5,
    head: [["Usuario", "Teléfono", "Veces premium", "Retos cumplidos"]],
    body: premiumUsersReport.map((u) => [
      u.nombre,
      u.telefono,
      u.vecesPremium,
      u.vecesRetoCumplido,
    ]),
    headStyles: { fillColor: [160, 45, 90] },
  });

  doc.save(`reporte_mensual_${mesTexto.replace(/\s+/g, "_")}.pdf`);
}