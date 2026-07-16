import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Colores de marca (ajusta estos 3 valores a tu paleta real y el resto
// se acomoda solo en todo el documento)
const COLOR_PRIMARY = [176, 99, 122]; // vino/rosa oscuro -> encabezados de tabla
const COLOR_PRIMARY_LIGHT = [252, 234, 234]; // rosa clarito -> filas alternas
const COLOR_TEXT = [60, 45, 45]; // texto general, más suave que negro puro

export function generateGeneralMonthlyReportPDF({
  visitsByPlace,
  premiumUsersReport,
  mes,
}) {
  const doc = new jsPDF();
  const mesTexto =
    mes ||
    new Date().toLocaleDateString("es-MX", { month: "long", year: "numeric" });

  const pageWidth = doc.internal.pageSize.getWidth();

  // ---- Encabezado ----
  doc.setFillColor(...COLOR_PRIMARY);
  doc.rect(0, 0, pageWidth, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("BiCitas Históricas", 14, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(
    `Reporte mensual · ${mesTexto.charAt(0).toUpperCase() + mesTexto.slice(1)}`,
    14,
    23,
  );

  let cursorY = 42;

  // ---- Tabla 1: visitas por lugar ----
  doc.setTextColor(...COLOR_TEXT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Visitas por lugar (personas únicas)", 14, cursorY);
  cursorY += 3;

  if (visitsByPlace.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(140, 140, 140);
    doc.text("Sin visitas registradas este mes.", 14, cursorY + 8);
    cursorY += 16;
  } else {
    autoTable(doc, {
      startY: cursorY + 5,
      head: [["Lugar", "Personas que visitaron"]],
      body: visitsByPlace.map((v) => [v.lugar, v.personas]),
      theme: "striped",
      styles: {
        font: "helvetica",
        fontSize: 10,
        textColor: COLOR_TEXT,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: COLOR_PRIMARY,
        textColor: [255, 255, 255], // <- esto era lo que faltaba
        fontStyle: "bold",
        halign: "left",
      },
      alternateRowStyles: {
        fillColor: COLOR_PRIMARY_LIGHT,
      },
      columnStyles: {
        1: { halign: "center", cellWidth: 50 },
      },
    });
    cursorY = doc.lastAutoTable.finalY + 15;
  }

  // ---- Tabla 2: usuarios premium ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...COLOR_TEXT);
  doc.text("Usuarios premium", 14, cursorY);
  cursorY += 3;

  if (premiumUsersReport.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(140, 140, 140);
    doc.text("No hay usuarios premium activos.", 14, cursorY + 8);
  } else {
    autoTable(doc, {
      startY: cursorY + 5,
      head: [["Usuario", "Teléfono", "Veces premium", "Retos cumplidos"]],
      body: premiumUsersReport.map((u) => [
        u.nombre,
        u.telefono,
        u.vecesPremium,
        u.vecesRetoCumplido,
      ]),
      theme: "striped",
      styles: {
        font: "helvetica",
        fontSize: 10,
        textColor: COLOR_TEXT,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: COLOR_PRIMARY,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "left",
      },
      alternateRowStyles: {
        fillColor: COLOR_PRIMARY_LIGHT,
      },
      columnStyles: {
        2: { halign: "center" },
        3: { halign: "center" },
      },
    });
  }

  // ---- Footer: número de página en todas las páginas ----
  const totalPaginas = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPaginas; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Página ${i} de ${totalPaginas}`,
      pageWidth - 30,
      doc.internal.pageSize.getHeight() - 10,
    );
  }

  doc.save(`reporte_mensual_${mesTexto.replace(/\s+/g, "_")}.pdf`);
}