export interface Order {
    service: string;
    professional: {
      name: string;
      description: string;
      image: string;
      location: [number, number];
      distance: string;
      gallery: string[];
    };
    date: Date;
    status: string;
  }
  