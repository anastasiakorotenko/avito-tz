import type { StatsProps } from "@/types/interfaces";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportToCSV = (stats: StatsProps, filename = "stats.csv") => {
  const flat = flattenStats(stats);
  const headers = Object.keys(flat);
  const values = Object.values(flat).map((value) =>
    typeof value === "string" && value.includes(",") ? `"${value}"` : value
  );

  const csv = [headers.join(","), values.join(",")].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};

export const exportToPDF = async (fileName = "stats.pdf") => {
  try {
    const element = document.querySelector<HTMLElement>("#stats-root");
    if (!element) {
      console.error("Element #stats-root not found");
      return;
    }

    const originalOpacity = element.style.opacity;
    element.style.opacity = "0.8";

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      allowTaint: true,
      foreignObjectRendering: true,
      onclone: (clonedDoc) => {
        const svgs = clonedDoc.querySelectorAll('svg');
        svgs.forEach(svg => {
          svg.style.visibility = 'visible';
        });
      }
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png", 1.0);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    let heightLeft = imgHeight;
    let position = 0;
    const topOffset = 5;
    const pageHeight = pdfHeight + topOffset;

    if (heightLeft > pageHeight) {
      while (heightLeft > 0) {
        position = heightLeft - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    }

    element.style.opacity = originalOpacity;

    pdf.save(fileName);
    
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Ошибка при генерации PDF. Попробуйте еще раз.");
  }
};

export const flattenStats = (stats: StatsProps) => {
  const flat: Record<string, string | number> = {};

  flat["timestamp"] = new Date().toISOString();

  Object.entries(stats.summary).forEach(([key, value]) => {
    const formattedKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    flat[`summary_${formattedKey}`] =
      typeof value === "number" ? Number(value.toFixed(2)) : value;
  });

  Object.entries(stats.decisions).forEach(([key, value]) => {
    flat[`decisions_${key}_count`] = value;
  });

  Object.entries(stats.categories).forEach(([key, value]) => {
    const engKey =
      key === "Электроника"
        ? "electronics"
        : key === "Недвижимость"
        ? "real_estate"
        : key === "Транспорт"
        ? "transport"
        : key === "Работа"
        ? "jobs"
        : key === "Услуги"
        ? "services"
        : key === "Животные"
        ? "animals"
        : key === "Мода"
        ? "fashion"
        : "kids";
    flat[`category_${engKey}`] = value;
  });

  flat["activity_days_count"] = stats.activity.length;
  flat["activity_data"] = stats.activity
    .map(
      (a) => `${a.date}(A:${a.approved}|R:${a.rejected}|C:${a.requestChanges})`
    )
    .join(";");

  return flat;
};