"use client";
import Link from "next/link";
import styles from "./Table.module.css";
import options from "./options.json";

interface TableProperties {
  title: string;
  columns: any;
  rows: any;
  clickable: boolean;
  margin: string;
  onTableDataCellRowClick: Function;
}

export default function Table({
  title,
  columns,
  rows,
  clickable,
  margin,
  onTableDataCellRowClick,
}: TableProperties) {
  const handleTableDataCellRowClick = (id: string) => {
    return onTableDataCellRowClick(id);
  };

  const buildTableHead = (columns: any) => {
    let cols: any = [];
    columns.forEach((column: any, index: number) => {
      cols.push(
        <th key={"tableHead:" + index} className={styles.tableHead}>
          {column}
        </th>
      );
    });
    return (
      <tr key={"tableHeadRow"} className={styles.tableHeadRow}>
        {cols}
      </tr>
    );
  };

  const buildTableRows = (rows: any, clickable: boolean) => {
    let tRs: any = [];

    rows.forEach((row: any, index: number) => {
      let rs: any = [];
      row.fields.forEach((item: any, rIndex: number) => {
        rs.push(
          <td key={"tableDataCell:" + rIndex} className={styles.tableDataCell}>
            {item}
          </td>
        );
      });
      let className = styles.tableDataCellRow;
      if (clickable) className += " " + styles.hoverEffect;
      tRs.push(
        <tr
          key={"tableDataCellRow:" + index}
          className={className}
          onClick={() => handleTableDataCellRowClick(row.id)}
        >
          {rs}
        </tr>
      );
    });

    return tRs;
  };

  const tableHead = buildTableHead(columns);
  const tableRows = buildTableRows(rows, clickable);
  let style: any = {};
  if (margin) style.margin = margin;
  return (
    <table className={styles.tableContainer} style={style}>
      <caption className={styles.captionContainer}>{title}</caption>
      <tbody>
        {tableHead}
        {tableRows}
      </tbody>
    </table>
  );
}
