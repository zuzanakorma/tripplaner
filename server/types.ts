type Trip = {
  tripId: string;
  title: string;
  budget?: number;
  dateFrom: Date;
  dateTo: Date;
  totalCost?: number;
  country: string;
  city: string;
  latitude: string;
  longitude: string;
  description?: string;
};

export { Trip };
