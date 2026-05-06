import { useEffect, useState } from "react";
import { YearModel } from "../models/year.model";
import { DataService } from "../services/data-service";

type useGetYearsProps = {
  userId: string;
};

type UseGetMonthsProps = {
  userId: string;
  year: number;
};

type UseGetYearByStatusProps = {
  userId: string;
  status: "tracked" | "planned";
  year: number;
};

type UseGetYearCategorySummaryProps = {
  userId: string;
  year: number;
  month?: string;
};

type UseGetYearTopCategoriesProps = {
  userId: string;
  year: number;
  month?: string;
};

type UseGetYearTotalsProps = {
  userId: string;
  year: number;
};

type UseGetYearMonthsTotalsSummaryProps = {
  userId: string;
  status: "tracked" | "planned";
  year: number;
};

type UseGetYearTopMonthsProps = {
  userId: string;
  status: "tracked" | "planned";
  year: number;
};

export const useGetYears = ({ userId }: useGetYearsProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getYears = async () => {
    setLoading(true);
    try {
      const response = await DataService.getData(`/api/years/${userId}`);
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getYears();
    }
  }, [userId]);

  return { data, loading };
};

export const useGetMonths = ({ userId, year }: UseGetMonthsProps) => {
  const [data, setData] = useState<string[]>([] as string[]);
  const [loading, setLoading] = useState(false);

  const getMonths = async () => {
    setLoading(true);
    try {
      const response = await DataService.getData(`/api/years/months/${userId}/${year}`);
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && year) {
      getMonths();
    }
  }, [userId, year]);

  return { data, loading };
};

export const useGetYearInfo = ({ userId, status, year }: UseGetYearByStatusProps) => {
  const [data, setData] = useState<YearModel>({} as YearModel);
  const [loading, setLoading] = useState(false);

  const getYear = async () => {
    setLoading(true);
    try {
      const response = await DataService.getData(`/api/years/${userId}/${status}/${year}`);
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && status && year) {
      getYear();
    }
  }, [userId, status, year]);

  return { data, loading };
};

export const useGetYearCategoriesByMonths = ({ userId, status, year }: UseGetYearByStatusProps) => {
  type dataType = {
    incomes: Record<string, Record<string, number>>;
    expenses: Record<string, Record<string, number>>;
  };

  const [data, setData] = useState<dataType>({ incomes: {}, expenses: {} });
  const [loading, setLoading] = useState(false);

  const getYearCategories = async () => {
    setLoading(true);
    try {
      const response = await DataService.getData(`/api/years/category-by-month/${userId}/${status}/${year}`);
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && status && year) {
      getYearCategories();
    }
  }, [userId, status, year]);

  return { data, loading };
};

export const useGetYearCategorySummary = ({ userId, year, month }: UseGetYearCategorySummaryProps) => {
  const [data, setData] = useState({ incomes: {}, expenses: {} });
  const [loading, setLoading] = useState(false);

  const getYearCategorySummary = async () => {
    setLoading(true);
    try {
      let url = `/api/years/category-summary/${userId}/${year}`;

      if (month !== "") {
        url += `/${month}`;
      }

      const response = await DataService.getData(url);
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && year) {
      getYearCategorySummary();
    }
  }, [userId, year, month]);

  return { data, loading };
};

export const useGetYearTopTrackedCategories = ({ userId, year, month }: UseGetYearTopCategoriesProps) => {
  type dataType = {
    incomes: { [key: string]: number };
    expenses: { [key: string]: number };
  };

  const [data, setData] = useState<dataType>({} as dataType);
  const [loading, setLoading] = useState(false);

  const getYearCategorySummary = async () => {
    setLoading(true);
    try {
      let url = `/api/years/top-categories/${userId}/${year}`;

      if (month !== "") {
        url += `/${month}`;
      }

      const response = await DataService.getData(url);
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && year) {
      getYearCategorySummary();
    }
  }, [userId, year, month]);

  return { data, loading };
};

export const useGetYearTotals = ({ userId, year }: UseGetYearTotalsProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMonths = async () => {
    setLoading(true);
    try {
      const response = await DataService.getData(`/api/years/year-totals/${userId}/${year}`);
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && year) {
      getMonths();
    }
  }, [userId, year]);

  return { data, loading };
};

export const useGetYearMonthsTotalsSummary = ({ userId, status, year }: UseGetYearMonthsTotalsSummaryProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMonths = async () => {
    setLoading(true);
    try {
      const response = await DataService.getData(`/api/years/months-totals/${userId}/${status}/${year}`);
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && status && year) {
      getMonths();
    }
  }, [userId, status, year]);

  return { data, loading };
};

export const useGetYearTopMonths = ({ userId, status, year }: UseGetYearTopMonthsProps) => {
  type dataType = {
    incomes: { [key: string]: number };
    expenses: { [key: string]: number };
  };

  const [data, setData] = useState<dataType>({} as dataType);
  const [loading, setLoading] = useState(false);

  const getMonths = async () => {
    setLoading(true);
    try {
      const response = await DataService.getData(`/api/years/top-months/${userId}/${status}/${year}`);
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && status && year) {
      getMonths();
    }
  }, [userId, status, year]);

  return { data, loading };
};
