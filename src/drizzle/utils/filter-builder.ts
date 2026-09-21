import { isEmpty } from "@/drizzle/utils/empty";
import { addDays, endOfDay, startOfDay } from "date-fns";
import {
  and,
  eq,
  gt,
  gte,
  ilike,
  inArray,
  lt,
  lte,
  ne,
  not,
  notIlike,
  notInArray,
  or,
  type AnyColumn,
  type SQL,
} from "drizzle-orm";

const getStartOfDay = (val: string | number) => {
  const date = new Date(Number(val));
  date.setHours(0, 0, 0, 0);
  return date;
};

const getEndOfDay = (val: string | number) => {
  const date = new Date(Number(val));
  date.setHours(23, 59, 59, 999);
  return date;
};
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Ok
export function buildFilter(
  column: AnyColumn,
  operator: string,
  //   biome-ignore lint/suspicious/noExplicitAny: Ok
  value: any,
  variant: string
): SQL | undefined {
  switch (operator) {
    case "iLike":
      if (variant === "text" && typeof value === "string") {
        return ilike(column, `%${value}%`);
      }
      return undefined;

    case "notILike":
      if (variant === "text" && typeof value === "string") {
        return notIlike(column, `%${value}%`);
      }
      return undefined;

    case "eq":
      if (column.dataType === "boolean" && typeof value === "string") {
        return eq(column, value === "true");
      }
      if (variant === "date" || variant === "dateRange") {
        return and(
          gte(column, getStartOfDay(value)),
          lte(column, getEndOfDay(value))
        );
      }
      return eq(column, value);

    case "ne":
      if (column.dataType === "boolean" && typeof value === "string") {
        return ne(column, value === "true");
      }
      if (variant === "date" || variant === "dateRange") {
        return or(
          lt(column, getStartOfDay(value)),
          gt(column, getEndOfDay(value))
        );
      }
      return ne(column, value);

    case "inArray":
      if (Array.isArray(value)) {
        return inArray(column, value);
      }
      return undefined;

    case "notInArray":
      if (Array.isArray(value)) {
        return notInArray(column, value);
      }
      return undefined;

    case "lt":
      if (variant === "number" || variant === "range") {
        return lt(column, value);
      }
      if (variant === "date" && typeof value === "string") {
        return lt(column, getEndOfDay(value));
      }
      return undefined;

    case "lte":
      if (variant === "number" || variant === "range") {
        return lte(column, value);
      }
      if (variant === "date" && typeof value === "string") {
        return lte(column, getEndOfDay(value));
      }
      return undefined;

    case "gt":
      if (variant === "number" || variant === "range") {
        return gt(column, value);
      }
      if (variant === "date" && typeof value === "string") {
        return gt(column, getStartOfDay(value));
      }
      return undefined;

    case "gte":
      if (variant === "number" || variant === "range") {
        return gte(column, value);
      }
      if (variant === "date" && typeof value === "string") {
        return gte(column, getStartOfDay(value));
      }
      return undefined;

    case "isBetween":
      if (
        (variant === "date" || variant === "dateRange") &&
        Array.isArray(value) &&
        value.length === 2
      ) {
        return and(
          value[0] ? gte(column, getStartOfDay(value[0])) : undefined,
          value[1] ? lte(column, getEndOfDay(value[1])) : undefined
        );
      }
      if (
        (variant === "number" || variant === "range") &&
        Array.isArray(value) &&
        value.length === 2
      ) {
        const first =
          value[0] && value[0].trim() !== "" ? Number(value[0]) : null;
        const second =
          value[1] && value[1].trim() !== "" ? Number(value[1]) : null;

        if (first === null && second === null) {
          return undefined;
        }
        if (first !== null && second === null) {
          return eq(column, first);
        }
        if (first === null && second !== null) {
          return eq(column, second);
        }
        return and(gte(column, first as number), lte(column, second as number));
      }
      return undefined;

    case "isRelativeToToday":
      if (
        (variant === "date" || variant === "dateRange") &&
        typeof value === "string"
      ) {
        const today = new Date();
        const [amount, unit] = value.split(" ") ?? [];

        if (!(amount && unit)) {
          return undefined;
        }

        let startDate: Date;
        let endDate: Date;

        switch (unit) {
          case "days":
            startDate = startOfDay(addDays(today, Number.parseInt(amount, 10)));
            endDate = endOfDay(startDate);
            break;
          case "weeks":
            startDate = startOfDay(
              addDays(today, Number.parseInt(amount, 10) * 7)
            );
            endDate = endOfDay(addDays(startDate, 6));
            break;
          case "months":
            startDate = startOfDay(
              addDays(today, Number.parseInt(amount, 10) * 30)
            );
            endDate = endOfDay(addDays(startDate, 29));
            break;
          default:
            return undefined;
        }
        return and(gte(column, startDate), lte(column, endDate));
      }
      return undefined;

    case "isEmpty":
      return isEmpty(column);

    case "isNotEmpty":
      return not(isEmpty(column));

    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}
