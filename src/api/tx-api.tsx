import { useEffect, useState } from "react";
import { TxModel } from "../models/tx.model";
import { DataService } from "../services/data-service";

type UseGetTxByStatusProps = {
  userId: string;
  status: "tracked" | "planned";
};

export const useHasTx = (userId: string) => {
  const [hasData, setHasData] = useState(true);
  const [loading, setLoading] = useState(false);

  const hasTx = async () => {
    setLoading(true);
    try {
      const response = await DataService.getData(`/api/tx/has-data/${userId}`);
      setHasData(response);
    } catch (error) {
      console.error(error);
      setHasData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      hasTx();
    }
  }, [userId]);

  return { hasData, loading };
};

export const useCreateTx = () => {
  const [loading, setLoading] = useState(false);

  const createTx = async (payload: TxModel) => {
    setLoading(true);
    try {
      await DataService.postData(`/api/tx`, payload);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      location.reload();
    }
  };

  return { createTx, loading };
};

export const useGetTxByStatus = ({ userId, status }: UseGetTxByStatusProps) => {
  const [data, setData] = useState<TxModel[]>([]);
  const [loading, setLoading] = useState(false);

  const getTxByStatus = async () => {
    setLoading(true);
    try {
      const response = await DataService.getData(`/api/tx/${userId}/${status}`);
      response.sort((a: { date: Date }, b: { date: Date }) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && status) {
      getTxByStatus();
    }
  }, [userId, status]);

  return { data, loading };
};

export const useUpdateTxById = () => {
  const [loading, setLoading] = useState(false);

  const updateTxById = async (txId: string, payload: TxModel) => {
    setLoading(true);
    try {
      await DataService.putData(`/api/tx/${txId}`, payload);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { updateTxById, loading };
};

export const useDeleteTxById = () => {
  const [loading, setLoading] = useState(false);

  const deleteTxById = async (txId: string | undefined) => {
    setLoading(true);
    try {
      await DataService.deleteData(`/api/tx/${txId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      location.reload();
    }
  };

  return { deleteTxById, loading };
};
