type Trip = {
  tripId?: string;
  title: string;
  dateFrom?: Date;
  dateTo?: Date;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  budget?: number;
  totalCost?: number;
};

export type { Trip };
