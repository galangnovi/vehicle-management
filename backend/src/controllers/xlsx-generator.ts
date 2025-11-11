import { Request, Response } from "express";
import ExcelJS from "exceljs";
import { DetailVehicle } from "../services/vehicle";

export default async function handlerExportToExel(req:Request, res:Response) {
    try{
        const id = Number(req.params.id)
        const vehicle = await DetailVehicle(id)
        
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Detail Vehicle");

        const setBorder = (cell: ExcelJS.Cell) => {
        cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
        };
        };

        const headerRow = sheet.addRow([
        "ID",
        "Nama",
        "License Plate",
        "Type",
        "Route",
        "Status",
        "Last Position",
        "Updated At",
        ]);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
            cell.alignment = { horizontal: "center" };
            setBorder(cell);
        });

        const dataRow = sheet.addRow([
        vehicle.id,
        vehicle.name,
        vehicle.lisensePlate,
        vehicle.type,
        vehicle.route,
        vehicle.status,
        vehicle.lastPosition,
        vehicle.updatedAt?.toISOString() || "",
        ]);
        dataRow.eachCell(setBorder);

        sheet.addRow([]);

        const statusTitle = sheet.addRow(["Vehicle Statuses"]);
        statusTitle.eachCell((cell) => {
            cell.font = { bold: true };
            setBorder(cell);
        });

        const statusHeader = sheet.addRow([
        "ID",
        "Status",
        "DateTime",
        "Position",
        "Information",
        "Updated At",
        ]);
        statusHeader.eachCell((cell) => {
            cell.font = { bold: true };
            cell.alignment = { horizontal: "center" };
            setBorder(cell);
        });

        vehicle.vehicleStatuses.forEach((vs) => {
            const row = sheet.addRow([
                vs.id,
                vs.status,
                vs.dateTime?.toISOString() || "",
                vs.position,
                vs.information,
                vs.updatedAt?.toISOString() || "",
            ]);
            row.eachCell(setBorder);
        });

        sheet.addRow([]); 

        sheet.addRow(["User Info"]).font = { bold: true }; 
        sheet.addRow(["Name", "Email"]); 
        if (vehicle.user) {
            sheet.addRow([vehicle.user.name, vehicle.user.email]); 
        }

        sheet.columns.forEach((column) => {
            if (!column) return;
            const col = column as ExcelJS.Column;

            let maxLength = 0;
            col.eachCell({ includeEmpty: true }, (cell) => {
                const cellValue = cell.value ? cell.value.toString() : "";
                maxLength = Math.max(maxLength, cellValue.length);
            });

            col.width = maxLength + 2;
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${vehicle.name}_${vehicle.id}.xlsx`
        );

        await workbook.xlsx.write(res);
        res.end();
  
    } catch (error) {
        console.error("Error generating Excel file:", error);
        res.status(500).json({ message: "Gagal generate file Excel" });
  }
}